- a [[list]].
	- [[irregular]].
		- An always incomplete collection of my [[intents]] :)
		- #pull [[todo]] [[now]] [[next]] [[some day]] 
	- [[meditate]] now.
	- process inbox (pushes to this node).
	- configure [[probing]]
		- I never get to this, can you tell it reminds me of work? :)
		- I need to just set a pomodoro and do this, but I feel like running the agora at low slo is OK. It's supposed to rely on distribution later on for reliability gains.
		- Doesn't really apply as an argument to [[moa]] though -- although for [[moa]] we have [[sentry]] set up so that seems reasonable.
			- [ ] set up [[probing]] for [[moa]]
        - -> As of 2024 moa is no longer supported, we shut it down when Musk closed down the API. I intend to bring it back, maybe for [[Fediverse]] <-> [[Bluesky]] -- but [[Ryan Barrett]] solved that with [[Bridgy Fed]]. So now I'm back to trying to make it work for Twitter again, even if it means paying, and running an instance for a closely knit community.
			- [ ] set up [[probing]] for [[anagora]]
        - Hmm, I should still do this :)
        - I also need to do something similar for [[social coop]] ideally, so maybe I could try to solve both at a time.
	- [[push]] [[agora]]
		- [x] implement [[auto pull]]
      - [ ] fix toggle switch for [[auto pull]]
        - this refers to /settings which has a toggle
        - hmm, maybe I should just embed the settings page in the burger. that also frees up /settings for the actual node about [[settings]] :)
        - I already have the burger menu working in a branch, which is nice
        - [ ] implement a toggle in the burger menu :)
		- [ ] implement [[auto push]]
			- probably requires [[agora protocol parsing]] to make efficient/reasonable
      - ...I wrote at some point in time. Now it's implemented, both when you say #push [[example]] and when you use a colon.
      - So I'll think about it but maybe this is done-for-now.
		- [x] client side pulling
			- [x] done for: mastodon, twitter, wikipedia
			- [x] need to test general URL pulling, see how many sites allow iframes
				- [x] test with flancia.org
        - This is done :)
		- improve [[agora graphs]]
			- I like what logseq does: show link direction as particles. push/pull could be different particles. hmm. particle diagrams. check out [[feynman]] for inspiration?
      - this is still a good idea honestly, and I always want to work on graphs
			- could get inspiration from some diagrams in [[a rosetta stone]]
		- [[wikilinks everywhere]] -> [[agora ext]]
			- I really want to move wikilinking to on-demand (push button/ctrl-shift-l) or cronjob-like behaviour but right now it just wikilinks everything every time you click, and some sites break
				- this is already better after a quick PR to linkify on *click* instead of mouse movement
				- twitter still sort of breaks though
				- [[vera]] is on this though
		- [[agora server]]
  		- [ ] parse agora protocol
    		- [ ] recognize (match) and style differently
	- [[push]] [[agora interlace]]
		- [[agora social media integration]]
			- [x] write [[agora bot]] for [[mastodon]]
			- [x] write [[agora bot]] for [[twitter]]
				- [x] fix auth
					- [ ] restore context
  					- this could be a great workaround for the worse of the re-replying behaviour, and probably will be needed even if I want to support zero state best effort
				- [ ] fix deduping 
					- need to do this again
			- [x] test [[vera]]'s code for pulling tweets and toots
				- only pulled *some* for some reason
				- [ ] figure out what's up, try again and get the context back
		- [[agora bot]]
			- [ ] fix twitter so it doesn't keep re-replying
  			- the API doesn't feel great, I wonder if I'm missing something
				- I thought I'd done this but it's still failing in some cases, [[s5bug]] gave me a test case, I think I put it in [[agora twitter bug]]
			- [ ] refactor mastodon<->twitter so they share code? I don't want to implement everything twice, and I certainly don't want the mastodon version to suffer because I'm addicted to twitter (great people there as well, and there are more of them)
		- [[push]] [[agora bridge api]]
			- [ ] build/release [[agora bridge api]] for the storing posts in the agora.
				- we want to create a git repository for each calling users, which the users could then [[claim]].
				- could be flask, included in [[agora bridge]] repo, copy/paste from [[agora server]] to begin with?
					- nope, it is typescript thanks to [[vera]], looking forward to set this up :)
				- but hopefully they can just communicate through yaml? or perhaps set up and write to sqlite to begin with
				- thought of consolidating everything into [[agora server]], but it feels cleaner to have writers and readers split. should scale better; if the write path goes down, the agora keeps serving just fine without having to do anything special.
					- probably keeps it simple to run a read only agora (mirror).
			- yes, going with [[read]] ([[agora server]]) and [[write]] ([[agora bridge]]) apis
			- request new git integrations (e.g. mount git repo X in path Y)
			- accept other inputs? like perhaps subnodes, which could go into a managed repo.
			- configure sources from social media (from agora bot)
			- in general this unlocks better [[signup]]
	- [[push]] [[moa]]
		- [ ] review [[go/moa/bugs]]
	- [[slay moloch]]
		- [[chase moloch]]
	- [[write]]
  	- [[flancia]]
    	- [[book]]
			- choose [[top 5]] nodes to expand on
			- edit https://flancia.org
		- [[iremos juntos hasta el final de la noche]]
		- [[slaying moloch]]
			- [[building bridges]]
			- [[finding isomorphisms]]
				- measuring distance to an isomorphism? there must be a term for this
		- [[node club]]
    - [[patterns]]
		- [[after the pandemic]], or [[an open letter to the agora]], or [[an open letter to an open nation]]
		- [[on cringe]] / [[agora polls]]
			- about explicit rational (mathematical) modelling of group dynamics through social media discourse
			- is [[hack the planet]] cringe? should it be?
			- why is it cringe to talk about virtue?
	- [[read]] 
		- what [[will walker]] told me about
			- link it here
			- this is past due
	- [[push]] [[weekly]]
		- [x] run [[weekly review]]
		- it turns out I do a run through [[do]] weekly at best as of late, so this *is* my weekly. I'd love to make it daily though. perhaps I could auto-pull [[do]] from the journal page? just the subnode for the 'active' user.
		- promote [[do]] to nav item?
		- we could also have 'this week', 'this month', 'this year' in the agora, have it rank top nodes in time scope, allow users to pull specific nodes from each view
- an [[agora action]]
	- I try to automate recurrent [[actions]] in the [[agora]]. This node is the root of my [[getting things done]] graph, which I try to use to model my [[intents]].
	- [[daily]], I try to check here for pending [[work]] in all known sources of truth.
	- [[weekly]], I try to run [[weekly review]] and [[garbage collect]]
	- [[monthly]], I try to check the context in more specific actions/nodes and push relevant items here or to [[next action]]:
	- what should I [[read]] next?
	- what should I [[write]]?
		- [[flancia]]
			- [[book]]
			- [[an open letter for an open society]] (this has many titles)
		- to [[a. p.]] asking for a recommendation
			- hmm, I don't know what this means :) as in, I don't know who I meant by [[a. p.]]
	- [[unblock]] people who are waiting for me
		- this is not atomic. how do I know who is waiting for me?
- [[research]]
	- [[federated wiki]]
	- [[indieweb]]
	- [[ipfs]]
		- [[ipld]]
	- [[fission]]
	- [[hypercore proto]]
	- [[launchlet]]
	- [[urbit]]
		- [[rosano]]
			- Rosano is in Urbit or did I just fat finger an indent?
	- [[support]]
		- [[effective altruism]]
		- [[flancia collective]]
		- [[open source]]
		- [[friends]]
		- [[public utility]]
	- [[code]]
		- [[agora server]]
			- add particles to [[agora search]]
			- [[browse as]]
			- parse [[agora protocol]] (see below)
		- [[wikilinks everywhere]] / [[agora ext]]
			- could [[d3]] replace [[jquery]]? it would make it easy to also include a graph tool directly in the library. it's 200kb though.
			- but we could just add [[force graph]], in general have the client side code from [[agora server]] be also there and potentially work in every agora/every place with wikilnks or links (pulling could be useful on every site)
		- a more flexible [[actions]] system
			- what does this mean? :)
			- write something better or remove on next collect
		- [[project snapshot]]
			- model my digital existence as a sequence of computational snapshots
			- what complexity class is this in generally?
			- what is the [[zero]]? as in, the starting state.
  			- probably [[browser tabs]]
  			- then more generally programs running, including optionally their context
				- could make it easier to actually dedicate one workspace for every project -- the dream of [[richard francis burton]] IIRC?
- Please tell me what you think I should [[do]] next (or instead of the things I'm doing or planning to do) below in the Stoa, via social media, or via any of the channels listed in [[flancian]]. All feedback is welcome!
	- https://twitter.com/flancian/status/1386048603496529925
	- https://twitter.com/flancian/status/1374462566395617286
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
	- many items in [[agora plan]]
