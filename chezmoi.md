- a [[tool]].
  - [[bmann]] noded it first :)
  - #go https://www.chezmoi.io
  - #git https://github.com/twpayne/chezmoi
  - #start https://www.chezmoi.io/quick-start/
  - #push [[2022-05-26]] 
    - [[refusing to merge unrelated histories]]

Example from my initial upload:

```
sh -c "`curl -fsLS chezmoi.io/get`"
chezmoi add ~/.bashrc
chezmoi add ~/.vimrc
chezmoi add ~/.tmux.conf
chezmoi add ~/.gnupg
chezmoi cd
git add .
git commit -m 'Initial commit from paramita."
```

After creating an empty repo in any host (I used [[gitlab]]), you can upload the local repo you cd'd into above as per standard [[git]] procedure: 

```
git remote add origin git@gitlab.com:flancian/flancian.git
git branch -M main
git push -u origin main 
```

Then for syncing files into a new machine, you install chezmoi and then pass the repo as argument to `chezmoi init`:

```
sh -c "`curl -fsLS chezmoi.io/get`"
chezmoi init https://gitlab.com/flancian/flancian
chezmoi apply -v
```

To upload changes to files already tracked by chezmoi from any host:

```
chezmoi re-add
chezmoi cd
git commit -a -m "chezmoi from $HOSTNAME"
git push
```

[[Chezmoi]] supports [[templates]] to special-case files depending on the host they're being installed in, but I haven't experimented with them yet.

