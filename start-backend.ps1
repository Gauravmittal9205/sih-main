# Change to the backend directory
Set-Location -Path "$PSScriptRoot\backend"

# Install backend dependencies if not already installed
if (-not (Test-Path -Path ".\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    npm install
}

# Create a .env file from the example if it doesn't exist
if (-not (Test-Path -Path ".\.env")) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    Copy-Item -Path ".\.env.example" -Destination ".\.env" -Force
}

# Start the backend server
Write-Host "Starting backend server..." -ForegroundColor Cyan
npm run dev
