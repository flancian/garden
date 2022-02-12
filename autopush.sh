#!/bin/bash
# runs a useful loop.
git config pull.rebase false
cd ~/garden
while true; do 
    git pull
    git push
    sleep 5
done
