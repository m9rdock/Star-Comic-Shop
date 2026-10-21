@echo off
title Star Comics Store
echo Starting Star Comics Local Server...

:: Check if node is in PATH
where node >nul 2>nul
if %errorlevel% equ 0 (
    node server.js
    goto :end
)

:: Check Adobe node fallback
if exist "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" (
    "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" server.js
    goto :end
)

:: Fallback: Open index.html directly in default browser
echo Node.js not detected in PATH. Opening index.html directly in browser...
start index.html

:end
pause
