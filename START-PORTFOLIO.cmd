@echo off
cd /d "%~dp0"
if not exist node_modules\react-router\package.json (
  echo Project dependencies are missing. Run npm install in this folder first.
  pause
  exit /b 1
)
node tools\start-local-portfolio.cjs dev 5208
if errorlevel 1 (
  echo The development server did not start. See artifacts\production-migration\dev-5208-error.log.
  pause
  exit /b 1
)
start "" "http://127.0.0.1:5208"
