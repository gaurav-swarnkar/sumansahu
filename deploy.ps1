# FTP Deployment Script
# This script uploads the dist folder to your FTP server securely

$FtpHost = "195.35.44.20"
$FtpUsername = "u934932838.sumansahu.in"
$FtpPort = 21
$RemotePath = "/public_html"
$LocalDistPath = "D:\workshop\sumansahu\dist"

# Prompt for password securely
$SecurePassword = Read-Host "Enter your FTP password" -AsSecureString
$FtpPassword = [System.Net.NetworkCredential]::new("", $SecurePassword).Password

# Create FTP URI
$FtpUri = "ftp://$FtpHost`:$FtpPort$RemotePath"

Write-Host "Starting FTP deployment..." -ForegroundColor Green
Write-Host "FTP Server: $FtpHost" -ForegroundColor Cyan
Write-Host "Username: $FtpUsername" -ForegroundColor Cyan
Write-Host "Remote Path: $RemotePath" -ForegroundColor Cyan
Write-Host "Local Path: $LocalDistPath" -ForegroundColor Cyan
Write-Host ""

# Get all files from dist folder
$Files = Get-ChildItem -Path $LocalDistPath -Recurse -File

$TotalFiles = $Files.Count
$UploadedFiles = 0

foreach ($File in $Files) {
    $RelativePath = $File.FullName.Substring($LocalDistPath.Length).Replace('\', '/')
    $RemoteFilePath = "$FtpUri$RelativePath"
    
    # Create remote directories if needed
    $RemoteDir = [System.IO.Path]::GetDirectoryName($RemoteFilePath)
    
    try {
        # Create FTP request for upload
        $FtpRequest = [System.Net.FtpWebRequest]::Create($RemoteFilePath)
        $FtpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $FtpRequest.Credentials = New-Object System.Net.NetworkCredential($FtpUsername, $FtpPassword)
        $FtpRequest.UseBinary = $true
        $FtpRequest.UsePassive = $true
        $FtpRequest.KeepAlive = $false
        
        # Upload file
        $FileStream = [System.IO.File]::OpenRead($File.FullName)
        $FtpStream = $FtpRequest.GetRequestStream()
        $FileStream.CopyTo($FtpStream)
        $FtpStream.Close()
        $FileStream.Close()
        
        $FtpResponse = $FtpRequest.GetResponse()
        $FtpResponse.Close()
        
        $UploadedFiles++
        $Progress = [math]::Round(($UploadedFiles / $TotalFiles) * 100, 2)
        Write-Host "[$Progress%] Uploaded: $RelativePath" -ForegroundColor Green
        
    }
    catch {
        Write-Host "ERROR uploading $RelativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Deployment complete! Uploaded $UploadedFiles/$TotalFiles files" -ForegroundColor Green
Write-Host "Your site should be live at: http://sumansahu.in" -ForegroundColor Cyan
