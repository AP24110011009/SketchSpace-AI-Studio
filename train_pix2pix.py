"""
SketchSpace AI — Pix2Pix Conditional GAN Training Pipeline
Standalone script to train paired image-to-image translation on sketch -> interior dataset.

Reference:
- Isola et al., 'Image-to-Image Translation with Conditional Adversarial Networks', CVPR 2017.
"""

import os
import argparse
import time
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
from backend.ai_engine.pix2pix_cgan import Pix2PixGenerator, PatchGANDiscriminator

class PairedInteriorDataset(Dataset):
    """
    Loads paired sketch (Domain A) and photorealistic interior (Domain B).
    Expects paired images or two synchronized directories:
    root/sketches/ and root/renders/
    """
    def __init__(self, root_dir, image_size=256):
        self.sketches_dir = os.path.join(root_dir, "sketches")
        self.renders_dir = os.path.join(root_dir, "renders")
        
        self.filenames = [
            f for f in os.listdir(self.sketches_dir)
            if f.endswith(('.jpg', '.png', '.jpeg'))
        ]
        
        self.transform = transforms.Compose([
            transforms.Resize((image_size, image_size), Image.Resampling.BICUBIC),
            transforms.ToTensor(),
            transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
        ])

    def __len__(self):
        return len(self.filenames)

    def __getitem__(self, idx):
        filename = self.filenames[idx]
        sketch_path = os.path.join(self.sketches_dir, filename)
        render_path = os.path.join(self.renders_dir, filename)

        sketch_img = Image.open(sketch_path).convert("RGB")
        render_img = Image.open(render_path).convert("RGB")

        return {
            "sketch": self.transform(sketch_img),
            "render": self.transform(render_img),
            "filename": filename
        }

def train_pix2pix(args):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[SketchSpace AI] Training on device: {device}")

    os.makedirs(args.checkpoint_dir, exist_ok=True)

    # 1. Initialize Generator and Discriminator
    netG = Pix2PixGenerator(in_channels=3, out_channels=3).to(device)
    netD = PatchGANDiscriminator(in_channels=6).to(device)

    # 2. Loss Objectives
    criterionGAN = nn.MSELoss() # Least Squares GAN or BCEWithLogits
    criterionL1 = nn.L1Loss()
    lambda_L1 = args.lambda_l1

    # 3. Optimizers
    optimizer_G = torch.optim.Adam(netG.parameters(), lr=args.lr, betas=(0.5, 0.999))
    optimizer_D = torch.optim.Adam(netD.parameters(), lr=args.lr, betas=(0.5, 0.999))

    # 4. Dataset & DataLoader
    dataset = PairedInteriorDataset(args.data_dir, image_size=args.image_size)
    dataloader = DataLoader(dataset, batch_size=args.batch_size, shuffle=True)

    print(f"[SketchSpace AI] Loaded {len(dataset)} paired training samples.")
    print(f"[SketchSpace AI] Starting training for {args.epochs} epochs...")

    for epoch in range(1, args.epochs + 1):
        epoch_g_loss = 0.0
        epoch_d_loss = 0.0

        for i, batch in enumerate(dataloader):
            real_sketch = batch["sketch"].to(device)
            real_render = batch["render"].to(device)

            # ---------------------
            # Train Discriminator
            # ---------------------
            optimizer_D.zero_grad()

            # Real patch evaluation
            pred_real = netD(real_sketch, real_render)
            loss_D_real = criterionGAN(pred_real, torch.ones_like(pred_real))

            # Fake patch evaluation
            fake_render = netG(real_sketch)
            pred_fake = netD(real_sketch, fake_render.detach())
            loss_D_fake = criterionGAN(pred_fake, torch.zeros_like(pred_fake))

            loss_D = 0.5 * (loss_D_real + loss_D_fake)
            loss_D.backward()
            optimizer_D.step()

            # ---------------------
            # Train Generator
            # ---------------------
            optimizer_G.zero_grad()

            # GAN loss: fool discriminator
            pred_fake = netD(real_sketch, fake_render)
            loss_G_GAN = criterionGAN(pred_fake, torch.ones_like(pred_fake))

            # L1 Structural reconstruction loss
            loss_G_L1 = criterionL1(fake_render, real_render) * lambda_L1

            # Total Generator loss
            loss_G = loss_G_GAN + loss_G_L1
            loss_G.backward()
            optimizer_G.step()

            epoch_g_loss += loss_G.item()
            epoch_d_loss += loss_D.item()

        print(
            f"Epoch [{epoch:03d}/{args.epochs:03d}] "
            f"Loss_D: {epoch_d_loss / len(dataloader):.4f} | "
            f"Loss_G: {epoch_g_loss / len(dataloader):.4f}"
        )

        if epoch % args.save_interval == 0 or epoch == args.epochs:
            ckpt_path = os.path.join(args.checkpoint_dir, f"pix2pix_epoch_{epoch}.pth")
            torch.save({
                "epoch": epoch,
                "netG_state_dict": netG.state_dict(),
                "netD_state_dict": netD.state_dict(),
                "optimizer_G": optimizer_G.state_dict(),
                "optimizer_D": optimizer_D.state_dict()
            }, ckpt_path)
            print(f"--> Saved checkpoint: {ckpt_path}")

    print("[SketchSpace AI] Training completed successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train Pix2Pix on paired sketch-interior datasets")
    parser.add_argument("--data_dir", type=str, default="backend/samples", help="Path to directory containing sketches/ and renders/")
    parser.add_argument("--checkpoint_dir", type=str, default="checkpoints", help="Directory to save model weights")
    parser.add_argument("--epochs", type=int, default=10, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=2, help="Mini-batch size")
    parser.add_argument("--lr", type=float, default=0.0002, help="Adam learning rate")
    parser.add_argument("--lambda_l1", type=float, default=100.0, help="Weight for L1 structural loss")
    parser.add_argument("--image_size", type=int, default=256, help="Image resolution for training")
    parser.add_argument("--save_interval", type=int, default=5, help="Epoch interval to save checkpoints")

    args = parser.parse_args()
    train_pix2pix(args)
