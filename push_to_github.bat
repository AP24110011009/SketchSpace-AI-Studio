@echo off
title Push to GitHub - AP24110011009
echo =====================================================================
echo       Pushing SketchSpace AI Studio to GitHub
echo       Account: https://github.com/AP24110011009/SketchSpace-AI-Studio
echo =====================================================================
echo.
cd /d "%~dp0"

git config user.name "AP24110011009"
git config user.email "AP24110011009@users.noreply.github.com"
git remote remove origin >nul 2>&1
git remote add origin https://github.com/AP24110011009/SketchSpace-AI-Studio.git
git branch -M main

echo Starting Git Push...
echo A browser popup will appear asking you to "Sign in with your browser".
echo Simply click "Sign in" / "Authorize" to push directly to AP24110011009!
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo SUCCESS! Your code is now live on GitHub:
    echo https://github.com/AP24110011009/SketchSpace-AI-Studio
    echo =====================================================================
) else (
    echo.
    echo If browser login failed, enter your GitHub Personal Access Token (PAT):
    echo (Generate at: https://github.com/settings/tokens/new with 'repo' checked)
    set /p GHP_TOKEN="Paste Token (ghp_...) or press Enter to cancel: "
    if not "%GHP_TOKEN%"=="" (
        git push https://%GHP_TOKEN%@github.com/AP24110011009/SketchSpace-AI.git main -u
    )
)

pause
