# Systemd

- How to keep a user process running:
  - [[go]] https://jimsaunders.net/2017/08/03/simple-per-user-systemd.html
- Scripts go in `.config/systemd/user/`, add an example.service file and then: 
  - `systemctl --user start example`
  - `systemctl --user enable example`
- Before you can run enable above, you may need to enable lingering for the user in question. As root:
  - `loginctl enable-linger username`
- If you get any bus errors, you may need to:
  - `export XDG_RUNTIME_DIR=/run/user/\`id -u\``