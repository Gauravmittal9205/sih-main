@echo off
echo 🚀 Starting Farm Rakshaa Application...
echo ================================================

REM Check if backend is running
netstat -an | find "3001" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Backend server is already running on port 3001
) else (
    echo 🔧 Starting Backend Server...
    start "Backend Server" cmd /k "cd backend && npm run dev"
    timeout /t 5 /nobreak >nul
)

REM Check if frontend is running
netstat -an | find "5173" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Frontend server is already running on port 5173
) else (
    echo 🎨 Starting Frontend Server...
    start "Frontend Server" cmd /k "npm run dev"
    timeout /t 5 /nobreak >nul
)

echo ⏳ Waiting for servers to start...
timeout /t 10 /nobreak >nul

echo 🌐 Opening Farm Rakshaa Landing Page...
start http://localhost:5173

echo ================================================
echo 🎉 Farm Rakshaa is now running!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:3001
echo 🏠 Landing Page: http://localhost:5173
echo ================================================
echo 💡 Close this window when done
pause
