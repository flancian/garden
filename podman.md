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

Then:

```
podman run -it agora
```

To run one interactively, or:

```
podman create -it --name agora agora
podman start agora
```

To start one detached. Then you can:

```
podman attach agora
```

...to attach. CTRL-P CTRL-Q to detach gracefully.
