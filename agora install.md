# Agora Install

- a [[howto]].
  - These are instructions to [[run your own agora]]. If you are looking for instructions on how to *join* this Agora, please refer to: [[agora signup]], [[agora editor]].

## Before you get started

As of the time of writing the [[Agora]] consists of three distinct repositories:

- The ***Agora proper***, which contains the root of a tree plus instructions on how to grow it. This is defined by its configuration and its [[contract]].
  - -> [[go/agora]]
- The [[Agora Server]], a web interface to the Agora, mostly [[read only]]. It is the interface you're reading this in if you're in [anagora.org](https://anagora.org).
  - -> [[go/agora-server]]
- [[Agora Bridge]], a repository that contains various means of ***writing*** to the Agora and more generally interfacing with it. This includes the process that interacts with the Agora's configuration (in the first repository in the list) and runs fetch/update tasks; and a set of platform-specific bots.
  - -> [[go/agora-bridge]]

The following instructions assume you clone all repositories and run all services under the same user in a Unix-like system (`anagora.org` runs on Debian GNU/Linux). We suggest `agora`:

```
$ adduser agora  # follow prompts
$ sudo su - agora
```

To get all repositories:

```
$ git clone https://github.com/flancian/agora.git
$ git clone https://github.com/flancian/agora-server.git
$ git clone https://github.com/flancian/agora-bridge.git
```

You need to clone *all three* to run a fully functioning Agora. Because the first is configuration only, and the third encapsulates all mutating code, you technically only need to run [[agora server]] as a service to run an immutable Agora. These instructions assume you set up all three in order.

### Agora

- `gardens.yaml` contains the list of sources for this Agora.
  - may be renamed `sources.yaml`
  - (if the agora is a filesystem, this is the [[fstab]])
  - [[gardens yaml]]
- `CONTRACT.md` contains the Agora system account's public commitment to the ecosystem.

You need to edit `gardens.yaml` if you want to carry a different set of sources. The Agora comes with defaults.

If you edit the [[CONTRACT]], your Agora might become incompatible with the Agora you forked from. Conflict resolution is part of [[agora protocol]] but currently not specified.

### [[Agora Server]]

- [[python]] backend, [[flask]] based.
- [[typescript]] frontend, no framework for now.

If you installed in non-standard paths (i.e. your repos are not in `/home/<user>/<repo>`), edit `app/config.py`.

You need to create a Python virtual environment, install packages from `requirements.txt`. run `./setup.sh` and it'll at least try to point you in the right direction :)

 You can then `./run-dev.sh` (for development) or `./run-prod.sh` (if you want to serve to the outside world). If you do the latter, you may want to set up [[uwsgi]] in [[nginx]] and make it stick as a [[systemd service]] using `agora-server.service` as an example.  Please refer to https://github.com/flancian/agora-server#to-develop for details.

 You can add an nginx virtual host with [[certbot]]: `certbot --nginx -d example.anagora.org`. Then use the following as an example to forward traffic in that virtual host to Agora Server over UWSGI:

```
   location / {
        include uwsgi_params;
        # /home/agora/agora-server/run-prod.sh to run.
        uwsgi_pass unix:/tmp/agora-uwsgi.sock;
    }   
```

### Agora Bridge

- [[python]] 
  - [[gardens py]]
- [[yaml]]
  - [[gardens yaml]]
  - [[agora bot yaml]]
- [[typescript]]
You need to create a Python virtual environment, install packages from `requirements.txt`. run `./setup.sh` and it'll at least try to point you in the right direction :)

Then run `./run-prod.sh` either on a shell or as a [[systemd service]]. This will pull from all sources in the root repository's `gardens.yaml` in a loop.

You can also optionally run a number of bots that will interact with people in supported platforms. See the `bots` directory and https://github.com/flancian/agora-bridge#install for more.

## And now?

Now that you have a functioning Agora, consider what you will do with it.

Please consider [[agora protocol]], [[contract]] and [[goals]]. Reach out if you are interested in establishing other protocols for [[collaboration]].

## A note on Docker support

There is currently no [[docker]] support, but it seems like it could be a great fit. We have this in our plan, but if you're handy with Docker, this would be a great contribution for you! :)