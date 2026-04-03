Add-Type -AssemblyName System.Drawing

$outDir = "c:\Users\omkar\OneDrive\Documents\GitHub\ourproject\public"

function New-PwaIcon {
    param(
        [int]$Size,
        [string]$FileName,
        [bool]$Maskable = $false
    )

    $bitmap = [System.Drawing.Bitmap]::new($Size, $Size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.Color]::FromArgb(245, 248, 252))

    $margin = if ($Maskable) { [int]($Size * 0.06) } else { [int]($Size * 0.12) }
    $dimension = $Size - ($margin * 2)
    $startPoint = [System.Drawing.Point]::new(0, 0)
    $endPoint = [System.Drawing.Point]::new($Size, $Size)
    $gradient = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        $startPoint,
        $endPoint,
        [System.Drawing.Color]::FromArgb(0, 80, 179),
        [System.Drawing.Color]::FromArgb(24, 144, 255)
    )

    $graphics.FillRectangle($gradient, $margin, $margin, $dimension, $dimension)

    $roofPen = [System.Drawing.Pen]::new([System.Drawing.Color]::White, [single]($Size * 0.045))
    $roofPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $roofPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $housePen = [System.Drawing.Pen]::new([System.Drawing.Color]::White, [single]($Size * 0.04))
    $housePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $housePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $leftX = [single]($Size * 0.28)
    $midX = [single]($Size * 0.50)
    $rightX = [single]($Size * 0.72)
    $roofY = [single]($Size * 0.39)
    $peakY = [single]($Size * 0.25)
    $baseY = [single]($Size * 0.68)

    $graphics.DrawLine($roofPen, $leftX, $roofY, $midX, $peakY)
    $graphics.DrawLine($roofPen, $midX, $peakY, $rightX, $roofY)
    $graphics.DrawLine($housePen, $leftX + ($Size * 0.05), $roofY + ($Size * 0.03), $leftX + ($Size * 0.05), $baseY)
    $graphics.DrawLine($housePen, $rightX - ($Size * 0.05), $roofY + ($Size * 0.03), $rightX - ($Size * 0.05), $baseY)
    $graphics.DrawLine($housePen, $leftX + ($Size * 0.05), $baseY, $rightX - ($Size * 0.05), $baseY)

    $doorBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
    $graphics.FillRectangle(
        $doorBrush,
        [int]($Size * 0.455),
        [int]($Size * 0.50),
        [int]($Size * 0.09),
        [int]($Size * 0.18)
    )

    $accentBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 214, 102))
    $graphics.FillEllipse(
        $accentBrush,
        [int]($Size * 0.67),
        [int]($Size * 0.17),
        [int]($Size * 0.09),
        [int]($Size * 0.09)
    )

    $bitmap.Save((Join-Path $outDir $FileName), [System.Drawing.Imaging.ImageFormat]::Png)

    $accentBrush.Dispose()
    $doorBrush.Dispose()
    $housePen.Dispose()
    $roofPen.Dispose()
    $gradient.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
}

New-PwaIcon -Size 192 -FileName "pwa-192x192.png"
New-PwaIcon -Size 512 -FileName "pwa-512x512.png"
New-PwaIcon -Size 512 -FileName "pwa-maskable-512x512.png" -Maskable $true
New-PwaIcon -Size 180 -FileName "apple-touch-icon.png"
