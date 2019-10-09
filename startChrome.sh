#!/usr/bin/env bash
 
# check for CHROME_BIN env or just default to Canary
cmd=${CHROME_BIN:-/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome}
 
if [ -z "$1" ]
then
  echo "Usage: `basename $0` [url]"
  exit 1
fi
 
"$cmd" --no-default-browser-check \
       --user-data-dir=./perfuser \
       --noerrdialogs \
       --window-size=1024,768 \
       --no-default-browser-check \
       --no-first-run \
       --auto-open-devtools-for-tabs \
       "$1"