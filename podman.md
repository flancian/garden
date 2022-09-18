# podman
- a [[tool]].
	- [[docker]] alternative.
		- advantages: supposedly more secure (doesn't require root), less complex architecture.
		- part of the [[fedora]] project.
	- https://social.coop/web/statuses/105866648612458840
	- [[install]] https://podman.io/getting-started/installation
	- #go https://podman.io/
	- #git https://github.com/containers/podman
	- [[rootless shortcomings]] https://github.com/containers/podman
		- there are enough that I'll probably go with a root-based setup to begin with, while learning the system.
		- else when things fail I'll probably find it hard to figure out if it's due to rootless or something else.
- [[notes on adoption]]
	- On Debian 11, I had to install package [[uidmap]] to avoid https://github.com/containers/podman/issues/9271
	- Also I had to edit /etc/containers/registries.conf and set:
		- `unqualified-search-registries = ["docker.io"]`
		- ...to have podman search work as per in the upstream instructions (Debian ships with ultra-safe defaults or something.)

```
podman run --rm -it fedora
podman run --rm -it debian
```

Drop you into a one-off bare VM, it gets automatically cleaned up when you exit.

```
podman build -t agora .
```

Builds an 'agora' container if there is a [[Dockerfile]] in the path. If you want to force a 'clean' build, pass `--no-cache`; I needed this in the [[Agora Dockerfile]] because I was using `git clone` and this was failing to pull in the latest revisions.

Then to run one interactively:

```
podman run -it agora
```

Or to run one detached (server like):

```
podman run -dt --name agora agora
```

Then you can:

```
podman attach agora
```

...to attach. CTRL-P CTRL-Q to detach gracefully.

This is what I left running in [[hypatia]] as of [[2022-05-27]], sufficient to serve an HTTP only Agora (I'd add [[nginx]] to do SSL + caching, like in [[thecla]]/prod):

```
podman run -p 80:5017 --name agora -dt agora
```

The above requires running this as root to open up port 80 to non privileged processes:

```
sysctl -w net.ipv4.ip_unprivileged_port_start=80
```

