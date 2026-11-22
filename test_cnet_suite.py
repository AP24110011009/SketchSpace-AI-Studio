import os, sys
sys.path.append('backend')
from ai_engine.controlnet_sd import ControlNetSDPipeline
from ai_engine.preprocessor import SketchPreprocessor
from PIL import Image

prep = SketchPreprocessor(target_size=(768, 768))
cnet = ControlNetSDPipeline()

test_cases = [
    {
        'name': 'bedroom_centered',
        'path': r'backend\samples\sketches\bedroom_scandinavian.jpg',
        'prompt': 'Award-winning architectural photograph of modern luxury Bedroom, centered bed with white fabric linens, wardrobe closet on right wall, large window on left wall, wooden flooring, warm ceiling lighting, 8k uhd, photorealistic, elegant interior design'
    },
    {
        'name': 'bathroom_round_mirror',
        'path': r'C:\Users\gudib\.gemini\antigravity\brain\31d1d55a-1a47-476f-ae13-4c4a0275f201\.user_uploaded\media_1795278621523_1b9d6276.jpg',
        'prompt': 'Award-winning architectural photograph of minimalist Bathroom, round circular mirror on left wall with floating wooden vanity and double bowl sinks, built-in oval bathtub on right, glass shower in background, marble floor, photorealistic 8k'
    },
    {
        'name': 'bedroom_desk_window',
        'path': r'C:\Users\gudib\.gemini\antigravity\brain\31d1d55a-1a47-476f-ae13-4c4a0275f201\.user_uploaded\media_1795278621528_f10b45a4.jpg',
        'prompt': 'Award-winning architectural photograph of scandinavian Bedroom, wooden bed in center, study desk and chair in front of bright window on right wall, wooden flooring, cream white walls, photorealistic 8k'
    }
]

neg = 'blurry, disfigured, low quality, cartoon, 3d render, sketch, drawing, distorted, oversaturated'

for tc in test_cases:
    print('Generating for:', tc['name'])
    img = Image.open(tc['path']).convert('RGB')
    p_res = prep.process(img)
    out = cnet.generate(
        condition_image=p_res['scribble_map'],
        prompt=tc['prompt'],
        negative_prompt=neg,
        num_inference_steps=18,
        guidance_scale=7.5,
        controlnet_conditioning_scale=0.9,
        seed=42
    )
    fname = f"test_cnet_{tc['name']}.jpg"
    out.save(fname)
    print(f"Successfully generated {fname}")

print("ALL THREE COMPLETE!")
