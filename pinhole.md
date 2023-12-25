- a [[bridge]].
  - [[bluesky]] [[fediverse]]
  - #go https://fietkau.software/pinhole
  - #git https://fietkau.software/Pinhole.git

Trying this out on [[2023-12-25]] :) I got it to run in dev mode as such:

```
>  git clone git clone https://fietkau.software/Pinhole.git
>  cd Pinhole
>  poetry init
>  poetry add pycryptodome flask requests
>  poetry run pinhole.py
```

Now considering whether I take the step to set up nginx to serve this in a way 'readable' to ActivityPub ecosystem as per instructions in [[go/pinhole]] :)

--

I did :)

This is a usable [[nginx snippet]] -- the original docs linked above only provide the equivalent for Apache2, which I don't use nowadays.

The short of it would be:

- Check out in /var/www/pinhole -- I run it under user pinhole. To set up a separate user, you can use e.g. `adduser pinhole` in Debian based systems and then `su - pinhole` to execute the rest.
- Install [[certbot]] and configure a host running SSL.
- Install [[uwsgi]] using your distribution package manager or [[pipx]]/[[poetry]] to manage dependencies.
- Add the following snippet to the host:

```
location / {
  include uwsgi_params;
  uwsgi_pass unix:/var/www/pinhole/pinhole.sock;
  # Set the parameters for the uWSGI application
  uwsgi_param UWSGI_PYHOME /var/www/pinhole;
  uwsgi_param UWSGI_CHDIR /var/www/pinhole;
  uwsgi_param UWSGI_SCRIPT pinhole:application;
  uwsgi_param UWSGI_THREADS 5;
  }
```

- Set up uwsgi. I created the following uwsgi.ini and ./run-uwsgi.sh scripts:

```
[uwsgi]
# module = app:create_app()
touch-reload = /tmp/pinhole-restart
home = /home/pinhole/.cache/pypoetry/virtualenvs/pinhole-_elcgCn9-py3.11
master = true
processes = 6
socket = /var/www/pinhole/pinhole.sock
chmod-socket = 666
vacuum = true
die-on-term = true
```
>
>
```
#!/bin/bash

poetry run uwsgi uwsgi.ini
```

Restart nginx and run :) Or optionally set up a [[systemd]] user service.

I tried to make it work without uwsgi, using just a reverse proxy to the flask dev server, and for some reason it didn't work. Maybe it was some unrelated complication having to do with some mis-configuration on that mode, but I just moved on and went the uwsgi way as I already run the [[Agora]] like this.
