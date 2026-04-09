param(
  [Parameter(Mandatory = $false)]
  [string]$AliasTargetUrl = "v058-stable.vercel.app"
)

$ErrorActionPreference = "Stop"

Write-Host "Deploying to Vercel production..."

# Capture combined output so we can parse the "Production:" line.
$outputText = (npx vercel deploy --prod --yes --no-color 2>&1 | Out-String)
Write-Host $outputText

$m = [regex]::Match($outputText, 'Production:\s*(https://\S+)')
if (-not $m.Success) {
  throw "Failed to find production deployment URL in vercel output. Expected a line like 'Production: https://...'"
}

$productionUrl = $m.Groups[1].Value
Write-Host "Production deployment detected: $productionUrl"

Write-Host "Re-pointing alias '$AliasTargetUrl' -> latest production deployment..."

# Note: vercel CLI alias set expects the target as a deployment URL and the alias without scheme.
npx vercel alias set $productionUrl $AliasTargetUrl 2>&1 | ForEach-Object { Write-Host $_ }

Write-Host "Done."
