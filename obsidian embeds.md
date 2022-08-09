I've been meaning to make Obsidian style image attachments like the following work.

![[Pasted image 20210530152313.png]]

As of [[2021-05-30]], clicking on the link above 'works': it loads the image in its node. But:

- This doesn't work in subnodes.
	- [x] [[it should]]
- [x] The images should actually be embedded.
	- two options:
		- lazy load with js
		- put an iframe on it (tm)
			- this is so hacky I kind of like it
		- do simple embedding

There should probably be a setting to enable/disable embeddings; same would apply to tweets and perhaps more generally to agora [[transclusions]].

- As of [[2022-08-10]] [[rob haisfield]] is having issues in e.g. node [[kosmik]]
  - https://github.com/classicrob/quartz/tree/hugo/content has his images
