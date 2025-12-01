$images = @{
    "domestic-cleaning.jpg" = "https://images.unsplash.com/photo-1581578731117-104f2a417954?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "commercial-cleaning.jpg" = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "deep-clean.jpg" = "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "end-of-tenancy.jpg" = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "airbnb-cleaning.jpg" = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "hmo-maintenance.jpg" = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "gallery-kitchen.jpg" = "https://images.unsplash.com/photo-1600585154200-faf5d3a5c0d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "gallery-living-room.jpg" = "https://images.pexels.com/photos/4239036/pexels-photo-4239036.jpeg?auto=compress&cs=tinysrgb&w=1200"
    "gallery-bathroom.jpg" = "https://images.pexels.com/photos/6195123/pexels-photo-6195123.jpeg?auto=compress&cs=tinysrgb&w=1200"
    "gallery-detail.jpg" = "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "gallery-office.jpg" = "https://images.unsplash.com/photo-1527513913479-75f88e385aaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "gallery-kitchen-detail.jpg" = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "founder-megan.jpg" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    "testimonial-sarah.jpg" = "https://randomuser.me/api/portraits/women/44.jpg"
    "testimonial-mike.jpg" = "https://randomuser.me/api/portraits/men/32.jpg"
    "testimonial-emma.jpg" = "https://randomuser.me/api/portraits/women/68.jpg"
}

$destDir = "c:\Users\Pavan Kumar\OneDrive\Desktop\doneanddusted\assets\images"

foreach ($name in $images.Keys) {
    $url = $images[$name]
    $path = Join-Path $destDir $name
    Write-Host "Downloading $name..."
    Invoke-WebRequest -Uri $url -OutFile $path
}
