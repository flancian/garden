# agora bootstrap

- the agora runs in a user in your computer. I use `agora`.
  - `sudo adduser agora`
  - `sudo su - agora`.
- you can optionally set up this user so it auto-starts all agora services you want to run.
  - `sudo loginctl enable-linger agora` to have user services stick across restarts
  - then set up [[systemd]] user services for [[agora server]] (frontend/reader) and [[agora bridge]] (writer) in the `agora` user (more details to come soon)
- [[clone repos]]
  - agora: `git clone https://github.com/flancian/agora.git`
  - agora-server: `git clone https://github.com/flancian/agora-server.git`
  - agora-bridge: `git clone https://github.com/flancian/agora-server.git`
