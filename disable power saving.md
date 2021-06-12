```
xset s off
xset -dpms
gsettings set org.gnome.settings-daemon.plugins.power active false
gsettings set org.gnome.desktop.screensaver idle-activation-enabled false
systemd-inhibit sleep 12h # or however long you want, can be an arbitrary command
```
