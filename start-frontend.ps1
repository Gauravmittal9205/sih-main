# Install frontend dependencies if not already installed
if (-not (Test-Path -Path ".\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
}

# Start the frontend development server
Write-Host "Starting frontend development server..." -ForegroundColor Cyan
npm run dev
