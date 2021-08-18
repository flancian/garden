# Systemd

- I run all [[agora]] services as systemd [[user services]].
  - How to keep a user process running:
    - [[go]] https://jimsaunders.net/2017/08/03/simple-per-user-systemd.html
  - Before you can run enable (making it sticky across reboots) above, you'll probably need to enable lingering for the user in question. As root (ask your friendly sysadmin if you somehow don't have root):
    - `loginctl enable-linger username`
  - If you get any bus errors, you may need to:
    - `export XDG_RUNTIME_DIR=/run/user/\`id -u\``
  - Scripts go in `.config/systemd/user/`, add an `example.service` file and then: 
    - `systemctl --user start example`
    - `systemctl --user enable example`
  - See `agora-server.service` in [[go/agora-server]] as an example.
