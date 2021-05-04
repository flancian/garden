# neovim

- [[pull]] [[nvim]]
- Put this in ~/.config/nvim/init.vim for [[vim]] compatibility:

```
set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath=&runtimepath
source ~/.vimrc
```
- the [[vscode]] [[neo vim]] extension for some reason requires a development version that is annoying to install in new systems, so for now I've ditched it in favour of vim emulation in vscode

```
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt-get upmdate
sudo apt-get install neovi
```