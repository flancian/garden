- a [[bot]]
	- part of [[agora bridge]] component of the [[agora]].
		- [[pull]] [[agora bridge]]
		- in control of the [[system account]] in supported platforms.
	- interacts with existing networks, starting with Mastodon and Twitter.
		- see [[agora social media integration]].
		- [[mastodon]] https://botsin.space/@agora
			- see `bots/mastodon` in [[go/agora-bridge]].
		- [[twitter]] https://twitter.com/an_agora
			- see `bots/twitter` in [[go/agora-bridge]].
		- [[matrix]] [[agora matrix bot]]
			- see [[go/agora-matrix-bot]], [[mit license]] so separate repo while we figure that out (the [[agora]] is [[apache license]], [[flancia]] is [[creative commons]] plus an [[agora contract]].)
	- [[functionality]]
		- [[current]]
			- replies to @mentions if the tweet/toot contains [[wikilinks]] with links to anagora.org
			- follows back
			- starts threads with its replies on [[matrix]]
			- stores *links* to messages in the [[agora]]
		- [[planned]]
			- stores full messages in the [[agora]] for users that consent
				- optionally offers to them [[gitea]] hosting, else forwards updates to a repository of their choice
	- a [[project]]
		- DONE reply to @mentions
		  :LOGBOOK:
		  CLOCK: [2022-02-01 Tue 20:49:42]
		  :END:
		- DONE store [[matrix]] messages from [[agora discuss]] and other rooms that opt in?
		  :LOGBOOK:
		  CLOCK: [2022-02-01 Tue 20:49:59]--[2022-03-02 Wed 12:59:45] =>  688:09:46
		  :END:
		- LATER reply to @mentions with resolved wikilinks for whole threads
		- https://twitter.com/flancian/status/1415398630731681793