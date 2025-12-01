$url = "https://images.unsplash.com/photo-1581578731117-104f2a417954"
$dest = "c:\Users\Pavan Kumar\OneDrive\Desktop\doneanddusted\assets\images\test-domestic.jpg"
try {
    Invoke-WebRequest -Uri $url -OutFile $dest
    Write-Host "Success"
}
catch {
    Write-Host "Error: $_"
}
