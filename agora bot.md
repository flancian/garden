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
			- see [[go/agora-matrix-bot]]
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
		-
		- LATER reply to @mentions with resolved wikilinks for whole threads
		- https://twitter.com/flancian/status/1415398630731681793