# Setup and Run Biosecurity ML API
Write-Host "🚀 Setting up Biosecurity ML API..." -ForegroundColor Green

# Navigate to ML API directory
Set-Location "ml-api"

# Check if Python is installed
try {
    $pythonVersion = python --version
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.8+ first." -ForegroundColor Red
    exit 1
}

# Check if pip is available
try {
    $pipVersion = pip --version
    Write-Host "✅ pip found: $pipVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pip not found. Please install pip first." -ForegroundColor Red
    exit 1
}

# Install required packages
Write-Host "📦 Installing required packages..." -ForegroundColor Yellow
pip install -r requirements.txt

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Packages installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install packages" -ForegroundColor Red
    exit 1
}

# Train the ML model
Write-Host "🤖 Training ML model..." -ForegroundColor Yellow
python biosecurity_model.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Model trained successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to train model" -ForegroundColor Red
    exit 1
}

# Start the ML API
Write-Host "🌐 Starting ML API..." -ForegroundColor Yellow
Write-Host "📊 API will be available at: http://localhost:5001" -ForegroundColor Cyan
Write-Host "🔍 Health check: http://localhost:5001/health" -ForegroundColor Cyan
Write-Host "📝 Sample input: http://localhost:5001/sample-input" -ForegroundColor Cyan
Write-Host "🎯 Prediction endpoint: http://localhost:5001/predict" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the API" -ForegroundColor Yellow

python biosecurity_api.py
