"""
PyTorch Implementation of Pix2Pix (Conditional GAN for Image-to-Image Translation)
Based on: 'Image-to-Image Translation with Conditional Adversarial Networks' (Isola et al., CVPR 2017)

Architecture:
- Generator: U-Net 256/512 with Skip Connections (preserving structural sketch geometry)
- Discriminator: 70x70 PatchGAN (evaluating realism at local patch scale)
- Objective: Minimax cGAN loss + L1 Reconstruction Loss (lambda * ||Real - Fake||_1)
"""

import torch
import torch.nn as nn
from PIL import Image
import torchvision.transforms as transforms
import numpy as np

class UNetDown(nn.Module):
    """Downsampling block: Conv -> BatchNorm -> LeakyReLU"""
    def __init__(self, in_size, out_size, normalize=True, dropout=0.0):
        super(UNetDown, self).__init__()
        layers = [nn.Conv2d(in_size, out_size, 4, stride=2, padding=1, bias=False)]
        if normalize:
            layers.append(nn.BatchNorm2d(out_size, 0.8))
        layers.append(nn.LeakyReLU(0.2))
        if dropout:
            layers.append(nn.Dropout(dropout))
        self.model = nn.Sequential(*layers)

    def forward(self, x):
        return self.model(x)

class UNetUp(nn.Module):
    """Upsampling block with Skip Connection: ConvTranspose -> BatchNorm -> ReLU"""
    def __init__(self, in_size, out_size, dropout=0.0):
        super(UNetUp, self).__init__()
        layers = [
            nn.ConvTranspose2d(in_size, out_size, 4, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(out_size, 0.8),
            nn.ReLU(inplace=True)
        ]
        if dropout:
            layers.append(nn.Dropout(dropout))
        self.model = nn.Sequential(*layers)

    def forward(self, x, skip_input):
        x = self.model(x)
        x = torch.cat((x, skip_input), 1)
        return x

class Pix2PixGenerator(nn.Module):
    """
    U-Net Generator with Skip Connections.
    Takes structural sketch (3 channels) and synthesizes realistic interior (3 channels).
    """
    def __init__(self, in_channels=3, out_channels=3):
        super(Pix2PixGenerator, self).__init__()

        # Encoder
        self.down1 = UNetDown(in_channels, 64, normalize=False) # 256 -> 128
        self.down2 = UNetDown(64, 128)                          # 128 -> 64
        self.down3 = UNetDown(128, 256)                         # 64 -> 32
        self.down4 = UNetDown(256, 512, dropout=0.5)            # 32 -> 16
        self.down5 = UNetDown(512, 512, dropout=0.5)            # 16 -> 8
        self.down6 = UNetDown(512, 512, dropout=0.5)            # 8 -> 4
        self.down7 = UNetDown(512, 512, dropout=0.5)            # 4 -> 2
        self.down8 = UNetDown(512, 512, normalize=False, dropout=0.5) # 2 -> 1

        # Decoder with Skip Connections
        self.up1 = UNetUp(512, 512, dropout=0.5)
        self.up2 = UNetUp(1024, 512, dropout=0.5)
        self.up3 = UNetUp(1024, 512, dropout=0.5)
        self.up4 = UNetUp(1024, 512, dropout=0.5)
        self.up5 = UNetUp(1024, 256)
        self.up6 = UNetUp(512, 128)
        self.up7 = UNetUp(256, 64)

        self.final = nn.Sequential(
            nn.Upsample(scale_factor=2),
            nn.ZeroPad2d((1, 0, 1, 0)),
            nn.Conv2d(128, out_channels, 4, padding=1),
            nn.Tanh()
        )

    def forward(self, x):
        d1 = self.down1(x)
        d2 = self.down2(d1)
        d3 = self.down3(d2)
        d4 = self.down4(d3)
        d5 = self.down5(d4)
        d6 = self.down6(d5)
        d7 = self.down7(d6)
        d8 = self.down8(d7)

        u1 = self.up1(d8, d7)
        u2 = self.up2(u1, d6)
        u3 = self.up3(u2, d5)
        u4 = self.up4(u3, d4)
        u5 = self.up5(u4, d3)
        u6 = self.up6(u5, d2)
        u7 = self.up7(u6, d1)

        return self.final(u7)

class PatchGANDiscriminator(nn.Module):
    """
    70x70 PatchGAN Discriminator.
    Determines whether 70x70 overlapping image patches are real or generated,
    enforcing high-frequency sharpness and realistic material textures.
    """
    def __init__(self, in_channels=6):
        super(PatchGANDiscriminator, self).__init__()

        def discriminator_block(in_filters, out_filters, normalization=True):
            layers = [nn.Conv2d(in_filters, out_filters, 4, stride=2, padding=1)]
            if normalization:
                layers.append(nn.BatchNorm2d(out_filters, 0.8))
            layers.append(nn.LeakyReLU(0.2, inplace=True))
            return layers

        self.model = nn.Sequential(
            *discriminator_block(in_channels, 64, normalization=False),
            *discriminator_block(64, 128),
            *discriminator_block(128, 256),
            *discriminator_block(256, 512),
            nn.ZeroPad2d((1, 0, 1, 0)),
            nn.Conv2d(512, 1, 4, padding=1, bias=False)
        )

    def forward(self, img_A, img_B):
        # Concatenate condition sketch img_A and target/generated render img_B
        img_input = torch.cat((img_A, img_B), 1)
        return self.model(img_input)

class Pix2PixPipeline:
    """Inference wrapper for Pix2Pix model."""
    def __init__(self, device=None):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.generator = Pix2PixGenerator().to(self.device)
        self.generator.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((256, 256), Image.Resampling.BICUBIC),
            transforms.ToTensor(),
            transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
        ])

    def predict(self, sketch_image: Image.Image) -> Image.Image:
        """Translates sketch to interior using Pix2Pix generator."""
        input_tensor = self.transform(sketch_image).unsqueeze(0).to(self.device)
        with torch.no_grad():
            output_tensor = self.generator(input_tensor)
            output_tensor = (output_tensor + 1.0) / 2.0 # De-normalize from [-1, 1] to [0, 1]
            output_tensor = torch.clamp(output_tensor, 0, 1)
            output_np = output_tensor.squeeze(0).cpu().permute(1, 2, 0).numpy()
            output_img = Image.fromarray((output_np * 255).astype(np.uint8))
            return output_img.resize((512, 512), Image.Resampling.LANCZOS)
