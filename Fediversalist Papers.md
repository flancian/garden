- a [[report]].
  - [[ethnographic]]
  - on [[Fediverse]] [[governance]] and related practices.
  - by [[Darius Kazemi]] and [[Erin Kissane]].
  - I had the privilege of participating in the study through an interview due to my involvement with [[social.coop]].
  - As I write this on [[2024-12-08]], I finally have the time to read it as I'm in a long flight to San Francisco :)

# [[2024-12-08]]

## Section 1

It starts interesting and seems well-organized; I like how it includes a sort of 'map'/sensemaking helper in the beginning and is recommends reading paths to people with different profiles. For now I'm just reading the main paper (which is 116 pages) and seeing how that goes.

Good definitions of the Fediverse and a recap of the history of [[ActivityPub]].

A good observation on page 10: the study won't focus on the more technical aspects of running a Fediverse (e.g. Mastodon) instance, but they recognize that might be an interesting topic in itself and a good focus for some other less-ethnographically-oriented study. I totally agree. Also this page contains the first mention of [[social.coop]] thanks to [[Nathan Schneider]], whose [[Governable Spaces]] is immediately recommended :)

[[IFTAS]] is mentioned also several times very near the start, which reminds me I've been meaning to look further into it/them.

I like the term [[Federated diplomacy]] for issues related to the governance of relationships between Fediverse servers. I think I'm going to adopt it.

According to [[Robert Gehl]]'s definition the Fediverse is [[non-centralized]], not [[decentralized]], as it was never centralized to begin with :)

Darius and Erin (D&E from now on?) identify the need to make it easier for users to 1. find instances that align with their values and 2. (crucially) move to them from potentially less-aligned ones "with maximal ease and minimal loss" (p20).

p23: decision making processes are overall fuzzy and unclear to users and even to moderators. The use of side channels to interact with other instances is called out as a contributing factor; this seems relevant to the [[Ekumen]] and our plans to try to systematize this. Also, the Fediverse is called out as relying on security-through-obscurity in a way; it works at all because it's small enough to evade most adversarial attention, for now.

p24: [[Securing Federated Platforms]] by Roth and Lai is referenced. 

p25: mentions Bridgy and defines [[emergence]] as per [[adrienne maree brown]] and [[Peter A. Corning]].

## Section 2

Section 2 (p26-p29): interesting list of categorized risks, with class 1 being 'manageable', class 2 being 'sources of moderate unresolved frustration or anxiety' and class 3 being 'sources of broader and more intense anxiety'/existential risks. The latter includes fragmentation or die-off of the Fediverse and increased risk of corporate capture, including a favorite of past interlocutors (well phrased): "bridges to other social media ecosystems increasing attack surfaces" (I am pro-bridges so I tend to run into anti-bridge discourse moderately often). This sections also mentions [[XZ-style vulnerabilities]]; I don't know what those are so I'll probably look those up when I have an internet connection.

Class 2 maybe contains the most potential for immediate innovation and could be tackled by the [[Ekumen]]: moderation inefficiencies, insufficient tools for governance, lack of ability to communicate well between servers for diplomacy, and other tooling issues.

Section 3 is about high-level recommendations, starting with best practices for server (instance) teams. Seems like we should review these in the relevant workgroups like the [[CWG]]; I'll bring this up in the next CWG or [[Organizing Circle]] meeting I attend. We seem to be following most of these though, which is good! We could still adopt a few more, and in particular have some presence in [[IFTAS Connect]] and the [[Mastodon Discord for supporting members]] (sigh).

p32: Then we move on to opportunities to address unmet needs and unmitigated risks, and this is great stuff for the working groups and the [[Ekumen]]: better moderation tooling (with e.g. bulk actions), actual software support shared deny-lists, API support for governance tooling, better tooling for diplomacy, more documentation and case studies for participatory models (we can help here!). [[Coalitional moderation]] essentially describes what we want to do with the Ekumen succinctly.

On registration practices, p37.: I think they refer to our instance as the single one that "uses an off-Msatodon process with a self-hosted form that generates GitHub tickets..." -- if so this could make with a small correction, as we use Gitlab and indeed actually git.coop which is a cooperatively run Gitlab instance :) I'll probably reach out to D&E about this.

On p38, more on social.coop -- this reminds me that I wanted to talk again with the WGs and the OC about the fact that social.coop shows up as 'closed' in joinmastodon.org because of our registration process. We should probably file an issue with the [[Mastodon]] project to fix this maybe?

One instance is closed but periodically creates timed invite codes and shares them with existing users; I hadn't thought of that approach and it seems like a cool way to make the process of "curating growth" more distributed.

p42: on [[rules and guidelines]] of participating instances. I want to look more into [[hachyderm]]'s. Also, Nathan's tool [[CommunityRule]] sounds cool, I'll check it out [[when I have internet access]].

p51: [[hachyderm]] freezes accounts when they are deemed problematic, usually until some condition is met (e.g. a post is deleted). Interesting. They run open registrations though and they're ~10-20x larger than Social.coop, but it might be good to talk about this with the CWG team in case it ever becomes needed.

[[hcommons.social]] is a project from the [[University of Michigan]] that I also want to check out.

On [[CSAM]]: I don't recall ever handling a report about it, but it seems in some locations when you do handle a report about it you are supposed to report it in turn to a government organization ([[NCMEC]] == [[National Center for Missing and Exploited Children]] is mentioned). Another thing to bring up with the [[CWG]] maybe, although I think this is a US thing.

[[Moderation resources]] in p61.

## Section 3

Section three is about server leadership / server governance, i.e. how the communities govern themselves and allocate and distribute power.

p67: on cooperative governance. Apparently many instances are interested in becoming coops or more coop-like, but there's a barrier to entry. [[Social.coop]] could help here by documenting processes more, sharing experiences and doing outreach?

p74, on opportunities for exploration. 3.1 is "connection people-people and tech-people"; I feel this is one of the roles the Organizing Circle might take, and to some extent can also arise as cross-working-group collaborations and community outreach in the case of Social.coop.

p77: an admin of the French speaking server that is part of the study is looking to build a coalition of French-speaking instances to share moderation and blocklists :) Also a reference to Fediverse neighborhoods, "caracoles" (?), "fedifams", "bubbles". Nathan ponders if our relatively low ratio of Loomio participation is very worrying or not so much; whether a coop can be successful if it's "participatory enough" and provides a good service to all members and enough opportunities to participate in decision making. He also sees the Organizing Circle as a step in the right direction.

## Section 4

Section four is about [[Federated Diplomacy]].

p80: "The governance of [[shared blocklists]] themselves would be a worthy subject for future research, but was beyond the scope of our project."

p81, seemingly a small typo: "Additionally, some server teams who maintain..." should likely be "Additionally, some server teams maintain..." given the remaining sentence structure?

Then interesting discussion about the question of "preemptively defederating" with Threads, and how some instances handled that.

p87: the director of [[IGTAS]], [[Jaz-Michael King]], recommends having an explicit [[Federation Policy]]. Hmm, I don't think Social.coop has one? I'll check (again) once I have internet :) This would go very well with ongoing discussions within working groups and with some community members. Interestingly, IFTAS is pushing for instances having one such policy *at all*, but not engaging further with content recommendations. Organizations like the [[Ekumen]], or maybe the Francophone organization mentioned above, could work on this.

## Section 5

Section five is about [[tooling]].

Most people run into the same limits of Mastodon as a messaging platform as we are currently discussing in the CWG; they use off-platform chat.

Instances do not necessarily trust blocklists as they currently exist; admins said they'd like to remove individual federation/defederation decisions instead of just accepting them in bulk, which resonates with me.

"There is a strong desire for the federation of moderation actions themselves". I brought this up but apparently others did as well, which is very good :)

Inter-server communication is weak; and so is account migration, which (as they rightly point out) complicates things as "just go elsewhere if you disagree" (e.g. with moderation decisions) is actually putting an onus on the user, and moderators will try to avoid this.

[[IFTAS]] apparently offers a "content library" with moderation documentation, sounds cool, I'll try to check it out.

The lack of bulk actions for moderation comes up here. I hope there is an issue/PR with the Mastodon project on this by now, and they are not rejecting the idea? I'll try to find it.

p96 on blocklists, some public ones are mentioned: oliphant.social's, [[the bad space]] and [[list of large servers with open registration]].

Apparently most instances do what Social.coop does, which is: not actively track blocklists. And others have seen issues with #FediBlock, like over-reporting in a fuzzy way that makes it very time consuming to check. All in all "everybody" seems to want something closer to a 'moderation inbox' including bad instances reported by friendly instances?

A lot of servers use e.g. a mods@example.social account to do moderation outreach/exchanges. I think we should do this more in Social.coop, I'll bring it up withe CWG?

p99, on [[content filtering]]: tools exist like [[Safer by Thorn]] which I was unaware of, it focuses on CSAM. It sounds enterprise-y. IFTAS is partnering with them to try to act as a "large group" that then provides that service to smaller instances.

p101, more on account porting: it turns out that moving instances moves followers, but... that's it?! I was somehow unaware of this, I thought there *was* a way to transfer content. But apparently it's been deemed too hard so far, in part because someone might need to review all the past content of a user.

p102-103: IFTAS director on the tradeoff between better built-in moderation tools and third-party tools.

p104-108: more details and quotes about federating moderation.

p109: others are also unsure about how to best reach admins in other instances, and see low hit rates when they do. "Just" making sure that that communication path is actually open and clear would add so much value at network level... they suggest a .well-known URI, which is a good idea. I guess in Social.coop that would point to admin@, but then again we don't monitor that account as much as we should. Hmm.

-> [[Fediverse Governance Opportunities for Funders and Developers]]

p110: they double down on making it easy for admins to reach each other, which makes sense. Also on more allow-list federation.

Small typo: s/rederated/federated/.

They recommend to "create a governance-focused dashboard that interfaces with may Fediverse projects" focusing on [[server leadership]] and [[federated diplomacy]]. In general, developing better moderation tooling. They say the Mastodon API is sufficient in this respect, which is cool (I meant to take a look and check).

## Section 6

Section six (the last) is "[[The Case for the Fediverse]]".

Nice opening words by [[Tim Bray]] from [[CoSocial.ca]]. 

Then Nathan, making the case for social media as public infrastructure very way; he points out that the fact that corporations seem to have mostly moved on from social feed onto purely algorithmic feeds (e.g. [[TikTok]]) might be promising. I like how he compares this potential phase to the new growth in a burnt forest.

Several more good quotes, then a great one by [[Jaz-Michael King]], who I would love to discuss the [[Ekumen]] charter with!

## Conclusion

That was a great read :) I feel very thankful to D&E, and to the Fediverse for existing in all its diversity.
