# TJZ Transports - Start Both CRM and Website
# This script starts the development server and automatically opens both pages

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TJZ TRANSPORTS - Dual Start Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host ""

# Start the dev server
npm run dev

# Note: The dev server keeps running. To stop, press Ctrl+C
