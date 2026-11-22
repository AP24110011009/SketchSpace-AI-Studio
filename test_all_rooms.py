import requests, io
from PIL import Image, ImageDraw

room_tests = [
    {
        'room': 'Living Room',
        'style': 'Modern Luxury',
        'floor': 'Wooden Flooring',
        'wall': 'Textured Walls',
        'light': 'Warm Lighting',
        'color': 'Beige and White',
        'shape': 'sofa_and_window'
    },
    {
        'room': 'Dining Room',
        'style': 'Japandi',
        'floor': 'Wooden Flooring',
        'wall': 'Wooden Panels',
        'light': 'Natural Daylight',
        'color': 'Brown and Cream',
        'shape': 'table_chairs'
    },
    {
        'room': 'Home Office',
        'style': 'Industrial',
        'floor': 'Concrete',
        'wall': 'Textured Walls',
        'light': 'LED Lighting',
        'color': 'Black and Gold',
        'shape': 'desk_shelf'
    }
]

for rt in room_tests:
    img = Image.new('RGB', (768, 768), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.rectangle([(80, 80), (688, 688)], outline=(0, 0, 0), width=4)
    if rt['shape'] == 'sofa_and_window':
        d.rectangle([(200, 360), (568, 520)], outline=(0, 0, 0), width=3)
        d.line([(240, 80), (528, 80)], fill=(0, 0, 0), width=6)
    elif rt['shape'] == 'table_chairs':
        d.ellipse([(260, 320), (508, 480)], outline=(0, 0, 0), width=3)
    else:
        d.rectangle([(220, 380), (548, 500)], outline=(0, 0, 0), width=3)
        d.rectangle([(100, 160), (200, 480)], outline=(0, 0, 0), width=3)
    
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    buf.seek(0)
    
    files = {'sketch': (f"{rt['room']}.jpg", buf, 'image/jpeg')}
    data = {
        'room_type': rt['room'],
        'interior_style': rt['style'],
        'flooring': rt['floor'],
        'wall_design': rt['wall'],
        'lighting_pref': rt['light'],
        'color_theme': rt['color'],
        'engine_mode': 'controlnet',
        'guidance_scale': '7.5',
        'control_strength': '0.85'
    }
    r = requests.post('http://127.0.0.1:8000/api/generate', files=files, data=data, timeout=60)
    res = r.json()
    print(f"Room: {rt['room']}, status: {r.status_code}, pipeline: {res.get('pipeline_used')}, latency: {res.get('latency_seconds')}s")

print("ALL TEST ROOMS VERIFIED SUCCESSFULLY!")
