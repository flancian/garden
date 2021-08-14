# nginx caching

- [[2021-08-14]]
  - added this to nginx.conf in http scope:

```
  uwsgi_cache_valid any 30s;
  uwsgi_cache_path /tmp/agora-cache keys_zone=agora-cache:1000m;
```

- [[2021-08-14]]
  - and this is what the [[agora]]'s `location` looks like in the virtual host:

```
  location / {
      uwsgi_cache agora-cache;
      uwsgi_cache_key $scheme$host$request_uri;
      include uwsgi_params;
      # /home/agora/agora-server/run-prod.sh to run.
      uwsgi_pass unix:/tmp/agora-uwsgi.sock;
  }
```