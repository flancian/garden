# neovim

- [[pull]] [[nvim]]
- Put this in ~/.config/nvim/init.vim for vim compatibility:

```
set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath=&runtimepath
source ~/.vimrc
```

