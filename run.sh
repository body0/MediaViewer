# !bin/sh
set -e
node /home/nykl/Documents/WEB/multiViewer/NODE/src/index.js &
sleep 1
chromium-browser http://localhost:4400
wait $(jobs -p)

