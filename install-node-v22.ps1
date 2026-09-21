# Download and install Node.js v22 from portable ZIP
$nodeUrl = "https://nodejs.org/dist/v22.0.0/node-v22.0.0-win-x64.zip"
$output = "C:\Temp\nodejs-v22.zip"
$extractPath = "C:\nodejs-v22"

# Create directories
New-Item -ItemType Directory -Path "C:\Temp" -Force | Out-Null
New-Item -ItemType Directory -Path $extractPath -Force | Out-Null

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Downloading Node.js v22.0.0..."
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
    
    # Clean up
    Remove-Item $output -Force
    
    Write-Host "Node.js v22.0.0 installed to $extractPath"
    Write-Host "Run with: C:\nodejs-v22\node.exe"
}
catch {
    Write-Host "Error: $_"
}
