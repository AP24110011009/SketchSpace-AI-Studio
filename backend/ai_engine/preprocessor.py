"""
Image preprocessing and edge extraction pipeline for SketchSpace AI.
Prepares sketches for ControlNet and Pix2Pix models.
"""

import cv2
import numpy as np
from PIL import Image, ImageOps

class SketchPreprocessor:
    def __init__(self, target_size=(512, 512)):
        self.target_size = target_size

    def resize_and_pad(self, image: Image.Image, fill_color=(255, 255, 255)) -> Image.Image:
        """Resizes image maintaining aspect ratio and pads to target size."""
        image.thumbnail(self.target_size, Image.Resampling.LANCZOS)
        new_image = Image.new("RGB", self.target_size, fill_color)
        paste_x = (self.target_size[0] - image.width) // 2
        paste_y = (self.target_size[1] - image.height) // 2
        new_image.paste(image, (paste_x, paste_y))
        return new_image

    def detect_and_invert_sketch(self, np_img: np.ndarray) -> np.ndarray:
        """
        Determines if sketch is black-on-white (typical pencil on paper) 
        and inverts to white-on-black for ControlNet scribble if needed.
        """
        if len(np_img.shape) == 3:
            gray = cv2.cvtColor(np_img, cv2.COLOR_RGB2GRAY)
        else:
            gray = np_img

        # If mean is high (> 127), background is bright, so invert
        if np.mean(gray) > 127:
            # White background, dark sketch lines
            return gray, True
        else:
            # Dark background, bright lines
            return gray, False

    def extract_canny_edges(self, image: Image.Image, low_threshold=100, high_threshold=200) -> Image.Image:
        """Extracts crisp Canny edges from uploaded sketch or photo."""
        np_img = np.array(image)
        if len(np_img.shape) == 3:
            gray = cv2.cvtColor(np_img, cv2.COLOR_RGB2GRAY)
        else:
            gray = np_img

        # Apply subtle bilateral filter to smooth paper grain while preserving sharp edges
        smoothed = cv2.bilateralFilter(gray, 7, 50, 50)
        edges = cv2.Canny(smoothed, low_threshold, high_threshold)
        
        # Dilate slightly so lines are prominent
        kernel = np.ones((2, 2), np.uint8)
        dilated = cv2.dilate(edges, kernel, iterations=1)
        
        return Image.fromarray(dilated)

    def extract_scribble_edges(self, image: Image.Image) -> Image.Image:
        """
        Extracts clean scribble lines suitable for ControlNet Scribble / Lineart.
        Produces white lines on black background.
        """
        np_img = np.array(image)
        gray, is_bright_bg = self.detect_and_invert_sketch(np_img)

        if is_bright_bg:
            # Invert: paper becomes black, pencil lines become white
            inv = 255 - gray
            # Adaptive threshold to isolate ink/pencil marks from paper texture
            thresh = cv2.adaptiveThreshold(
                inv, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, -4
            )
            # Remove isolated speckles
            kernel = np.ones((2, 2), np.uint8)
            cleaned = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
            return Image.fromarray(cleaned)
        else:
            # Already bright on dark
            _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
            return Image.fromarray(thresh)

    def process(self, image: Image.Image, mode="scribble") -> dict:
        """Full preprocessing pipeline returning standardized sketch and edge maps."""
        # 1. Standardize size
        resized_original = self.resize_and_pad(image, fill_color=(255, 255, 255))
        
        # 2. Extract edge representations
        canny_map = self.extract_canny_edges(resized_original)
        scribble_map = self.extract_scribble_edges(resized_original)
        
        # Return both for model flexibility
        return {
            "processed_image": resized_original,
            "canny_map": canny_map,
            "scribble_map": scribble_map,
            "active_condition_map": scribble_map if mode == "scribble" else canny_map
        }
