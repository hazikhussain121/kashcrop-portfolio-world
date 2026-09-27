$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root
$pidFile = Join-Path $root 'artifacts\signature-experience\preview-process.pid'
if (Test-Path -LiteralPath $pidFile) {
 $parentId = [int](Get-Content -LiteralPath $pidFile)
 $listeners = Get-NetTCPConnection -State Listen -LocalPort 5218 -ErrorAction SilentlyContinue
 foreach ($ownerId in ($listeners.OwningProcess | Select-Object -Unique)) {
  if (-not $ownerId) { continue }
  $process = Get-CimInstance Win32_Process -Filter "ProcessId=$ownerId"
  if ($process.ParentProcessId -ne $parentId -or $process.CommandLine -notlike '*@react-router*serve*') { throw 'Port 5218 is owned by an unrelated process. It was left untouched.' }
  Stop-Process -Id $ownerId -ErrorAction SilentlyContinue
 }
 $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$parentId" -ErrorAction SilentlyContinue
 if ($parent -and $parent.CommandLine -like '*signature-experience*preview.log*') { Stop-Process -Id $parentId -ErrorAction SilentlyContinue }
}
$p = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c','set PORT=5218&& set HOST=127.0.0.1&& node node_modules\@react-router\serve\bin.js build\server\index.js > artifacts\signature-experience\preview.log 2>&1' -WorkingDirectory $root -WindowStyle Hidden -PassThru
$p.Id | Set-Content -LiteralPath $pidFile
Write-Output "PREVIEW_PROCESS=$($p.Id)"
