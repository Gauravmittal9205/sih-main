# Install multer dependency for file uploads
Write-Host "🔧 Installing multer dependency..." -ForegroundColor Cyan
npm install multer

# Create uploads directory structure
Write-Host "📁 Creating uploads directory structure..." -ForegroundColor Cyan
$uploadsDir = "uploads\profile-images"
if (!(Test-Path $uploadsDir)) {
    New-Item -ItemType Directory -Path $uploadsDir -Force
    Write-Host "✅ Created uploads directory: $uploadsDir" -ForegroundColor Green
} else {
    Write-Host "✅ Uploads directory already exists: $uploadsDir" -ForegroundColor Green
}

Write-Host "🎉 Setup complete! You can now start the server with 'npm run dev'" -ForegroundColor Green
