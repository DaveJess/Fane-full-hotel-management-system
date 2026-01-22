@echo off
echo ========================================
echo    FANE HOTEL MANAGEMENT SYSTEM
echo ========================================
echo.
echo Starting both servers...
echo.

REM Start Backend
cd /d "%~dp0HOTEL-2"
start "Backend Server" cmd /c "npm run dev"

REM Start Frontend  
cd /d "%~dp0Hotel-Manage-Frontend-Fane"
start "Frontend Server" cmd /c "npm run dev"

echo.
echo ========================================
echo    Full-Stack Application Running!
echo ========================================
echo.
echo Backend: http://localhost:4000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
pause
