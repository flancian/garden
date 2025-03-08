root@patera /home/flancian # crontab -l | grep bhi
10 2 * * 0 tar -czpf /home/backups/patera/bhi.$(date -uI).tgz /home/bouncepaw/bhi

backups@patera:~$ crontab -l | grep -i hypatia
1 15 * * * ~/bin/hypatia.sh

backups@patera:~$ cat bin/hypatia.sh
#!/bin/bash

rsync -av ~/patera hypatia.anagora.org: