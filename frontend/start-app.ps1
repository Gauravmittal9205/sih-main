# Farm Rakshaa Application Starter
# This script starts both frontend and backend servers and opens the landing page

Write-Host "🚀 Starting Farm Rakshaa Application..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Function to wait for server to be ready
function Wait-ForServer {
    param([int]$Port, [string]$ServerName)
    $maxAttempts = 30
    $attempt = 0
    
    Write-Host "⏳ Waiting for $ServerName to be ready on port $Port..." -ForegroundColor Yellow
    
    while ($attempt -lt $maxAttempts) {
        if (Test-Port -Port $Port) {
            Write-Host "✅ $ServerName is ready!" -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds 2
        $attempt++
        Write-Host "   Attempt $attempt/$maxAttempts..." -ForegroundColor Gray
    }
    
    Write-Host "❌ $ServerName failed to start within expected time" -ForegroundColor Red
    return $false
}

# Check if backend is already running
if (Test-Port -Port 3001) {
    Write-Host "⚠️  Backend server is already running on port 3001" -ForegroundColor Yellow
} else {
    Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
    
    # Start backend in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\backend'; npm run dev" -WindowStyle Normal
    
    # Wait for backend to be ready
    if (-not (Wait-ForServer -Port 3001 -ServerName "Backend")) {
        Write-Host "❌ Failed to start backend server" -ForegroundColor Red
        exit 1
    }
}

# Check if frontend is already running
if (Test-Port -Port 5173) {
    Write-Host "⚠️  Frontend server is already running on port 5173" -ForegroundColor Yellow
} else {
    Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Cyan
    
    # Start frontend in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot'; npm run dev" -WindowStyle Normal
    
    # Wait for frontend to be ready
    if (-not (Wait-ForServer -Port 5173 -ServerName "Frontend")) {
        Write-Host "❌ Failed to start frontend server" -ForegroundColor Red
        exit 1
    }
}

# Wait a bit more for everything to be fully loaded
Write-Host "⏳ Waiting for application to fully load..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Open the landing page in default browser
Write-Host "🌐 Opening Farm Rakshaa Landing Page..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "================================================" -ForegroundColor Green
Write-Host "🎉 Farm Rakshaa is now running!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "🏠 Landing Page: http://localhost:5173" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Green
Write-Host "💡 Press Ctrl+C to stop this script (servers will continue running)" -ForegroundColor Yellow

# Keep the script running to show status
try {
    while ($true) {
        $backendStatus = if (Test-Port -Port 3001) { "✅" } else { "❌" }
        $frontendStatus = if (Test-Port -Port 5173) { "✅" } else { "❌" }
        
        Write-Host "`rStatus: Backend $backendStatus | Frontend $frontendStatus" -NoNewline -ForegroundColor Gray
        Start-Sleep -Seconds 5
    }
} catch {
    Write-Host "`n👋 Stopping Farm Rakshaa starter script..." -ForegroundColor Yellow
}
