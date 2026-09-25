# Final Node.js v22.12.0 Setup Script
$nodeUrl = "https://nodejs.org/dist/v22.12.0/node-v22.12.0-win-x64.zip"
$output = "C:\Temp\nodejs-v22.zip"
$extractPath = "C:\Temp\node-extract"
$finalPath = "C:\nodejs-v22"

Write-Host "=== Node.js v22.12.0 Setup ===" -ForegroundColor Green

# Clean up if exists
if (Test-Path $extractPath) {
    Write-Host "Cleaning up temporary extraction folder..."
    Remove-Item -Path $extractPath -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path $finalPath) {
    Write-Host "Removing existing Node.js v22 installation..."
    Remove-Item -Path $finalPath -Recurse -Force -ErrorAction SilentlyContinue
}

# Create directories
New-Item -ItemType Directory -Path "C:\Temp" -Force | Out-Null
New-Item -ItemType Directory -Path $extractPath -Force | Out-Null

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Download
Write-Host "Downloading Node.js v22.12.0..." -ForegroundColor Cyan
try {
    (New-Object System.Net.WebClient).DownloadFile($nodeUrl, $output)
    Write-Host "✓ Downloaded successfully!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Download failed: $_" -ForegroundColor Red
    exit 1
}

# Extract
Write-Host "Extracting to temporary folder..." -ForegroundColor Cyan
try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($output, $extractPath)
    Write-Host "✓ Extracted successfully!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Extraction failed: $_" -ForegroundColor Red
    exit 1
}

# Move to final location
Write-Host "Setting up final installation..." -ForegroundColor Cyan
try {
    $sourceFolder = Get-ChildItem -Path $extractPath -Directory | Select-Object -First 1
    Move-Item -Path $sourceFolder.FullName -Destination $finalPath -Force
    Remove-Item $output -Force -ErrorAction SilentlyContinue
    Remove-Item $extractPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Installation moved to $finalPath" -ForegroundColor Green
}
catch {
    Write-Host "✗ Setup failed: $_" -ForegroundColor Red
    exit 1
}

# Update PATH - prioritize new Node.js
Write-Host "Updating PATH..." -ForegroundColor Cyan
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")

# Remove old Node.js paths
$newPath = ($currentPath -split ';' | Where-Object { 
    $_ -notlike "*nodejs*" -and $_ -ne "" 
}) -join ';'

# Add new Node.js path at the beginning
$newPath = "$finalPath;$newPath"
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
Write-Host "✓ PATH updated!" -ForegroundColor Green

# Refresh environment
$env:PATH = "$finalPath;$env:PATH"

# Verify installation
Write-Host "`nVerifying installation..." -ForegroundColor Cyan
$nodeVersion = & "$finalPath\node.exe" --version 2>&1
$npmVersion = & "$finalPath\npm.cmd" --version 2>&1

Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host "npm version: $npmVersion" -ForegroundColor Green

Write-Host "`n✓ Setup complete! Restart your terminal and run: pnpm dev" -ForegroundColor Green
