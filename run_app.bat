@echo off
title SketchSpace AI - Generative AI Interior Design Studio
echo =====================================================================
echo                SketchSpace AI - Team 9 (Gen AI)
echo      Transforming Hand-Drawn Room Sketches into Realistic Interiors
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/2] Checking Python and CUDA environment...
python -c "import torch; print('PyTorch CUDA Ready:', torch.cuda.is_available(), '| Device:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CPU')"

echo.
echo [2/2] Launching SketchSpace AI Full-Stack Server...
echo API and Frontend will be accessible at: http://127.0.0.1:8000
echo (Interactive API Docs: http://127.0.0.1:8000/docs)
echo.

start "" http://127.0.0.1:8000

cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

pause
