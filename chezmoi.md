- a [[tool]].
  - [[bmann]] noded it first :)
  - #go https://www.chezmoi.io
  - #git https://github.com/twpayne/chezmoi
  - #start https://www.chezmoi.io/quick-start/
  - #push [[2022-05-26]] 
    - [[refusing to merge unrelated histories]]

Example for my initial upload:

```
sh -c "$(curl -fsLS chezmoi.io/get)"
ls -atr | egrep '^\.'
chezmoi add ~/.bashrc
chezmoi add ~/.vimrc
chezmoi add ~/.tmux.conf
chezmoi add ~/.gnupg
```

```
chezmoi cd
git add .
git commit -m 'Initial commit from paramita."
```

After creating an empty repo in a host:

```
git remote add origin git@gitlab.com:flancian/flancian.git
git branch -M main
git push -u origin main 
```

For syncing into a new machine, first install chezmoi as per the above, and then:

```
chezmoi init https://gitlab.com/flancian/flancian
chezmoi apply -v
```
