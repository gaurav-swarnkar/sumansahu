# Install nvm-windows for Node version management
$nvmUrl = "https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe"
$output = "C:\Temp\nvm-setup.exe"

# Create temp directory if it doesn't exist
New-Item -ItemType Directory -Path "C:\Temp" -Force | Out-Null

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Download nvm-windows
Write-Host "Downloading nvm-windows..."
try {
    (New-Object System.Net.WebClient).DownloadFile($nvmUrl, $output)
    Write-Host "nvm-windows downloaded successfully!"
    
    # Install nvm-windows
    Write-Host "Installing nvm-windows..."
    Start-Process -FilePath $output -ArgumentList "/S" -Wait
    
    # Clean up
    Remove-Item $output -Force
    
    Write-Host "nvm-windows installation complete!"
    Write-Host "Please restart your terminal and run: nvm install 20"
}
catch {
    Write-Host "Error: $_"
}
