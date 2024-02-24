- An [[editor]].
  - [[note taking]] [[agora]]
  - I like it a lot!
  - #go https://silverbullet.md

## Getting started

I started using [[silver bullet]] on [[February 2024]] and I think I'm not going back to what I was using before except when I really need terminal editing ([[wiki vim]] remains my choice in that environment).

I thought I'd keep a node here detailing what I had to do to turn it into a good [[Agora editor]] for my existing [[digital garden]]. Not much, it turns out!

### Run on docker
I'm running it on docker on port [[5019]]. The default port is [[3000]] but in my case [[5019]] made sense because I run [[agora server]] in [[5017]] and [[agora bridge]] in [[5018]]. This choice is purely personal of course.

This is the very simple script I use to run it as a daemon:

```bash
#!/bin/bash -x
docker stop silverbullet
docker rm silverbullet
docker run -d --restart unless-stopped --name silverbullet -p 5019:3000 -v /home/flancian/garden:/space zefhemel/silverbullet
```
More instructions in the official documentation.

### Import core and journal
If you start from an existing digital garden, like I did, you'll have to manually import the core library which in turn sets up several [[plugs]] -- meaning [[silverbullet plugins]]. To do so, run the Library: Import command (by searching for that command in ctrl-/) and enter: `!silverbullet.md/Library/Core/`.

As per https://silverbullet.md/Library/Core.

Now you'll have access to lots of almost-but-not-quite-built-in functionality.

Then do the same for [[journal]] facilities `!silverbullet.md/Library/Journal/` as per https://silverbullet.md/Library/Journal.