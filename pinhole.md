- a [[bridge]].
  - [[bluesky]] [[fediverse]]
  - #go https://fietkau.software/pinhole

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
>
>
```

```
>
>
```

Run :)
