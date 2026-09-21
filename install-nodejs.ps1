$nodeUrl = "https://nodejs.org/dist/v20.11.0/node-v20.11.0-win-x64.msi"
$output = "C:\Temp\nodejs.msi"

# Create temp directory if it doesn't exist
New-Item -ItemType Directory -Path "C:\Temp" -Force | Out-Null

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Download Node.js
Write-Host "Downloading Node.js v20.11.0..."
(New-Object System.Net.WebClient).DownloadFile($nodeUrl, $output)

# Install Node.js silently
Write-Host "Installing Node.js..."
Start-Process -FilePath $output -ArgumentList "/quiet" -Wait

# Clean up
Remove-Item $output

Write-Host "Node.js installation complete!"
