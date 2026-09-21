# Download and install Node.js v20 from portable ZIP
$nodeUrl = "https://nodejs.org/dist/v20.9.0/node-v20.9.0-win-x64.zip"
$output = "C:\Temp\nodejs.zip"
$extractPath = "C:\nodejs"

# Create directories
New-Item -ItemType Directory -Path "C:\Temp" -Force | Out-Null
New-Item -ItemType Directory -Path $extractPath -Force | Out-Null

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Downloading Node.js v20.9.0..."
try {
    (New-Object System.Net.WebClient).DownloadFile($nodeUrl, $output)
    Write-Host "Downloaded successfully!"
    
    # Extract
    Write-Host "Extracting..."
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($output, $extractPath)
    
    # Move files to root
    $sourceFolder = Get-ChildItem -Path $extractPath -Directory | Select-Object -First 1
    Get-ChildItem -Path $sourceFolder.FullName | Move-Item -Destination $extractPath -Force
    Remove-Item -Path $sourceFolder.FullName -Force
    
    # Add to PATH
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if (-not $currentPath.Contains($extractPath)) {
        [Environment]::SetEnvironmentVariable("PATH", "$extractPath;$currentPath", "User")
        Write-Host "Added $extractPath to PATH"
    }
    
    # Clean up
    Remove-Item $output -Force
    
    Write-Host "Node.js v20.9.0 installed to $extractPath"
    Write-Host "Please restart your terminal and run: node --version"
}
catch {
    Write-Host "Error: $_"
}
