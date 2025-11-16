# ============================================
# runBackupAndLog.ps1
# --------------------------------------------
# Executes the main backup script and logs the
# operation with a date/time stamped log file.
# Includes a success popup at completion.
# ============================================

Add-Type -AssemblyName System.Windows.Forms

$projectRoot = "C:\Users\OEM\julies-art\src"
$logDir = "$projectRoot\logs"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$logFile = "$logDir\backup_log_$timestamp.txt"
$backupScript = "$projectRoot\filetools\backupAndPopulate.ps1"

# --- Ensure log folder exists
if (!(Test-Path $logDir)) {
    New-Item -ItemType Directory -Force -Path $logDir | Out-Null
}

# --- Start transcript (logging session)
Start-Transcript -Path $logFile

# --- Run the backup script
if (Test-Path $backupScript) {
    Write-Host "🔍 Running backup script at: $backupScript"
    & $backupScript
} else {
    Write-Host "❌ Backup script not found at: $backupScript"
}

# --- Stop transcript and finalize
Stop-Transcript

# --- Popup confirmation
[System.Windows.Forms.MessageBox]::Show(
    "Backup completed successfully.`n`nLog saved to:`n$logFile",
    "Julie’s Art Backup",
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Information
)

Write-Host "✅ Log saved to $logFile"
Pause
