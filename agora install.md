# Agora Install

- a [[howto]].
  - These are instructions to [[run your own agora]]. If you are looking for instructions on how to *join* this Agora, please refer to: [[agora signup]], [[agora editor]].

## Before you get started

As of the time of writing the [[Agora]] consists of three distinct repositories:

- The Agora proper, which contains the root of a tree defined by its configuration and [[contract]].
  - -> [[go/agora]]
- The [[agora server]], which is designed as a [[read interface]] to the [[agora]] and which you are likely browsing these instructions in (unless you're reading them on [[github]]).
- The [[agora bridge]], which is designed as a [[write interface]] to the [[agora]], tasked with maintaining the Agora's configuration and running fetch/update tasks.

You need to set up *all three* to run a fully functioning Agora, but you only need to set up the first two to run a read only mirror:

```
git clone
```

The following instructions assume you run all services under the same user in a Unix-like system (anagora.org runs on Debian GNU/Linux). We suggest `agora`:

```

```

## Docker

There is currently no [[docker]] support, but it seems like it could be a great fit. We have this in our plan, but if you're handy with Docker, this would be a great contribution for you! :)