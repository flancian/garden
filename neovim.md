# neovim

- [[pull]] [[nvim]]
- Put this in ~/.config/nvim/init.vim for [[vim]] compatibility:

```
set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath=&runtimepath
source ~/.vimrc
```

- to install a new enough version for [[vscode]] [[neo vim]] extension

```
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt-get update
sudo apt-get install neovim
```