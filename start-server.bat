@echo off
cd /d "C:\Users\paulw\Desktop\Unitrail-Housing\unitrail-housing"
set PATH=C:\Users\paulw\Desktop\Unitrail-Housing\unitrail-housing\node-portable\node-v20.11.0-win-x64;%PATH%
echo Starting UniTrail Housing Server...
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
npm run dev
pause

