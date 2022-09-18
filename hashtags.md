- The [[agora]] sees them essentially as wikilinks in CapitalCase format (optional).
	- If the hashtag points to a node that is an [[action]], clicking on it will trigger the action.
	- [[agora bridge]] support is lagging, needs to be fixed.
		- [[refactoring]] -- it would be nice to have as little difference between handling a [[wikilink]] and handling a [[hashtag]] as possible.
		- [[rfc 3986]] means we could just link to <agora>/<entity> regardless of convention, and let [[agora server]] handle (semantic) parsing
			- thought of this a while, it's nice how this handles spaces by default but it mangles unicode needlessly
				- [[iri]] sounds better
				- OK, let's go, what does [[urlencode]] in [[python]] does?
				- actually [[quote plus]]
				- ```
				  import urllib.parse
				- urllib.parse.quote_plus(...)
				- ```
	- now done for [[mastodon]] :)
		- opt out story needs to be improved, for now users who opt out are hardcoded in code
	- next up:
		- DONE [[matrix]]
		  :LOGBOOK:
		  CLOCK: [2022-05-08 Sun 18:14:10]--[2022-05-08 Sun 22:36:10] =>  04:22:00
		  :END:
		- DONE [[twitter]]
		  :LOGBOOK:
		  CLOCK: [2022-05-08 Sun 23:29:29]--[2022-05-08 Sun 23:29:30] =>  00:00:01
		  :END:
		- LATER add opt out
			- NOW there might be a bug? why did https://twitter.com/an_agora/status/1523407803200983040 at-mention @zeno_dox, attribute the tweet to them? hmm.
			  :LOGBOOK:
			  CLOCK: [2022-05-08 Sun 23:30:13]
			  :END:
		- LATER [[agora server]] support, so file HashtagsAreHere.md is volunteered in node [[hashtags are here]]
		- LATER provide [[multi platform social feeds]] as a service
		  :LOGBOOK:
		  CLOCK: [2022-05-08 Sun 18:14:34]
		  :END:
			- it's like the current feed code, but special cased on urls? one url per post, no matter the node source
			- yep I like this -> [[url feeds]]