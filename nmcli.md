- a [[tool]].
  - When in doubt, you probably want [[man nmcli-examples]] :)
  - `nmcli c up <name>` connects to an already known connection
  - `nmcli c show` or `nmcli c s` shows known connections
  - `nmcli c down <name>` disconnects
  - `nmcli device wifi list` or `nmcli d w l` lists available APs
  - `nmcli d w c <SSID> password <PASSWORD>` connects with a password
    - `nmcli --ask d w c <SSID>` asks for the password