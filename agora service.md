- [[push]] [[systemd]]

```
agora@thecla:/etc/systemd/system# cat agora.service
[Unit]
Description=uWSGI instance to serve agora-server
After=network.target

[Service]
User=agora
Group=agora
WorkingDirectory=/home/agora/agora-server
Environment="PATH=/home/agora/agora-server/venv/bin" "FLASK_ENV=production" "AGORA_CONFIG=ProductionConfig"
ExecStart=/home/agora/agora-server/venv/bin/uwsgi --ini prod.ini

[Install]
WantedBy=multi-user.target
```