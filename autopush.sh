#!/bin/bash
git config pull.rebase false
while true; do 
    git pull
    git push
    sleep 5
done