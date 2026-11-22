"""
Unit test for SketchSpace AI Backend and Orchestrator.
Tests all endpoints and photorealistic generation pipelines locally.
"""

from fastapi.testclient import TestClient
import os
from PIL import Image
import io

from main import app

client = TestClient(app)

def test_api():
    print("[1/4] Testing Root and Status Endpoint...")
    res = client.get("/api/status")
    assert res.status_code == 200
    status_data = res.json()
    print(f"       System status: {status_data['status']}, GPU: {status_data['device_name']}, CUDA: {status_data['cuda_available']}")

    print("[2/4] Testing Gallery Endpoint...")
    res = client.get("/api/gallery")
    assert res.status_code == 200
    gallery_data = res.json()
    print(f"       Retrieved {len(gallery_data)} verified architectural gallery items.")
    assert len(gallery_data) > 0

    print("[3/4] Testing Sample Sketches Static Endpoint...")
    sample_key = gallery_data[0]["id"]
    res = client.get(f"/api/samples/sketches/{sample_key}.jpg")
    assert res.status_code == 200
    print(f"       Sample sketch '{sample_key}.jpg' loaded successfully (bytes: {len(res.content)})")

    print("[4/4] Testing /api/generate Endpoint with a sample sketch and new specifications...")
    sketch_path = os.path.join(os.path.dirname(__file__), "samples", "sketches", f"{sample_key}.jpg")
    with open(sketch_path, "rb") as f:
        file_bytes = f.read()

    response = client.post(
        "/api/generate",
        files={"sketch": ("sketch.jpg", file_bytes, "image/jpeg")},
        data={
            "room_type": "Bedroom",
            "interior_style": "Modern Luxury",
            "flooring": "Wooden Flooring",
            "wall_design": "White Paint",
            "lighting_pref": "Natural Daylight",
            "color_theme": "Beige and White",
            "engine_mode": "auto"
        }
    )
    assert response.status_code == 200
    result = response.json()
    print(f"       Generation Succeeded!")
    print(f"       Model: {result['model_name']}")
    print(f"       Structural Fidelity: {result['metrics']['structural_fidelity']}")
    print(f"       Latency: {result['latency_seconds']}s")
    assert "rendered_image_base64" in result
    assert "sketch_image_base64" in result
    assert "stages_log" in result

    print("\nALL BACKEND UNIT TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_api()
