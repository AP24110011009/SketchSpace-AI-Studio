"""
Generates high quality paired sketch and realistic interior render samples for SketchSpace AI.
Creates 6 diverse room pairs with architectural details:
1. Living Room (Modern Luxury)
2. Bedroom (Scandinavian Minimalist)
3. Kitchen (Contemporary Marble)
4. Bathroom (Spa Travertine)
5. Office (Industrial Studio)
6. Dining (Japandi Warm)
"""

import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import cv2
import numpy as np

OUTPUT_SKETCHES_DIR = os.path.join(os.path.dirname(__file__), "sketches")
OUTPUT_RENDERS_DIR = os.path.join(os.path.dirname(__file__), "renders")
os.makedirs(OUTPUT_SKETCHES_DIR, exist_ok=True)
os.makedirs(OUTPUT_RENDERS_DIR, exist_ok=True)

def create_gradient(width, height, color_top, color_bottom):
    """Creates a smooth vertical color gradient image."""
    base = Image.new('RGB', (width, height), color_top)
    top_r, top_g, top_b = color_top
    bot_r, bot_g, bot_b = color_bottom
    
    gradient = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(gradient)
    for y in range(height):
        factor = y / float(height)
        r = int(top_r + (bot_r - top_r) * factor)
        g = int(top_g + (bot_g - top_g) * factor)
        b = int(top_b + (bot_b - top_b) * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return gradient

def add_noise(image, intensity=0.03):
    """Adds subtle photographic film grain texture."""
    np_img = np.array(image, dtype=np.float32)
    noise = np.random.normal(0, intensity * 255, np_img.shape)
    noisy_img = np.clip(np_img + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(noisy_img)

def draw_hand_drawn_line(draw, points, fill=(35, 30, 25), width=3, jitter=1.2):
    """Draws a slightly jittered, natural architectural hand-drawn line."""
    p1, p2 = points
    x1, y1 = p1
    x2, y2 = p2
    dist = math.hypot(x2 - x1, y2 - y1)
    steps = max(int(dist / 12), 3)
    
    current_x, current_y = x1, y1
    for i in range(1, steps + 1):
        t = i / steps
        next_x = x1 + (x2 - x1) * t + np.random.uniform(-jitter, jitter)
        next_y = y1 + (y2 - y1) * t + np.random.uniform(-jitter, jitter)
        draw.line([(current_x, current_y), (next_x, next_y)], fill=fill, width=width)
        current_x, current_y = next_x, next_y
    draw.line([(current_x, current_y), (x2, y2)], fill=fill, width=width)

# ==============================================================================
# ROOM 1: Modern Luxury Living Room
# ==============================================================================
def generate_living_room():
    width, height = 768, 768
    
    # 1. Realistic Render
    # Warm beige wall and rich oak floor
    img = create_gradient(width, height, (238, 233, 226), (220, 212, 200))
    draw = ImageDraw.Draw(img)
    
    # Floor: Warm European oak wood planks with perspective
    floor_y = int(height * 0.58)
    floor_grad = create_gradient(width, height - floor_y, (185, 150, 115), (145, 110, 80))
    img.paste(floor_grad, (0, floor_y))
    draw = ImageDraw.Draw(img)
    
    # Wood floor plank lines
    for x in range(-200, width + 400, 75):
        draw.line([(width // 2, floor_y), (x, height)], fill=(125, 95, 68), width=1)
        
    # Large floor-to-ceiling window on the right with soft morning sunlight
    win_x1, win_y1, win_x2, win_y2 = int(width * 0.62), int(height * 0.12), int(width * 0.94), floor_y
    # Outdoor view (soft lush garden & architectural trees)
    outdoor = create_gradient(win_x2 - win_x1, win_y2 - win_y1, (215, 235, 245), (180, 210, 190))
    img.paste(outdoor, (win_x1, win_y1))
    
    # Window frame (matte black architectural mullions)
    draw = ImageDraw.Draw(img)
    draw.rectangle([win_x1, win_y1, win_x2, win_y2], outline=(40, 38, 36), width=6)
    draw.line([(win_x1 + (win_x2 - win_x1) // 2, win_y1), (win_x1 + (win_x2 - win_x1) // 2, win_y2)], fill=(40, 38, 36), width=4)
    draw.line([(win_x1, win_y1 + (win_y2 - win_y1) // 2), (win_x2, win_y1 + (win_y2 - win_y1) // 2)], fill=(40, 38, 36), width=4)
    
    # Sunbeam / light spill from window
    sunlight_mask = Image.new('L', (width, height), 0)
    sdraw = ImageDraw.Draw(sunlight_mask)
    sdraw.polygon([(win_x1, win_y1), (win_x2, win_y1), (width, height), (int(width * 0.3), height)], fill=75)
    sunlight_mask = sunlight_mask.filter(ImageFilter.GaussianBlur(35))
    sun_overlay = Image.new('RGB', (width, height), (255, 248, 220))
    img.paste(sun_overlay, (0, 0), sunlight_mask)
    
    # Designer Sectional Velvet Sofa (Cream / Warm Greige)
    draw = ImageDraw.Draw(img)
    sofa_x1, sofa_y1 = int(width * 0.12), int(height * 0.52)
    sofa_x2, sofa_y2 = int(width * 0.72), int(height * 0.78)
    
    # Sofa shadow
    shadow_mask = Image.new('L', (width, height), 0)
    sh_draw = ImageDraw.Draw(shadow_mask)
    sh_draw.ellipse([sofa_x1 - 10, sofa_y2 - 20, sofa_x2 + 25, sofa_y2 + 40], fill=140)
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(15))
    shadow_layer = Image.new('RGB', (width, height), (40, 30, 20))
    img.paste(shadow_layer, (0, 0), shadow_mask)
    
    # Sofa body
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([sofa_x1, sofa_y1, sofa_x2, sofa_y2], radius=18, fill=(215, 206, 194), outline=(175, 166, 154), width=2)
    # Cushions
    mid_sofa = sofa_x1 + (sofa_x2 - sofa_x1) * 0.5
    draw.line([(mid_sofa, sofa_y1), (mid_sofa, sofa_y2)], fill=(160, 150, 138), width=3)
    # Sofa backrest
    draw.rounded_rectangle([sofa_x1, sofa_y1 - 50, sofa_x2, sofa_y1 + 15], radius=14, fill=(205, 196, 184), outline=(165, 156, 144), width=2)
    
    # Modern Organic Coffee Table (Travertine stone oval)
    tbl_x1, tbl_y1 = int(width * 0.30), int(height * 0.76)
    tbl_x2, tbl_y2 = int(width * 0.56), int(height * 0.88)
    draw.ellipse([tbl_x1, tbl_y1, tbl_x2, tbl_y2], fill=(240, 234, 222), outline=(195, 185, 170), width=2)
    # Table leg shadows & brass base
    draw.ellipse([tbl_x1 + 35, tbl_y1 + 12, tbl_x2 - 35, tbl_y2 - 10], fill=(228, 220, 205))
    
    # Decorative Books & Ceramic Bowl on Table
    draw.rectangle([tbl_x1 + 45, tbl_y1 + 15, tbl_x1 + 95, tbl_y1 + 35], fill=(70, 65, 60))
    draw.rectangle([tbl_x1 + 48, tbl_y1 + 12, tbl_x1 + 92, tbl_y1 + 22], fill=(190, 160, 130))
    draw.ellipse([tbl_x2 - 70, tbl_y1 + 15, tbl_x2 - 40, tbl_y1 + 38], fill=(210, 190, 175), outline=(150, 130, 115))
    
    # Minimalist Curved Floor Lamp (Arched Brass)
    lamp_base_x, lamp_base_y = int(width * 0.08), int(height * 0.74)
    draw.ellipse([lamp_base_x - 18, lamp_base_y, lamp_base_x + 18, lamp_base_y + 14], fill=(185, 145, 80))
    draw.arc([lamp_base_x, int(height * 0.20), int(width * 0.32), int(height * 0.75)], start=160, end=350, fill=(195, 155, 90), width=5)
    # Lamp Dome shade
    shade_x, shade_y = int(width * 0.30), int(height * 0.38)
    draw.chord([shade_x - 28, shade_y - 20, shade_x + 28, shade_y + 20], start=0, end=180, fill=(215, 175, 100))
    # Lamp glow
    glow_mask = Image.new('L', (width, height), 0)
    gdraw = ImageDraw.Draw(glow_mask)
    gdraw.ellipse([shade_x - 45, shade_y - 20, shade_x + 45, shade_y + 70], fill=120)
    glow_mask = glow_mask.filter(ImageFilter.GaussianBlur(25))
    img.paste(Image.new('RGB', (width, height), (255, 235, 180)), (0, 0), glow_mask)
    
    # Indoor Plant (Fiddle Leaf Fig in fluted ceramic pot)
    plant_x, plant_y = int(width * 0.86), int(height * 0.52)
    draw = ImageDraw.Draw(img)
    # Pot
    draw.polygon([(plant_x - 22, floor_y), (plant_x + 22, floor_y), (plant_x + 17, floor_y + 55), (plant_x - 17, floor_y + 55)], fill=(230, 225, 218), outline=(180, 170, 160))
    # Plant foliage leaves (deep forest green)
    leaf_colors = [(45, 75, 45), (55, 95, 55), (35, 60, 35), (65, 110, 60)]
    for ox, oy, rad in [(-20, -50, 32), (15, -70, 38), (-10, -110, 35), (20, -130, 32), (0, -160, 28)]:
        c = leaf_colors[np.random.randint(0, len(leaf_colors))]
        draw.ellipse([plant_x + ox - rad, plant_y + oy - rad, plant_x + ox + rad, plant_y + oy + rad], fill=c)
        
    # Large Textured Artwork on the Left Wall
    art_x1, art_y1, art_x2, art_y2 = int(width * 0.16), int(height * 0.15), int(width * 0.44), int(height * 0.42)
    draw.rectangle([art_x1 - 4, art_y1 - 4, art_x2 + 4, art_y2 + 4], fill=(30, 28, 26))
    draw.rectangle([art_x1, art_y1, art_x2, art_y2], fill=(245, 240, 232))
    # Abstract geometric strokes inside art
    draw.ellipse([art_x1 + 30, art_y1 + 25, art_x2 - 50, art_y2 - 30], fill=(210, 190, 165))
    draw.line([(art_x1 + 20, art_y2 - 25), (art_x2 - 20, art_y1 + 35)], fill=(60, 55, 50), width=6)
    
    # Subtle film grain
    render_img = add_noise(img, 0.02)
    render_path = os.path.join(OUTPUT_RENDERS_DIR, "living_room_modern.jpg")
    render_img.save(render_path, quality=95)
    
    # 2. Hand-Drawn Sketch (Black lines on warm sketchbook paper)
    sketch = Image.new('RGB', (width, height), (250, 248, 244))
    sdraw = ImageDraw.Draw(sketch)
    
    # Wall / ceiling perspective lines
    draw_hand_drawn_line(sdraw, [(0, floor_y), (width, floor_y)], width=3)
    draw_hand_drawn_line(sdraw, [(int(width * 0.58), 0), (int(width * 0.58), floor_y)], width=2)
    draw_hand_drawn_line(sdraw, [(0, int(height * 0.08)), (width, int(height * 0.08))], width=2)
    
    # Window
    draw_hand_drawn_line(sdraw, [(win_x1, win_y1), (win_x2, win_y1)], width=3)
    draw_hand_drawn_line(sdraw, [(win_x2, win_y1), (win_x2, win_y2)], width=3)
    draw_hand_drawn_line(sdraw, [(win_x1, win_y1), (win_x1, win_y2)], width=3)
    draw_hand_drawn_line(sdraw, [(win_x1 + (win_x2 - win_x1) // 2, win_y1), (win_x1 + (win_x2 - win_x1) // 2, win_y2)], width=2)
    draw_hand_drawn_line(sdraw, [(win_x1, win_y1 + (win_y2 - win_y1) // 2), (win_x2, win_y1 + (win_y2 - win_y1) // 2)], width=2)
    
    # Sofa
    draw_hand_drawn_line(sdraw, [(sofa_x1, sofa_y1), (sofa_x2, sofa_y1)], width=4)
    draw_hand_drawn_line(sdraw, [(sofa_x2, sofa_y1), (sofa_x2, sofa_y2)], width=4)
    draw_hand_drawn_line(sdraw, [(sofa_x2, sofa_y2), (sofa_x1, sofa_y2)], width=4)
    draw_hand_drawn_line(sdraw, [(sofa_x1, sofa_y2), (sofa_x1, sofa_y1)], width=4)
    # Sofa backrest
    draw_hand_drawn_line(sdraw, [(sofa_x1, sofa_y1 - 45), (sofa_x2, sofa_y1 - 45)], width=3)
    draw_hand_drawn_line(sdraw, [(sofa_x1, sofa_y1 - 45), (sofa_x1, sofa_y1)], width=3)
    draw_hand_drawn_line(sdraw, [(sofa_x2, sofa_y1 - 45), (sofa_x2, sofa_y1)], width=3)
    draw_hand_drawn_line(sdraw, [(mid_sofa, sofa_y1 - 45), (mid_sofa, sofa_y2)], width=2)
    
    # Oval Coffee Table
    sdraw.ellipse([tbl_x1, tbl_y1, tbl_x2, tbl_y2], outline=(35, 30, 25), width=3)
    
    # Floor Lamp
    draw_hand_drawn_line(sdraw, [(lamp_base_x - 15, lamp_base_y), (lamp_base_x + 15, lamp_base_y)], width=3)
    sdraw.arc([lamp_base_x, int(height * 0.20), int(width * 0.32), int(height * 0.75)], start=160, end=350, fill=(35, 30, 25), width=3)
    sdraw.chord([shade_x - 25, shade_y - 18, shade_x + 25, shade_y + 18], start=0, end=180, outline=(35, 30, 25), width=3)
    
    # Plant
    draw_hand_drawn_line(sdraw, [(plant_x - 20, floor_y), (plant_x + 20, floor_y)], width=3)
    draw_hand_drawn_line(sdraw, [(plant_x - 20, floor_y), (plant_x - 15, floor_y + 50)], width=2)
    draw_hand_drawn_line(sdraw, [(plant_x + 20, floor_y), (plant_x + 15, floor_y + 50)], width=2)
    draw_hand_drawn_line(sdraw, [(plant_x - 15, floor_y + 50), (plant_x + 15, floor_y + 50)], width=2)
    for ox, oy, rad in [(-20, -50, 25), (15, -70, 30), (-10, -110, 28), (20, -130, 26), (0, -160, 22)]:
        sdraw.ellipse([plant_x + ox - rad, plant_y + oy - rad, plant_x + ox + rad, plant_y + oy + rad], outline=(35, 30, 25), width=2)
        
    # Wall Art
    sdraw.rectangle([art_x1, art_y1, art_x2, art_y2], outline=(35, 30, 25), width=3)
    
    sketch_path = os.path.join(OUTPUT_SKETCHES_DIR, "living_room_modern.jpg")
    sketch.save(sketch_path, quality=95)
    print("Generated living_room_modern pair successfully!")

# ==============================================================================
# ROOM 2: Scandinavian Minimalist Bedroom
# ==============================================================================
def generate_bedroom():
    width, height = 768, 768
    # Render
    img = create_gradient(width, height, (242, 239, 234), (228, 222, 214))
    floor_y = int(height * 0.60)
    # Light Ash wood floor
    floor_grad = create_gradient(width, height - floor_y, (210, 195, 175), (180, 160, 140))
    img.paste(floor_grad, (0, floor_y))
    draw = ImageDraw.Draw(img)
    
    # Back wall vertical wood slats (Scandinavian fluted feature wall)
    slat_x1, slat_x2 = int(width * 0.15), int(width * 0.85)
    for sx in range(slat_x1, slat_x2, 16):
        draw.line([(sx, int(height * 0.10)), (sx, floor_y)], fill=(195, 175, 150), width=4)
        draw.line([(sx + 3, int(height * 0.10)), (sx + 3, floor_y)], fill=(215, 198, 175), width=4)
        
    # Platform Bed
    bed_x1, bed_y1 = int(width * 0.22), int(height * 0.48)
    bed_x2, bed_y2 = int(width * 0.78), int(height * 0.85)
    
    # Bed headboard (boucle upholstered cushion)
    draw.rounded_rectangle([bed_x1 - 10, bed_y1 - 60, bed_x2 + 10, bed_y1 + 40], radius=15, fill=(235, 230, 222), outline=(190, 180, 170), width=2)
    # Mattress & Linens (Soft warm grey and white layered duvet)
    draw.rounded_rectangle([bed_x1, bed_y1 + 10, bed_x2, bed_y2], radius=12, fill=(245, 245, 242), outline=(205, 200, 192), width=2)
    # Folded throw blanket
    draw.rounded_rectangle([bed_x1, int(bed_y1 + (bed_y2 - bed_y1) * 0.55), bed_x2, bed_y2], radius=10, fill=(180, 165, 150))
    # Pillows
    draw.rounded_rectangle([bed_x1 + 30, bed_y1 - 30, bed_x1 + 160, bed_y1 + 25], radius=12, fill=(255, 255, 252), outline=(210, 205, 195))
    draw.rounded_rectangle([bed_x2 - 160, bed_y1 - 30, bed_x2 - 30, bed_y1 + 25], radius=12, fill=(255, 255, 252), outline=(210, 205, 195))
    
    # Nightstands (Floating minimalist oak cubes)
    ns1_x1, ns1_y1, ns1_x2, ns1_y2 = int(width * 0.08), int(height * 0.52), int(width * 0.20), int(height * 0.65)
    ns2_x1, ns2_y1, ns2_x2, ns2_y2 = int(width * 0.80), int(height * 0.52), int(width * 0.92), int(height * 0.65)
    draw.rectangle([ns1_x1, ns1_y1, ns1_x2, ns1_y2], fill=(215, 190, 160), outline=(175, 150, 120), width=2)
    draw.rectangle([ns2_x1, ns2_y1, ns2_x2, ns2_y2], fill=(215, 190, 160), outline=(175, 150, 120), width=2)
    
    # Modern pendant lights hanging from ceiling over nightstands
    draw.line([(ns1_x1 + 45, 0), (ns1_x1 + 45, ns1_y1 - 70)], fill=(40, 40, 40), width=2)
    draw.ellipse([ns1_x1 + 25, ns1_y1 - 70, ns1_x1 + 65, ns1_y1 - 30], fill=(255, 250, 235), outline=(200, 180, 150))
    
    draw.line([(ns2_x1 + 45, 0), (ns2_x1 + 45, ns2_y1 - 70)], fill=(40, 40, 40), width=2)
    draw.ellipse([ns2_x1 + 25, ns2_y1 - 70, ns2_x1 + 65, ns2_y1 - 30], fill=(255, 250, 235), outline=(200, 180, 150))
    
    render_img = add_noise(img, 0.02)
    render_img.save(os.path.join(OUTPUT_RENDERS_DIR, "bedroom_scandinavian.jpg"), quality=95)
    
    # Sketch
    sketch = Image.new('RGB', (width, height), (250, 248, 244))
    sdraw = ImageDraw.Draw(sketch)
    draw_hand_drawn_line(sdraw, [(0, floor_y), (width, floor_y)], width=3)
    
    # Bed
    draw_hand_drawn_line(sdraw, [(bed_x1, bed_y1), (bed_x2, bed_y1)], width=4)
    draw_hand_drawn_line(sdraw, [(bed_x2, bed_y1), (bed_x2, bed_y2)], width=4)
    draw_hand_drawn_line(sdraw, [(bed_x2, bed_y2), (bed_x1, bed_y2)], width=4)
    draw_hand_drawn_line(sdraw, [(bed_x1, bed_y2), (bed_x1, bed_y1)], width=4)
    # Headboard
    draw_hand_drawn_line(sdraw, [(bed_x1 - 10, bed_y1 - 60), (bed_x2 + 10, bed_y1 - 60)], width=3)
    draw_hand_drawn_line(sdraw, [(bed_x1 - 10, bed_y1 - 60), (bed_x1 - 10, bed_y1)], width=3)
    draw_hand_drawn_line(sdraw, [(bed_x2 + 10, bed_y1 - 60), (bed_x2 + 10, bed_y1)], width=3)
    # Pillows
    sdraw.rectangle([bed_x1 + 30, bed_y1 - 30, bed_x1 + 160, bed_y1 + 25], outline=(35, 30, 25), width=2)
    sdraw.rectangle([bed_x2 - 160, bed_y1 - 30, bed_x2 - 30, bed_y1 + 25], outline=(35, 30, 25), width=2)
    # Nightstands
    sdraw.rectangle([ns1_x1, ns1_y1, ns1_x2, ns1_y2], outline=(35, 30, 25), width=3)
    sdraw.rectangle([ns2_x1, ns2_y1, ns2_x2, ns2_y2], outline=(35, 30, 25), width=3)
    # Lights
    draw_hand_drawn_line(sdraw, [(ns1_x1 + 45, 0), (ns1_x1 + 45, ns1_y1 - 70)], width=2)
    sdraw.ellipse([ns1_x1 + 25, ns1_y1 - 70, ns1_x1 + 65, ns1_y1 - 30], outline=(35, 30, 25), width=2)
    draw_hand_drawn_line(sdraw, [(ns2_x1 + 45, 0), (ns2_x1 + 45, ns2_y1 - 70)], width=2)
    sdraw.ellipse([ns2_x1 + 25, ns2_y1 - 70, ns2_x1 + 65, ns2_y1 - 30], outline=(35, 30, 25), width=2)
    
    sketch.save(os.path.join(OUTPUT_SKETCHES_DIR, "bedroom_scandinavian.jpg"), quality=95)
    print("Generated bedroom_scandinavian pair successfully!")

# ==============================================================================
# ROOM 3: Modern Marble Kitchen
# ==============================================================================
def generate_kitchen():
    width, height = 768, 768
    img = create_gradient(width, height, (230, 226, 222), (210, 205, 200))
    floor_y = int(height * 0.55)
    floor_grad = create_gradient(width, height - floor_y, (190, 185, 180), (140, 135, 130))
    img.paste(floor_grad, (0, floor_y))
    draw = ImageDraw.Draw(img)
    
    # Back Kitchen Cabinets & Countertop
    cab_y = int(height * 0.40)
    draw.rectangle([0, cab_y, width, floor_y], fill=(45, 48, 52)) # Matte charcoal base
    draw.rectangle([0, cab_y - 12, width, cab_y], fill=(245, 242, 238), outline=(190, 185, 180)) # White quartz counter
    # Upper cabinets
    draw.rectangle([0, int(height * 0.08), width, int(height * 0.28)], fill=(238, 235, 230), outline=(195, 190, 185))
    
    # Grand Center Island (Calacatta Gold Italian Marble Waterfall)
    isl_x1, isl_y1 = int(width * 0.20), int(height * 0.50)
    isl_x2, isl_y2 = int(width * 0.80), int(height * 0.82)
    
    # Island Body
    draw.rectangle([isl_x1, isl_y1, isl_x2, isl_y2], fill=(248, 246, 242), outline=(210, 205, 200), width=2)
    # Marble Veins on Island
    draw.line([(isl_x1 + 40, isl_y1 + 10), (isl_x1 + 150, isl_y1 + 80), (isl_x1 + 320, isl_y2 - 20)], fill=(195, 175, 150), width=3)
    draw.line([(isl_x1 + 220, isl_y1 + 15), (isl_x1 + 380, isl_y1 + 120), (isl_x2 - 80, isl_y2 - 10)], fill=(175, 155, 130), width=2)
    
    # Stools (Contemporary Minimalist Counter Stools)
    for sx in [isl_x1 + 80, isl_x1 + 220, isl_x1 + 360]:
        draw.ellipse([sx - 25, isl_y2 - 30, sx + 25, isl_y2 + 10], fill=(185, 145, 105)) # Oak seat
        draw.line([(sx - 15, isl_y2), (sx - 20, isl_y2 + 80)], fill=(30, 30, 30), width=3)
        draw.line([(sx + 15, isl_y2), (sx + 20, isl_y2 + 80)], fill=(30, 30, 30), width=3)
        
    # Trio of Brass Cylinder Pendant Lights
    for px in [int(width * 0.32), int(width * 0.50), int(width * 0.68)]:
        draw.line([(px, 0), (px, int(height * 0.26))], fill=(40, 40, 40), width=2)
        draw.rectangle([px - 14, int(height * 0.26), px + 14, int(height * 0.36)], fill=(205, 165, 95))
        
    render_img = add_noise(img, 0.02)
    render_img.save(os.path.join(OUTPUT_RENDERS_DIR, "kitchen_luxury.jpg"), quality=95)
    
    # Sketch
    sketch = Image.new('RGB', (width, height), (250, 248, 244))
    sdraw = ImageDraw.Draw(sketch)
    draw_hand_drawn_line(sdraw, [(0, floor_y), (width, floor_y)], width=3)
    draw_hand_drawn_line(sdraw, [(0, cab_y), (width, cab_y)], width=3)
    sdraw.rectangle([0, int(height * 0.08), width, int(height * 0.28)], outline=(35, 30, 25), width=3)
    
    # Island
    draw_hand_drawn_line(sdraw, [(isl_x1, isl_y1), (isl_x2, isl_y1)], width=4)
    draw_hand_drawn_line(sdraw, [(isl_x2, isl_y1), (isl_x2, isl_y2)], width=4)
    draw_hand_drawn_line(sdraw, [(isl_x2, isl_y2), (isl_x1, isl_y2)], width=4)
    draw_hand_drawn_line(sdraw, [(isl_x1, isl_y2), (isl_x1, isl_y1)], width=4)
    
    # Stools
    for sx in [isl_x1 + 80, isl_x1 + 220, isl_x1 + 360]:
        sdraw.ellipse([sx - 25, isl_y2 - 30, sx + 25, isl_y2 + 10], outline=(35, 30, 25), width=2)
        draw_hand_drawn_line(sdraw, [(sx - 15, isl_y2), (sx - 20, isl_y2 + 80)], width=2)
        draw_hand_drawn_line(sdraw, [(sx + 15, isl_y2), (sx + 20, isl_y2 + 80)], width=2)
        
    # Pendants
    for px in [int(width * 0.32), int(width * 0.50), int(width * 0.68)]:
        draw_hand_drawn_line(sdraw, [(px, 0), (px, int(height * 0.26))], width=2)
        sdraw.rectangle([px - 14, int(height * 0.26), px + 14, int(height * 0.36)], outline=(35, 30, 25), width=2)
        
    sketch.save(os.path.join(OUTPUT_SKETCHES_DIR, "kitchen_luxury.jpg"), quality=95)
    print("Generated kitchen_luxury pair successfully!")

# ==============================================================================
# ROOM 4: Spa Travertine Bathroom
# ==============================================================================
def generate_bathroom():
    width, height = 768, 768
    img = create_gradient(width, height, (235, 230, 222), (215, 208, 198))
    floor_y = int(height * 0.56)
    floor_grad = create_gradient(width, height - floor_y, (220, 212, 202), (185, 178, 168))
    img.paste(floor_grad, (0, floor_y))
    draw = ImageDraw.Draw(img)
    
    # Large format travertine tile grid
    for tx in range(0, width, 128):
        draw.line([(tx, floor_y), (tx, height)], fill=(175, 168, 158), width=1)
        
    # Floating Wooden Vanity with Dual Basins on Left
    van_x1, van_y1, van_x2, van_y2 = int(width * 0.05), int(height * 0.45), int(width * 0.42), int(height * 0.62)
    draw.rectangle([van_x1, van_y1, van_x2, van_y2], fill=(160, 125, 95), outline=(125, 95, 68), width=2)
    # White ceramic vessel sink
    draw.ellipse([van_x1 + 40, van_y1 - 18, van_x1 + 140, van_y1 + 18], fill=(250, 250, 248), outline=(210, 205, 198), width=2)
    # Brass faucet
    draw.rectangle([van_x1 + 85, van_y1 - 45, van_x1 + 95, van_y1 - 10], fill=(205, 165, 95))
    
    # Backlit Arch Vanity Mirror
    draw.chord([van_x1 + 20, int(height * 0.12), van_x1 + 160, int(height * 0.38)], start=180, end=0, fill=(240, 242, 245), outline=(205, 165, 95), width=3)
    draw.rectangle([van_x1 + 20, int(height * 0.25), van_x1 + 160, int(height * 0.42)], fill=(240, 242, 245), outline=(205, 165, 95), width=3)
    
    # Freestanding Oval Soaking Tub on the Right
    tub_x1, tub_y1 = int(width * 0.52), int(height * 0.55)
    tub_x2, tub_y2 = int(width * 0.92), int(height * 0.82)
    # Tub outer shell
    draw.ellipse([tub_x1, tub_y1, tub_x2, tub_y2], fill=(255, 253, 250), outline=(215, 210, 202), width=3)
    # Tub inner rim
    draw.ellipse([tub_x1 + 20, tub_y1 + 15, tub_x2 - 20, tub_y2 - 25], fill=(235, 240, 242), outline=(195, 205, 210), width=2)
    
    # Floor-mounted brass tub filler
    draw.line([(tub_x2 - 30, floor_y), (tub_x2 - 30, tub_y1 - 25)], fill=(205, 165, 95), width=6)
    draw.line([(tub_x2 - 30, tub_y1 - 25), (tub_x2 - 60, tub_y1 - 20)], fill=(205, 165, 95), width=5)
    
    render_img = add_noise(img, 0.02)
    render_img.save(os.path.join(OUTPUT_RENDERS_DIR, "bathroom_contemporary.jpg"), quality=95)
    
    # Sketch
    sketch = Image.new('RGB', (width, height), (250, 248, 244))
    sdraw = ImageDraw.Draw(sketch)
    draw_hand_drawn_line(sdraw, [(0, floor_y), (width, floor_y)], width=3)
    
    # Vanity
    sdraw.rectangle([van_x1, van_y1, van_x2, van_y2], outline=(35, 30, 25), width=3)
    sdraw.ellipse([van_x1 + 40, van_y1 - 18, van_x1 + 140, van_y1 + 18], outline=(35, 30, 25), width=2)
    # Mirror
    sdraw.chord([van_x1 + 20, int(height * 0.12), van_x1 + 160, int(height * 0.38)], start=180, end=0, outline=(35, 30, 25), width=3)
    sdraw.rectangle([van_x1 + 20, int(height * 0.25), van_x1 + 160, int(height * 0.42)], outline=(35, 30, 25), width=3)
    # Tub
    sdraw.ellipse([tub_x1, tub_y1, tub_x2, tub_y2], outline=(35, 30, 25), width=4)
    sdraw.ellipse([tub_x1 + 20, tub_y1 + 15, tub_x2 - 20, tub_y2 - 25], outline=(35, 30, 25), width=2)
    
    sketch.save(os.path.join(OUTPUT_SKETCHES_DIR, "bathroom_contemporary.jpg"), quality=95)
    print("Generated bathroom_contemporary pair successfully!")

# ==============================================================================
# ROOM 5: Industrial Chic Office
# ==============================================================================
def generate_office():
    width, height = 768, 768
    img = create_gradient(width, height, (215, 208, 200), (195, 188, 180))
    floor_y = int(height * 0.58)
    floor_grad = create_gradient(width, height - floor_y, (120, 115, 110), (80, 78, 75)) # Polished concrete floor
    img.paste(floor_grad, (0, floor_y))
    draw = ImageDraw.Draw(img)
    
    # Exposed Brick Wall texture on the right
    brick_x = int(width * 0.65)
    for by in range(0, floor_y, 20):
        draw.line([(brick_x, by), (width, by)], fill=(160, 95, 75), width=18)
        # Mortar line
        draw.line([(brick_x, by), (width, by)], fill=(210, 200, 190), width=2)
        
    # Metal & Wood Bookshelf on the Right Wall
    bs_x1, bs_y1, bs_x2, bs_y2 = int(width * 0.70), int(height * 0.12), int(width * 0.95), floor_y
    draw.rectangle([bs_x1, bs_y1, bs_x2, bs_y2], outline=(40, 40, 40), width=4)
    for sy in range(bs_y1 + 60, bs_y2, 70):
        draw.line([(bs_x1, sy), (bs_x2, sy)], fill=(160, 120, 85), width=8)
        
    # Executive Wooden Desk in Center
    desk_x1, desk_y1 = int(width * 0.20), int(height * 0.54)
    desk_x2, desk_y2 = int(width * 0.68), int(height * 0.80)
    # Solid Walnut tabletop
    draw.rounded_rectangle([desk_x1, desk_y1, desk_x2, desk_y1 + 45], radius=6, fill=(110, 75, 45), outline=(70, 45, 25), width=2)
    # Black steel trestle legs
    draw.line([(desk_x1 + 30, desk_y1 + 45), (desk_x1 + 10, desk_y2)], fill=(35, 35, 35), width=8)
    draw.line([(desk_x2 - 30, desk_y1 + 45), (desk_x2 - 10, desk_y2)], fill=(35, 35, 35), width=8)
    
    # Mid-Century Leather Office Chair
    ch_x1, ch_y1 = int(width * 0.36), int(height * 0.42)
    ch_x2, ch_y2 = int(width * 0.52), int(height * 0.70)
    draw.rounded_rectangle([ch_x1, ch_y1, ch_x2, ch_y1 + 80], radius=15, fill=(175, 110, 60), outline=(125, 75, 35), width=2)
    
    render_img = add_noise(img, 0.02)
    render_img.save(os.path.join(OUTPUT_RENDERS_DIR, "office_industrial.jpg"), quality=95)
    
    # Sketch
    sketch = Image.new('RGB', (width, height), (250, 248, 244))
    sdraw = ImageDraw.Draw(sketch)
    draw_hand_drawn_line(sdraw, [(0, floor_y), (width, floor_y)], width=3)
    sdraw.rectangle([bs_x1, bs_y1, bs_x2, bs_y2], outline=(35, 30, 25), width=3)
    for sy in range(bs_y1 + 60, bs_y2, 70):
        draw_hand_drawn_line(sdraw, [(bs_x1, sy), (bs_x2, sy)], width=2)
        
    # Desk
    sdraw.rectangle([desk_x1, desk_y1, desk_x2, desk_y1 + 45], outline=(35, 30, 25), width=3)
    draw_hand_drawn_line(sdraw, [(desk_x1 + 30, desk_y1 + 45), (desk_x1 + 10, desk_y2)], width=3)
    draw_hand_drawn_line(sdraw, [(desk_x2 - 30, desk_y1 + 45), (desk_x2 - 10, desk_y2)], width=3)
    # Chair
    sdraw.rectangle([ch_x1, ch_y1, ch_x2, ch_y1 + 80], outline=(35, 30, 25), width=3)
    
    sketch.save(os.path.join(OUTPUT_SKETCHES_DIR, "office_industrial.jpg"), quality=95)
    print("Generated office_industrial pair successfully!")

# ==============================================================================
# ROOM 6: Japandi Warm Dining Room
# ==============================================================================
def generate_dining():
    width, height = 768, 768
    img = create_gradient(width, height, (244, 240, 234), (230, 224, 215))
    floor_y = int(height * 0.58)
    floor_grad = create_gradient(width, height - floor_y, (215, 195, 170), (180, 160, 135))
    img.paste(floor_grad, (0, floor_y))
    draw = ImageDraw.Draw(img)
    
    # Round Natural Oak Dining Table
    tbl_x1, tbl_y1 = int(width * 0.25), int(height * 0.54)
    tbl_x2, tbl_y2 = int(width * 0.75), int(height * 0.82)
    # Fluted pedestal base
    draw.rectangle([int(width * 0.44), int(height * 0.65), int(width * 0.56), int(height * 0.86)], fill=(195, 170, 140), outline=(155, 130, 100), width=2)
    # Table top
    draw.ellipse([tbl_x1, tbl_y1, tbl_x2, tbl_y2], fill=(225, 205, 175), outline=(180, 155, 125), width=3)
    
    # Curved Wishbone dining chairs
    for cx in [int(width * 0.16), int(width * 0.76)]:
        draw.arc([cx - 35, int(height * 0.46), cx + 35, int(height * 0.62)], start=180, end=0, fill=(170, 140, 110), width=6)
        draw.line([(cx - 25, int(height * 0.55)), (cx - 25, int(height * 0.74))], fill=(160, 130, 100), width=4)
        draw.line([(cx + 25, int(height * 0.55)), (cx + 25, int(height * 0.74))], fill=(160, 130, 100), width=4)
        
    # Oversized Washi Paper Lantern Pendant Light
    pen_x, pen_y = int(width * 0.50), int(height * 0.28)
    draw.line([(pen_x, 0), (pen_x, pen_y - 70)], fill=(40, 40, 40), width=2)
    draw.ellipse([pen_x - 75, pen_y - 70, pen_x + 75, pen_y + 70], fill=(255, 252, 245), outline=(220, 210, 195), width=2)
    # Ribbed bamboo rings on paper lantern
    for ry in range(pen_y - 50, pen_y + 55, 20):
        draw.ellipse([pen_x - 70, ry - 10, pen_x + 70, ry + 10], outline=(215, 200, 185), width=1)
        
    # Ceramic vase with delicate dried botanicals on table
    draw.ellipse([pen_x - 12, int(height * 0.62), pen_x + 12, int(height * 0.68)], fill=(210, 195, 180))
    draw.line([(pen_x, int(height * 0.63)), (pen_x - 15, int(height * 0.55))], fill=(110, 95, 80), width=2)
    draw.line([(pen_x, int(height * 0.63)), (pen_x + 18, int(height * 0.53))], fill=(110, 95, 80), width=2)
    
    render_img = add_noise(img, 0.02)
    render_img.save(os.path.join(OUTPUT_RENDERS_DIR, "dining_japandi.jpg"), quality=95)
    
    # Sketch
    sketch = Image.new('RGB', (width, height), (250, 248, 244))
    sdraw = ImageDraw.Draw(sketch)
    draw_hand_drawn_line(sdraw, [(0, floor_y), (width, floor_y)], width=3)
    # Table
    sdraw.ellipse([tbl_x1, tbl_y1, tbl_x2, tbl_y2], outline=(35, 30, 25), width=4)
    # Chairs
    for cx in [int(width * 0.16), int(width * 0.76)]:
        sdraw.arc([cx - 35, int(height * 0.46), cx + 35, int(height * 0.62)], start=180, end=0, fill=(35, 30, 25), width=3)
        draw_hand_drawn_line(sdraw, [(cx - 25, int(height * 0.55)), (cx - 25, int(height * 0.74))], width=2)
        draw_hand_drawn_line(sdraw, [(cx + 25, int(height * 0.55)), (cx + 25, int(height * 0.74))], width=2)
    # Lantern
    draw_hand_drawn_line(sdraw, [(pen_x, 0), (pen_x, pen_y - 70)], width=2)
    sdraw.ellipse([pen_x - 75, pen_y - 70, pen_x + 75, pen_y + 70], outline=(35, 30, 25), width=3)
    
    sketch.save(os.path.join(OUTPUT_SKETCHES_DIR, "dining_japandi.jpg"), quality=95)
    print("Generated dining_japandi pair successfully!")

if __name__ == "__main__":
    generate_living_room()
    generate_bedroom()
    generate_kitchen()
    generate_bathroom()
    generate_office()
    generate_dining()
    print("ALL 6 ROOM PAIRS SUCCESSFULLY GENERATED!")
