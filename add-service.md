# add service

- [[pull]] [[systemd]]
  - [[go]] https://www.maxlaumeister.com/u/run-ipfs-on-boot-ubuntu-debian/
    - create `example.service` in `/etc/system/system`
    - `sudo systemctl start example`
    - `sudo systemctl enable example`

```
[Unit]
Description=IPFS daemon
After=network.target

[Service]
User=ipfs
Group=ipfs
ExecStart=/usr/local/bin/ipfs daemon
Restart=on-failure

[Install]
WantedBy=default.target
```


