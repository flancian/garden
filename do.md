- an [[intent]]
	- [[pull]] [[intents]] [[later]] [[todo]] [[pomodoro]]
	- [[probing]]
		- I never get to this, can you tell it reminds me of work? :)
		- I need to just set a pomodoro and do this, but I feel like running the agora at low slo is OK. It's supposed to rely on distribution later on for reliability gains.
		- Doesn't really apply as an argument to [[moa]] though -- although for [[moa]] we have [[sentry]] set up so that seems reasonable.
			- [ ] set up [[probing]] for [[moa]]
			- [ ] set up [[probing]] for [[anagora]]
	- [[moa]]
		- [ ] review [[go/moa/bugs]]
	- [[agora]]
		- [ ] implement [[auto push]]
		- [ ] add toggle switch for [[auto pull]] (stoa, linked nodes, backlinks?)
			- [x] doing this for [[stoa]] stops it from stealing focus which is really irksome :) fixing it in etherpad would take me long as I'm bad at js
				- done! just replaced the stoa with a pull button always for now.
		- [ ] client side pulling
		- improve [[agora graphs]]
			- what does this *mean*?
			- I like what logseq does: show link direction as particles. push/pull could be different particles. hmm. particle diagrams. check out [[feynman]] for inspiration?
		- [[wikilinks everywhere]] -> [[agora ext]]
			- I really want to move wikilinking to on-demand (push button/ctrl-shift-l) or cronjob-like behaviour but right now it just wikilinks everything every time you click, and some sites break
				- this is already better after a quick PR to linkify on *click* instead of mouse movement
				- twitter still sort of breaks though
	- [[agora social media integration]]
		- write [[agora bot]] for [[mastodon]]
		- test [[vera]]'s code for pulling tweets and toots
		- depends on [[agora bridge api]]
	- [[agora bridge api]]
		- I'll probably add a [[flask]] based api to [[agora bridge]] to:
			- request new git integrations (e.g. mount git repo X in path Y)
			- accept other inputs? like perhaps subnodes, which could go into a managed repo.
	- [[write]]
		- [[after the pandemic]], or [[an open letter to an open nation]]
		- [[on cringe]] / [[agora polls]]
			- about explicit rational (mathematical) modelling of group dynamics through social media discourse
			- is [[hack the planet]] cringe? should it be?
	- [[read]] 
		- what [[will walker]] told me about
			- link it here
		- [[reading protopoi]]
	- run [[weekly review]]
		- I'm doing it now
- [[push]] [[agora actions]]
	- do is an [[action]]
		- I try to automate recurrent [[actions]] in the [[agora]].
		- This node is the root of my [[getting things done]] graph, which I try to use to model my [[intents]].
		- [[daily]], I try to check for pending [[work]] in all known sources of truth.
		- check the context in more specific actions and push relevant items here or to [[next action]]:
		- what should I [[read]] next
		- [[write]]
			- [[flancia]]
				- [[book]]
				- [[an open letter for an open society]]
			- to [[a. p.]] asking for a recommendation
		- [[unblock]] people who are waiting for me
	- [[research]]
		- [[ipfs]]
		- [[ipld]]
		- [[fission]]
		- [[hypercore-proto]]
		- [[launchlet]]
		- [[urbit]]
			- [[rosano]]
		- [[support]]
			- [[effective altruism]]
			- [[flancia collective]]
			- [[open source]]
			- [[friends]]
			- [[public utility]]
		- [[code]]
			- [[agora server]]
				- add particles to [[agora search]]
					- particles again.
			- [[wikilinks everywhere]] / [[agora ext]]
				- could [[d3]] replace [[jquery]]? it would make it easy to also include a graph tool directly in the library. it's 200kb though.
					- ask [[vera]]
			- a more flexible [[actions]] system
- Please tell me what you think I should do next below or via any of the channels listed in [[flancian]]. All feedback is welcome!
- [[push]] [[done]]
	- implement [[ack]]
	- [[agora yaml]]
	- [[agora plan]]
	- [[rdf]]
		- [[graphs]]
	- [[agora search]]
		- implemented a provider
		- added support for [[yubnub]] like particles
		- [[branch]] agora-server/branch
		- [[push]] [[done]]
	- implemented support for [[obsidian attachments]] in [[agora server]]
		- basic but it does the job (tm)
		  
https://twitter.com/flancian/status/1386048603496529925
https://twitter.com/flancian/status/1374462566395617286