# Change to the backend directory
Set-Location -Path "$PSScriptRoot\backend"

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
npm install

# Create a .env file from the example if it doesn't exist
if (-not (Test-Path -Path ".\.env")) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    Copy-Item -Path ".\.env.example" -Destination ".\.env" -Force
}

Write-Host "Backend setup complete!" -ForegroundColor Green
Write-Host "Please edit the .env file with your configuration." -ForegroundColor Yellow
Write-Host "To start the backend server, run: npm run dev" -ForegroundColor Yellow
