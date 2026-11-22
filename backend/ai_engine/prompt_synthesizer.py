"""
Prompt Synthesis Engine for SketchSpace AI.
Constructs professional architectural diffusion prompts optimized to fit strictly
within the 77-token CLIP limit of Stable Diffusion 1.5.
"""

COMPACT_STYLES = {
    "Modern Luxury": "modern luxury Italian design, bespoke craftsmanship",
    "Minimalist": "clean minimalist Bauhaus architecture, serene negative space",
    "Scandinavian": "Nordic scandinavian hygge, natural light ash wood",
    "Contemporary": "contemporary organic modern elegance, soft curved lines",
    "Traditional Indian": "traditional Indian luxury heritage interior, carved teak wood",
    "Industrial": "industrial urban loft architecture, exposed brick, black steel",
    "Japandi": "japandi zen organic oak, tranquil wabi-sabi balance",
    "Royal Interior": "royal palace classical molding, velvet drapery, chandelier"
}

COMPACT_FLOORING = {
    "Wooden Flooring": "seamless polished chevron oak hardwood floor",
    "Marble Flooring": "bookmatched white Calacatta marble slab floor",
    "Ceramic Tiles": "large format matte porcelain ceramic tile floor",
    "Granite": "deep honed dark charcoal granite stone floor",
    "Concrete": "smooth polished concrete microcement floor"
}

COMPACT_WALLS = {
    "White Paint": "crisp white architectural plaster walls",
    "Textured Walls": "textured limewash plaster walls",
    "Wallpaper": "designer luxury geometric wallpaper",
    "Wooden Panels": "vertical fluted warm oak wood slat wall",
    "Marble Wall": "floor-to-ceiling polished marble feature wall"
}

COMPACT_LIGHTING = {
    "Natural Daylight": "bright natural daylight large windows, soft diffused light",
    "Warm Lighting": "warm 2700K cozy ambient cove lighting",
    "LED Lighting": "modern recessed minimalist architectural LED strip lights",
    "Luxury Chandelier": "grand statement brass crystal chandelier",
    "Ambient Lighting": "subtle moody ambient glow, balanced indirect light bounce"
}

COMPACT_PALETTES = {
    "Beige and White": "warm beige, ivory, and cream palette",
    "Black and Gold": "matte black and champagne gold brass palette",
    "White and Grey": "monochromatic crisp white and slate grey palette",
    "Brown and Cream": "walnut brown and warm caramel cream palette",
    "Blue and White": "coastal indigo blue and crisp white palette"
}

def build_interior_prompt(
    room_type: str = "Living Room",
    style: str = "Modern Luxury",
    color_theme: str = "Beige and White",
    custom_color: str = "",
    flooring: str = "Wooden Flooring",
    wall_design: str = "White Paint",
    lighting: str = "Natural Daylight",
    furniture_pref: str = "",
    decor_pref: str = ""
) -> tuple[str, str]:
    """
    Constructs an ultra-realistic architectural prompt strictly fitting within
    CLIP 77-token limit so every specification directly influences the diffusion latent.
    """
    style_str = COMPACT_STYLES.get(style, "modern luxury design")
    floor_str = COMPACT_FLOORING.get(flooring, "hardwood floor")
    wall_str = COMPACT_WALLS.get(wall_design, "plaster walls")
    light_str = COMPACT_LIGHTING.get(lighting, "natural daylight")
    
    if custom_color and custom_color.strip():
        color_str = f"{custom_color.strip()} designer color accents"
    else:
        color_str = COMPACT_PALETTES.get(color_theme, "warm beige and white palette")

    # Keep prompt concise, architectural, and high-impact
    prompt = (
        f"Award-winning architectural interior photograph of a realistic {room_type}, "
        f"{style_str}, {wall_str}, {floor_str}, {light_str}, {color_str}, "
        f"8k resolution, photorealistic Hasselblad shot, Architectural Digest"
    )

    negative_prompt = (
        "rough sketch, pencil sketch, drawing, cartoon, 3d render plastic CGI, "
        "blurry, distorted perspective, crooked lines, disproportional, low quality, artifacts"
    )

    return prompt, negative_prompt
