# ============================================
# backupAndPopulate.ps1
# --------------------------------------------
# Actual backup logic goes here.
# For now, this creates a timestamped folder
# copy of the julies-art project.
# ============================================

$sourcePath = "C:\Users\OEM\julies-art\src"
$backupRoot = "C:\Users\OEM\julies-art\backups"

# --- Create backup directory if missing
if (!(Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null
}

# --- Define backup folder name with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$backupFolder = "$backupRoot\backup_$timestamp"

# --- Perform backup
Write-Host "🗂️ Backing up files from $sourcePath to $backupFolder..."
Copy-Item -Path $sourcePath -Destination $backupFolder -Recurse -Force

Write-Host "✅ Backup complete!"
