# 🪶 Julie's Art Backup Tool
# Location: src/filetools/backup_julies_art.ps1
# Purpose: Create a dated ZIP backup of the entire julies-art project into /backups

# Define paths relative to this script’s location
$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = Resolve-Path (Join-Path $ScriptPath "..\..")
$BackupFolder = Join-Path $ProjectRoot "backups"

# Ensure backup folder exists
if (-not (Test-Path $BackupFolder)) {
    New-Item -ItemType Directory -Force -Path $BackupFolder | Out-Null
}

# Create timestamped filename
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$ZipFile = Join-Path $BackupFolder "julies-art-backup_$Timestamp.zip"

Write-Host "📦 Creating backup..."
Write-Host "   Source: $ProjectRoot"
Write-Host "   Target: $ZipFile"

# Exclude the backups folder itself
$itemsToZip = Get-ChildItem -Path $ProjectRoot -Exclude "backups"

# Create ZIP file
Compress-Archive -Path $itemsToZip.FullName -DestinationPath $ZipFile -Force

# Keep only 5 most recent backups
$Backups = Get-ChildItem -Path $BackupFolder -Filter "julies-art-backup_*.zip" | Sort-Object LastWriteTime -Descending
if ($Backups.Count -gt 5) {
    $OldBackups = $Backups | Select-Object -Skip 5
    foreach ($Old in $OldBackups) {
        Remove-Item $Old.FullName -Force
        Write-Host "🗑️  Deleted old backup: $($Old.Name)"
    }
}

Write-Host "`n✅ Backup complete: $ZipFile"
Write-Host "🗂️  Stored in: $BackupFolder"
