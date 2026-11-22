@echo off
title SketchSpace AI - Cloudflare Live Public Deployment Tunnel
echo =====================================================================
echo                SketchSpace AI - Instant Live Public URL
echo =====================================================================
echo.
echo Checking full-stack server on port 8000...
curl.exe -s http://127.0.0.1:8000/api/status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [NOTE] Port 8000 server is starting...
    start /min "" cmd /c "%~dp0run_app.bat"
    timeout /t 3 >nul
)
echo Server is running!
echo.
echo Launching secure enterprise HTTPS tunnel via Cloudflare...
echo Share the generated https://*.trycloudflare.com URL with recruiters!
echo.
echo ---------------------------------------------------------------------
"%~dp0cloudflared.exe" tunnel --url http://127.0.0.1:8000
echo ---------------------------------------------------------------------
pause
