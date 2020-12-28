# Agora Plan

I'll use this as a sort of inline project page for the [[agora]] implementation you're likely reading this in now: <https://anagora.org>.

As you might know by now, an Agora is a beast with multiple legs:

 - A knowledge garden. This is the heart of the [[Agora]]. It is kept in the <https://flancia.org/go/agora> repo.
 - A web renderer, which I run on anagora.org. This is [[Agora Server]]. It is kept in the <https://flancia.org/go/agora-server> repo.

This page is about both, although it's probably going to be [[Agora Server]] heavy as I'm currently focused on developing features for it.

## Latest
- On [[2020-12-27]] I released [[agora 0.5.6]] with [[pull]] support, better db code, caching... quite a bit :)
- On [[2020-12-20]] I worked [[agora 0.5.5]], which adds simple [[hypothes.is]] integration.
  - Fixed the fact that [[back]] [[links]] didn't work in non-existent nodes (even when there are backlinks, that is).
  - Prepared CSS/html for [[pull]], [[push]], [[forward]] links.
- On [[2020-12-04]] I released [[agora 0.5.4]], with some improvements:
  - New data model (digital gardens are not subtree'd in the main [[agora repository]] anymore, stay wholly independent)
  - Index page is now just another node, subnodes can be contributed by users.
- On [[2020-11-29]] I integrated the first community contribution ever.
- On [[2020-11-27]] I fixed some bugs, like wikilinks with periods on their names not working.
- On [[2020-11-22]] implemented count of subnodes in user pages.
  - [x] Added *some amount* of go links support: anagora.org/go/go now works :), points to the URL with [[go]] in anagora.org/node/go.
- On [[2020-11-17]] implemented [[latest]].
- On [[2020-11-16]] I implemented [[agora fuzzy matching]] and full text search, adopted a div based layout, improved the CSS, improved user pages.
- On [[2020-11-15]] I implemented dark mode (press on 'theme' on the top right corner to switch dark <-> light).
- On [[2020-11-14]] I released [[agora 0.5.1]].

## Signups
- [x] [[pen-coded]]: https://github.com/KGBicheno/KGB_Agora
- [x] [[luciana]]: https://github.com/malfattti/garden
- [x] [[arghzero]]
- [x] [[dr_kvj]]: https://github.com/drkvj/agora
- [x] [[jonathan-the-utopian]]
- [ ] [[enkiv2]]: http://lord-enki.net/medium-backup/
- [ ] what about all of the ones licensed appropriately listed in [[kasper zutterman]]'s [[second brain]] list? https://github.com/KasperZutterman/Second-Brain
  - Discussing with [[armengolaltayo]]
- [ ] See also [[digital gardeners]]
- [ ] [[iplumb3r]]
  - This seems to be in [[topincs]] format, investigate.

## Integrations
- [[agora-go-links-integration]]
- [[agora twitter integration]]
- [[agora-youtube-integration]]
- [[agora hypothesis integration]]
- [[roam2agora]]
- [[agora vscode]]
- [[wikilinks everywhere]]

## Next
- [ ] I should make node [[0.5.6]] work
- [ ] graph the whole Agora -- sounds fun!
- [ ] Implement [[pull]] and [[push]].
  - [x] Define divs for 'pulled' and 'pushed' sections
  - Write functions that return [[pull]] and [[push]] entities in each subnode
- [ ] Make more links default to node instead of subnode.
  - For example those in latest, those in user pages.
  - Might require 'upranking'.
- [ ] set up [[agora]] hot spare in [[dorcas]], this is an experiment but I already find it very useful so I don't want to not have it available for a while if there's a server failure
- [ ] add monitoring -- [[munin]] or something more modern? [[prometheus]]?
- [ ] Implement /node/foo/selector as more resilient/uniform alternative to /subnode.
- [ ] Implement user upranking/pinning.
  - Perhaps nodes visited from a user scope uprank subnodes by that user?
- [ ] https://twitter.com/s5bug/status/1334686375275163652?s=09
- [ ] Provide a link (GET) for the search for '\[ \]', useful for [[do]].
- [ ] Add better backlinks, showing some context.
- [ ] Make the site header be marked as an actual header (div with a class, etc.); Google seems to think it's part of the site text (it's showing up in results).
- [ ] Fix markdown list formatting issue with different tab widths.
- [ ] add footer.
- Implement preview-on-hover?
- Implement "around the Agora".
- [ ] add /latest or some other chronological view
- [ ] User profiles: perhaps just note [[flancian]] as written by user [[flancian]]? Unsure.
  - [[s5bug]] suggested using [[README]] in gardens for this. Makes sense.
- [ ] Make the index be just another note [[ding-levery]].
- [ ] Improve backlinks: show snippets as well as just the link.
- [ ] Improve pull loop to also support arbitrary hooks, like that needed to implement [[agora go links integration]].
- [ ] Multi user improvements:
  - Better sorting (right now all my notes show up at the top, doesn't make sense).
  - Ability to "zoom into" a user, to navigate just their garden for a while.
  - [ ] Perhaps ability to "uprank" users, pinning their notes to the top of any sorting order.
  - [ ] Perhaps sort+uprank can be integrated?
  - [ ] usernames could have a 'pin' emoji that upranks all their posts?
- [ ] Implement search (full text).
- [ ] Add support for media serving (useful for pictures of [[ocell]]).
  - assets/foo end up at node/assets/foo; just adding a handler for node/assets/ seems like it could be enough.
  - It would conflict with a node named 'assets' though, so perhaps it's not ideal.
  - Perhaps it'd be better to just serve images/media as subnodes?
- [ ] Add monitoring/alerting.

## Some day:
- When you update a node on a [[person]], said person gets a notification (they can opt out).
- Support [[Roam]], [[Athens]], [[org-roam]] digital gardens.
- Twitter integration -> [[agora twitter integration]]
   - Ask [[ding levery]].
- Automatic [[actions]] -> [[agora action]]s -> [[agora action]]
  - [[tweet]] block tweets the block (exactly once, etc.).
- [[go links]] integration -> [[agora go links integration]]
  - If the first block of [[foo]] is a URL, anagora.org/go/foo just redirect there.
  - Could also work as an action: [[go]] target URL.

## Feature requests

- [[pull]] [[feature requests]]

## History
- [x] fix bug: backlinks should be shown even in yet non-existent nodes, such as [[deceased]].
- [x] Clean up stale journal pages which don't follow [[iso 8601]].
- [x] Add config.py file with things such as paths.
- [x] Add user handler: /u
  - /u/flancian -> all nodes by flancian
  - /node/flancia/u/flancian -> flancia by flancian
  - Also added @flancian. Shorter is better, and it's a common convention.
  - perhaps /g/ for groups later? or /s/ for stoa.
- [x] Add 'link to this note'.
  - Now called subnode.
  - Subnode rendering is ready, just need to add links.
  - Perhaps I need to fix subnode paths; right now they are the actual filename. It'd be better if there was at least possible to specify the filename base (no extension) and have the right file be resolve, a la nodes.
- [x] add some search support -- a simple textbox + GET?
  - Probably want to use [[flask-wtf]] for this: https://hackersandslackers.com/flask-wtforms-forms/
- [x] better css
  - [x] Add '[[dark mode]]' to the Agora, I like this kind of scheme: https://twitter.com/ablueaeshna/status/1323439284272222208/photo/1
  - [x] added switching by button
  - Make subnodes/notes look like notes instead of using clunky ```<hr />``` everywhere. Move to divs, etc.
- [x] Improve the [[index]].
- [x] Implement [[agora fuzzy matching]].
  - Done
  - [ ] but backlinks don't work in some cases, like <http://dev.anagora.org/node/abstract%20fairy>.
  - Probably not worth fixing that right now as it only triggers for nodes that are not canonical, perhaps better to just redirect to a canonical node.
  - [ ] could help with disambiguation and acronym expansion


[//begin]: # "Autogenerated link references for markdown compatibility"
[agora]: agora "Agora"
[Agora]: agora "Agora"
[Agora Server]: agora-server "Agora Server"
[2020-12-27]: journal/2020-12-27 "2020-12-27"
[pull]: pull "Pull"
[2020-12-20]: journal/2020-12-20 "2020-12-20"
[hypothes.is]: hypothes.is "hypothes.is"
[links]: links "Links"
[push]: push "Push"
[2020-12-04]: journal/2020-12-04 "2020-12-04"
[2020-11-29]: journal/2020-11-29 "2020-11-29"
[2020-11-27]: journal/2020-11-27 "2020-11-27"
[2020-11-22]: journal/2020-11-22 "2020-11-22"
[go]: go "Go"
[2020-11-17]: journal/2020-11-17 "2020-11-17"
[latest]: latest "Latest"
[2020-11-16]: journal/2020-11-16 "2020-11-16"
[agora fuzzy matching]: agora-fuzzy-matching "Agora Fuzzy Matching"
[2020-11-15]: journal/2020-11-15 "2020-11-15"
[2020-11-14]: journal/2020-11-14 "2020-11-14"
[pen-coded]: pen-coded "Pen Coded"
[luciana]: luciana "Luciana"
[arghzero]: arghzero "Arghzero"
[jonathan-the-utopian]: jonathan-the-utopian "Jonathan the Utopian"
[enkiv2]: enkiv2 "Enkiv2"
[second brain]: second-brain "Second Brain"
[armengolaltayo]: armengolaltayo "Armengolaltayo"
[digital gardeners]: digital-gardeners "Digital Gardeners"
[iplumb3r]: iplumb3r "Iplumb3r"
[agora go links integration]: agora-go-links-integration "Agora Go Links Integration"
[agora twitter integration]: agora-twitter-integration "Agora Twitter Integration"
[agora-youtube-integration]: agora-youtube-integration "Agora Youtube Integration"
[agora hypothesis integration]: agora-hypothesis-integration "Agora Hypothesis Integration"
[roam2agora]: roam2agora "Roam2agora"
[agora vscode]: agora-vscode "Agora Vscode"
[wikilinks everywhere]: wikilinks-everywhere "Wikilinks Everywhere"
[do]: do "Do"
[flancian]: flancian "Flancian"
[s5bug]: s5bug "S5bug"
[README]: README "Flancian's digital garden"
[ding levery]: ding-levery "Ding Levery"
[ocell]: ocell "Ocell"
[person]: person "Person"
[Roam]: roam "Roam"
[Athens]: athens "Athens"
[org-roam]: org-roam "Org Roam"
[agora action]: agora-action "Agora Action"
[tweet]: tweet "Tweet"
[foo]: foo "Foo"
[feature requests]: feature-requests "Feature Requests"
[deceased]: deceased "Deceased"
[iso 8601]: iso-8601 "Iso 8601"
[dark mode]: dark-mode "Dark Mode"
[index]: index "index"
[//end]: # "Autogenerated link references"