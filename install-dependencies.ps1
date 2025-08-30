# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

# Install backend dependencies
Write-Host "`nInstalling backend dependencies..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend"
npm install

# Return to project root
Set-Location -Path $PSScriptRoot

Write-Host "`nAll dependencies installed successfully!" -ForegroundColor Green
Write-Host "To start the application, run the following commands in separate terminals:" -ForegroundColor Yellow
Write-Host "1. Start MongoDB service" -ForegroundColor Yellow
Write-Host "2. .\start-backend.ps1" -ForegroundColor Yellow
Write-Host "3. .\start-frontend.ps1" -ForegroundColor Yellow
