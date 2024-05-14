#!/bin/bash
# runs a useful loop.
git config pull.rebase false
cd ~/garden
while true; do 
    git add *md
    git add journal/*md
    git add Journal
    git add assets/*
    git commit -a -m 'autopushed'
    git pull
    git push
    sleep 30
done
