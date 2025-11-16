# ============================================
# createBackupShortcut.ps1
# --------------------------------------------
# Creates a desktop shortcut (with custom icon)
# that runs runBackupAndLog.ps1 when clicked.
# ============================================

# --- Define project structure
$projectRoot = "C:\Users\OEM\julies-art\src"
$wrapperScript = "$projectRoot\filetools\runBackupAndLog.ps1"
$iconPath = "$projectRoot\filetools\icons\paintbrush.ico"
$shortcutPath = "$env:PUBLIC\Desktop\JuliesArt Backup.lnk"

# --- Create a WScript.Shell COM object
$WScriptShell = New-Object -ComObject WScript.Shell
$shortcut = $WScriptShell.CreateShortcut($shortcutPath)

# --- Shortcut properties
$shortcut.TargetPath = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
$shortcut.Arguments = "-ExecutionPolicy Bypass -NoExit -File `"$wrapperScript`""
$shortcut.WorkingDirectory = $projectRoot

# --- Check and assign icon
if (Test-Path $iconPath) {
    Write-Host "🎨 Using icon: $iconPath"
    $shortcut.IconLocation = $iconPath
} else {
    Write-Host "⚠️ Icon not found, fallback to PowerShell default."
    $shortcut.IconLocation = "powershell.exe,0"
}

# --- Save the shortcut
$shortcut.Save()
Write-Host "✅ Shortcut created: $shortcutPath"

# --- Log creation
$logDir = "$projectRoot\logs"
if (!(Test-Path $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }
"[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Shortcut created successfully." | Out-File "$logDir\shortcut_log.txt" -Append

Pause
