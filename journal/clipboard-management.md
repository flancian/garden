# clipboard management
One of my pet peeves while managing computers over VNC, like I do currently to communicate with [[nox]] mostly, is [[clipboard management]].

I've managed to do clipboard transfer [[nox]] -> laptop easily; I call it xclip-in:

```
ssh nox 'xclip -o -selection clipboard -d :0' | xclip -i -selection clipboard
```

But for some reason the other direction eludes me. That is, I can't seem to 'push' the clipboard from my laptop to nox. The following looks like it should work, but it doesn't; xclip -i just hangs forever:

```
xclip -o -selection clipboard | ssh nox 'xclip -i -selection clipboard -d :0'
```

If I strace the `xclip -i` call, I see a read() that contains the clipboard I'm trying to transfer -- and then an exit with 0. But the command never finishes.