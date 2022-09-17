- a [[tool]].
  - [[bmann]] noded it first :)
  - #go https://www.chezmoi.io
  - #git https://github.com/twpayne/chezmoi
  - #start https://www.chezmoi.io/quick-start/
  - #push [[2022-05-26]] 
    - [[refusing to merge unrelated histories]]
  - See update below for the TLDR on how to use templates.

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

[[Chezmoi]] supports [[templates]] to special-case files depending on the host they're being installed in.

To apply a template to an already tracked file, e.g. .config/sway/config (in my case):

```
chezmoi chattr +template .config/sway/config
chezmoi edit .config/sway/config
```

Then use template syntax (see https://www.chezmoi.io/user-guide/templating/#simple-logic for the gist of it if you're interested in per-hostname cases, which is what I was after) and then use `chezmoi apply` to "run" the template and produce the file in any host.

Note that you need to edit the file with chezmoi edit every time essentially, unless you intend to get conflicts later. It seems like a fair tradeoff to me.

An example from my sway config which shows the syntax for if .. else if .. else:

```
{{ if eq .chezmoi.hostname "nostromo" }}
set $focused #b43757
{{ else if eq .chezmoi.hostname "paramita" }}
set $focused #472dbc
{{ else }}
set $focused #b46b37
{{ end }}
```

