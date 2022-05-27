- Notes on how to get an Agora up an running on [[podman]] (should work also for [[docker]] with some modifications?).
	- #pull [[podman]]
	- These notes track an [[experiment]] in [[hypatia]], one of the [[servers]] of [[flancia collective]].
  - [[Dockerfile]]
    - in [[go/agora]]
  - Done: we now have a simple but working Dockerfile that bootstraps an Agora. See [[podman]] for instructions.

Loosely structured thoughts: it'd be nice if you could just pass a sources.yaml (or a link to an Agora repo?) to some variation of `podman run` and get an Agora, just like that.

Perhaps we need `agora.yaml` though? For things like configuring hostname. [[agora server]] has `config.py`, but it'd be nice to have it be just a config and store it in the [[agora root repository]] instead.

I took a detour of one pomodoro for [[chezmoi]], and I think it made sense: they are related, [[chezmoi]] seeming like a reasonable candidate for a personal configuration manager including links to arbitrary repositories, containers.
