# Agora Install

- a [[howto]].
  - These are instructions to [[run your own agora]]. If you are looking for instructions on how to *join* this Agora, please refer to: [[agora signup]], [[agora editor]].

## Before you get started

As of the time of writing the [[Agora]] consists of three distinct repositories:

- The ***Agora proper***, which contains the root of a tree defined by its configuration and [[contract]].
  - -> [[go/agora]]
- The [[Agora Server]], a web interface to the Agora, mostly [[read only]]. It is likely the interface you're reading this in if you're in [anagora.org](https://anagora.org).
  - -> [[go/agora-server]]
- [[Agora Bridge]], a repository that contains various means of ***writing*** to the Agora and more generally interfacing with it. This includes the process that interacts with the Agora's configuration and runs fetch/update tasks; and a set of platform-specific bots to run system accounts.
  - -> [[go/agora-bridge]]


The following instructions assume you run all services under the same user in a Unix-like system (anagora.org runs on Debian GNU/Linux). We suggest `agora`:

```
$ adduser agora  # follow prompts
$ sudo su - agora
```

Then clone all repositories:

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

First you X, then you Y, then you add a [[systemd service]].
### Agora Bridge
- [[python]] 
  - [[gardens py]]
- [[yaml]]
  - [[gardens yaml]]
  - [[agora bot yaml]]
- [[typescript]]

First you X, then you Y, then you add a [[systemd service]].

## And now?

Now that you have a functioning Agora, consider what you will do with it.

Please consider [[agora protocol]], [[contract]] and [[goals]]. Reach out if you are interested in establishing other protocols for [[collaboration]].

## A note on Docker support

There is currently no [[docker]] support, but it seems like it could be a great fit. We have this in our plan, but if you're handy with Docker, this would be a great contribution for you! :)