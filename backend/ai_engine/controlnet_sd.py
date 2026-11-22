"""
ControlNet + Stable Diffusion 1.5 Pipeline for SketchSpace AI.
Enforces edge and structural constraint while generating photorealistic interiors.
Configured with FP16 precision, attention slicing, and CPU offloading for 6GB VRAM.
"""

import os
import torch
from PIL import Image
from diffusers import ControlNetModel, StableDiffusionControlNetPipeline, UniPCMultistepScheduler

class ControlNetSDPipeline:
    def __init__(self, model_id="runwayml/stable-diffusion-v1-5", controlnet_id="lllyasviel/control_v11p_sd15_scribble"):
        self.model_id = model_id
        self.controlnet_id = controlnet_id
        self.pipeline = None
        self.is_loaded = False
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.loading_in_progress = False

    def load_pipeline(self):
        """Loads ControlNet and Stable Diffusion pipeline into memory with VRAM optimizations."""
        if self.is_loaded and self.pipeline is not None:
            return True

        self.loading_in_progress = True
        try:
            print(f"[SketchSpace AI] Loading ControlNet from local cache ({self.controlnet_id})...")
            controlnet = ControlNetModel.from_pretrained(
                self.controlnet_id,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
                local_files_only=True
            )

            print(f"[SketchSpace AI] Loading Stable Diffusion from local cache ({self.model_id})...")
            pipe = StableDiffusionControlNetPipeline.from_pretrained(
                self.model_id,
                controlnet=controlnet,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
                safety_checker=None,
                requires_safety_checker=False,
                local_files_only=True
            )

            # High-speed multistep scheduler (15-20 steps achieves high quality)
            pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)

            if self.device == "cuda":
                # Critical memory optimizations for 6GB RTX 3050:
                pipe.enable_attention_slicing()
                pipe.enable_model_cpu_offload()
            else:
                pipe = pipe.to("cpu")

            self.pipeline = pipe
            self.is_loaded = True
            print("[SketchSpace AI] ControlNet + Stable Diffusion pipeline loaded successfully!")
            return True
        except Exception as e:
            print(f"[SketchSpace AI] Error loading pipeline: {e}")
            self.is_loaded = False
            return False
        finally:
            self.loading_in_progress = False

    def generate(
        self,
        condition_image: Image.Image,
        prompt: str,
        negative_prompt: str,
        num_inference_steps: int = 25,
        guidance_scale: float = 7.5,
        controlnet_conditioning_scale: float = 0.85,
        seed: int = None
    ) -> Image.Image:
        """Runs conditional diffusion generation."""
        if not self.is_loaded:
            success = self.load_pipeline()
            if not success:
                raise RuntimeError("Failed to load ControlNet + Stable Diffusion weights.")

        generator = None
        if seed is not None and seed > 0:
            generator = torch.Generator(device=self.device).manual_seed(seed)

        # Standardize condition image to RGB and 512x512
        cond = condition_image.convert("RGB").resize((512, 512), Image.Resampling.LANCZOS)

        with torch.autocast(self.device if self.device == "cuda" else "cpu"):
            output = self.pipeline(
                prompt=prompt,
                negative_prompt=negative_prompt,
                image=cond,
                num_inference_steps=num_inference_steps,
                guidance_scale=guidance_scale,
                controlnet_conditioning_scale=controlnet_conditioning_scale,
                generator=generator
            )

        return output.images[0]
