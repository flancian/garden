# Docker
- A [[container]] platform.
	- Someone once told me "X is simpler, better than [[docker]]" but I forgot to write it down :)
	- Perhaps it was [[nomad]]? Need to check if it's at the same level of abstraction.
	- [[commands]]
		- [[docker run]] takes an image (might not be local) and runs it, creating a container
		- [[docker start]] starts a previously created container
		- [[docker stop]] stops a running container
		- [[docker ps]] (-a) shows running (all) containers
	- #pull [[please contain yourself]], an introduction

>  To run Docker as a non-privileged user, consider setting up the
Docker daemon in rootless mode for your user:
>    dockerd-rootless-setuptool.sh install
> Visit https://docs.docker.com/go/rootless/ to learn about rootless mode.
> To run the Docker daemon as a fully privileged service, but granting non-root
users access, refer to https://docs.docker.com/go/daemon-access/

