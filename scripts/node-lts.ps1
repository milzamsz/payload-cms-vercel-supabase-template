param(
  [Parameter(Position = 0, ValueFromRemainingArguments = $true)]
  [string[]] $Command
)

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$version = (Get-Content -LiteralPath (Join-Path $repoRoot '.nvmrc') -Raw).Trim()
$version = $version.TrimStart('v')

$candidateDirs = @()
if ($env:NVM_HOME) {
  $candidateDirs += (Join-Path $env:NVM_HOME "v$version")
}
$candidateDirs += (Join-Path $env:USERPROFILE ".config\herd\bin\nvm\v$version")
$candidateDirs += (Join-Path $env:APPDATA "nvm\v$version")

$nodeDir = $candidateDirs | Where-Object {
  Test-Path -LiteralPath (Join-Path $_ 'node.exe')
} | Select-Object -First 1

if (-not $nodeDir) {
  Write-Error "Node $version is not installed in a known nvm location. Run: nvm install $version"
}

$env:PATH = "$nodeDir;$env:PATH"

if ($Command.Count -eq 0) {
  node -v
  npm -v
  exit $LASTEXITCODE
}

$executable = $Command[0]
$arguments = if ($Command.Count -gt 1) {
  $Command[1..($Command.Count - 1)]
} else {
  @()
}

& $executable @arguments
exit $LASTEXITCODE
