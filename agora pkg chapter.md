- a [[paper]].
  - #push As of [[2022-07-24]] being produced as the draft for a [[pkg book]] [[chapter]].
    - Very much looking forward to the book because of others' contributions!
    - See other chapters in https://personalknowledgegraphs.com/#/page/Personal%20Knowledge%20Graphs.
  - This chapter is about the [[Agora]] in general, and about [[an agora]] in particular, and what we could do with them together.
  - Working title: "The Agora is a Distributed Knowledge Graph and Protocol".
    - Original title (for the abstract): "The Agora is a Social Knowledge Graph".
    - Subtitle: Towards a Free [[Commons]] by [[Building Bridges]].
  - Expected length: 5k-10k words ~ 10-20 A4 pages single spaced.
  - #push [[deadlines]]
    - [[outline]] July 1: A list of bullets with the sections the chapter will consist of.
    - [[draft]] August 1: A first draft of the chapter, minimum of 2,000 words.
    - [[submission]] [[September 1]] ~ [[2022-09-01]]: The final chapter submission after which it goes into editing.
  - #meta The preceding blocks and the following [[children]] exemplify [[Agora Protocol]] (see below for a concise description.)
    - #push [[commons]] 
      - #pull [[knowledge commons]] [[elinor ostrom]]
    - #push [[altruism]] 
      - #pull [[effective altruism]] [[peter singer]]
    - #push [[revolution]]
      - #pull [[free software]] [[federation]] [[adversarial interoperability]] [[murray bookchin]]
    - In this subnode you will find the actual **chapter text**, including the introduction, which should be 5k-10k words once ready to be delivered on [[2022-09-01]].
      - In the subnode below, sourced from the [[stoa]], you will find a snapshot of the chapter outline as it was when I delivered it to editors on [[2022-07-04]] as a list of bullets. This is now an **independent version**, writable by any interested party; feel free to edit it in whichever direction you want to take it and use it to show what *you* think the Agora is about, or should be.
    - #push [[agora]]
      - (If you don't like this [[Agora]], that's fine -- consider improving it!)
    - [[todo]] (see also in line below marked TODO)
      - [x] add [[bridges]] section
      - [x] add [[siphons]] section
      - [x] add sections for [[agora platform]] and [[agora commons]] (triad approach).
      - [x] write about go links
      - add [[opt in]] policy
      - add [[user data ownership]] model (repo per user to bootstrap)
      - document [[endpoints]] in [[Technical specifications]]
        - including /feed/
      - document social -> agora and agora -> social flows
      - add more on [[pattern repository]] aspect
      - describe [[pull]], [[push]], [[go]] in RFC section?
      - importing single resources like docs?
      - Is it too much to say "The Agora is a [[protocol]], a social [[platform]] and a knowledge [[commons]]"?
        
# Introduction

In this [[chapter]] we describe [[Agora]], a social [[protocol]] and associated [[platform]] hypothetically enabling a self-governing community to provision a sustainable [[knowledge commons]] for the [[public good]].

The Agora as described in this article is just [[an Agora]], meaning it is just one possible implementation of the principles delineated here. Because the Agora-defining [[Agora protocol]] tries to build on common principles[^commoning] and incorporate conventions already in use at the time of writing, you will likely find that other Agoras already exist -- if not by name, then in spirit.
  
A core aspect of [[this Agora]] is that its constituent [[distributed knowledge graph]] can be easily bootstrapped on a well-defined freely-available subset of the [[internet]]. The provided reference Agora can already integrate crowdsourced sets of [[personal knowledge graphs]], [[digital gardens]], [[wikis]] and [[feeds]] (including social), generalizing to arbitrary repositories. All data sources are retrieved and integrated using [[free software]], while still supporting production and editing with arbitrary tools of the users' choice.

As hinted already, the Agora has multiple facets which we will try to explore throughout this article:

- A high level [[protocol]] designed to lower friction to information exchange and cooperation, mostly building on conventions already in use in knowledge oriented [[communities of practice]].
- A [[free software]] [[reference implementation]] of a [[platform]] based on the principles delineated in this article, including a set of importers and converters for diverse [[sources]] and [[formats]], [[Agora endpoints]] implementing the [[Agora protocol]], and an integration layer and UI.
- An example [[distributed knowledge graph]] provisioned using the tools above and maintained by the https://anagora.org [[community]].

We will then cover experiments and potential applications in the [[academic]], [[social]] and [[political]] domains assuming the availability and widespread adoption of this or some other free [[knowledge commons]]. This is done in the form of a series of short reports and exploratory essays.

[^commoning]: both commonsense and related to instances of [[commoning]].
[^chorus]: it is an expression of the [[pattern]] [[chorus of voices]].
[^protocol]: This section serves as a demonstration of text-based [[agora protocol]] which, in an Agora, will result in the entity mentioned above being transcluded due to the use of an Agora action ("pull", to bring a described resource into the current context.)

# Background

- #meta TODO: this [[Agora protocol]] block is a MARKER for 'edited (up to?) around here in the last pass', move/delete as needed.

The Agora can be defined in a nutshell as a subset of the [[internet]][^web] used consciously towards a particular purpose. As mentioned previously, it can also be seen as both a platform and a protocol for provisioning and maintaining a [[knowledge commons]]. Because of both this wide definition and the wide applicability of the principles detailed in this article, the background required to put this effort in context is ample and fuzzily defined at the edges.

[^web]: Or [[Web]]? See literature for most common term, likely web due to ties to the [[semantic web]] if nothing else.

## Terminology

This project is of very large scope and might make use of non standard terminology. To ease understanding, here we provide a short summary of key terms to follow.

- [[Agora]]: a [[protocol]], a [[platform]], a [[commons]]. The [[noosphere]]. [[Internet]] as a tool held right.
- [[Graph]]: the heart of the Agora. A distributed [[knowledge graph]] in particular, both explicitly and implicitly containing a variety of social graphs.
- [[Node]]: a vertex in the knowledge graph. Maps to an [[entity]] description encoded in a [[wikilink]] or #hashtag. Maps to a mental [[context]] in an Agora user.
- [[Subnode]]: a resource contributed by a user which the Agora will provision when queried for a variety of [[Node]] contexts. A node is a collection of subnodes.
- [[Link]]: an annotated edge in the knowledge graph. A relationship or connection between concepts or contexts, optionally annotated. Technically you can think of it as tuple of nodes linking to each other, or more generally a set or sequence of nodes related to each other via a composite relationship (e.g. a link with annotations). The later results in a [[hypergraph]] which is what an Agora generally implements. 
- [[Garden]]: a repository of resources maintained by a user over time. (Optionally entity mapped) information contributed by a user diachronically.
- [[Feed]]: a sequence of points in time with pointers to objects. Interesting resources as positioned in a [[timeline]]. A core [[Web]] technology that an Agora can both consume and provide.
- [[Stoa]]: a repository of resources maintained by a group over time.
- [[Bridge]]: a device or process connecting contexts, applying to both nodes and repositories.
- [[Siphon]]: a bridge which exploits a gradient.
- [[Commons]]: a [[social organism]] or [[social system]] provisioned and maintained by a community of practice for the [[common good]]. As per [[Elinor Ostrom]], [[Silke Helfrich]], [[David Bollier]], etc.

# Principles

This section details goals and values as they relate to the definition of an Agora on a high level.

The Agora as a project is positioned at the intersection of the fields of [[commoning]], [[patterning]] and [[knowledge management]].

- The Agora is inspired by the pioneering work of Elinor Ostrom and others in the study of well functioning [[commons]], which resulted in dispelling the once dominant position that [[commons]] must be taken over by centralized agents to prevent the so called [[Tragedy of the Commons]].

It is also clearly inspired by the work of pioneers of [[tools for thinking]] and the [[Web]].

- #pull [[vannevar bush]] [[memex]] 
- #pull [[douglas engelbart]]
- #pull [[tim berners lee]]

It builds on top of the open web, wiki culture and the social movements enabled by them.

- #pull [[tim berners lee]] [[solid]] 
- #pull [[ward cunningham]] [[wiki]] [[fedwiki]]

It is also a project with a pragmatic bent directed towards world improvement and the planning and peaceful enactment of global reform and revolution.

- #pull [[social media]]
- #pull [[effective altruism]] 
- #pull [[murray bookchin]]

## Praxis

The Agora is a platform for shared [[praxis]] based on a set of public [[intents]], which include declarations of [[goals]] and [[values]].

An [[Agora]] tries to meet the user where they are. As a service in the internet, you don't sign up to an Agora: you sign in. Albeit the reference Agora is based firmly on [[web 1]] principles and core [[web]] protocols and architectural styles like [[http]], [[rdf]] and [[rest]], it also includes partial implementation of [[social]] protocols like [[activitypub]] which affords it a basic level of integration with the [[Fediverse]] and Twitter[^twitter].

The [[Agora]] provisions an [[overlay]] (demo at https://anagora.org) querying an [[interlay]] ([[go/agora]]) integrating [[repositories]] as [[underlay]].

With this tool the Agora community can embark on shared projects. The author, as one member of the [[agora community]], would like to propose (offer) a series of [[projects]] as a collection of public [[intents]].

Let us use Agora Protocol if you may.

## [[Agora Protocol]]

This section describes a [[protocol]] for publicly defining sets of [[conventions]] and [[intents]] that can be said to define an Agora. An Agora is a public space that defines itself as such and follows an explicit variation of the Agora Protocol.

In text format, Agora Protocol is a series of typographical conventions that allow users to link and annotate resources regardless of the medium. Annotating here stands for encoding metadata and personal meaning in resources in a way conducive to be later decoded in an Agora-like [[context]].

If you are reading this book, you probably know Agora Protocol even before reading about it; it is meant to reflect and build on existing practices in the personal knowledge management space, like:

- #Tags designate entities as related to the annotated resource.
  - #PascalCase may be used to encode sentences.
- [[Wikilinks]] designate entities as related to the annotated resource.
  - Wikilinks may be preferred when trying to encode sentences a particular typographical realization, as they seamlessly contain lossless [[unicode]] strings.
  
On a pragmatic level:

- [[Optimistic linking]] is encouraged.
  - Links that lead nowhere (currently) are encouraged.
    - In an Agora, the place they lead to by default includes resources written by others.
- [[Outlines]] or [[Agora trees]], as encoded by nested lists such as this one, might be parsed by default as declaring useful [[patterns]][^pattern].

[^pattern]: An Agora is a repository of [[patterns]] and its design owes a lot to [[Christopher Alexander]], [[Ward Cunningham]], [[David Bollier]], [[Silke Helfrich]] and the [[commoning]] community.

When interpreting the above and extensions, an Agora is liberal in what it accepts and when in doubt tries to default to being extra useful to the user -- meaning it is optimistic in association and surfaces all resources that have a claim to be associated with the context being served. For example: #CamelCase will be provided in all contexts matching [[camel case]] and all known variations, and this relationship is symmetric by default, in the sense that the user might provide either at write time and be later served matching resources in either context.

To put it simply, an Agora defines equivalence classes optimistically with good intention. Later we will discuss the hypothesis that this is an optimal default policy for a social platform.

Note that outlines plus [[linking]] seem sufficient to encode thoughts and structure of arbitrary complexity in a human readable way[^complexity]. In the opinion of the author this seems sufficient to encode a [[hypergraph]] in a human friendly way, which might do away with the need for programmatically generated [[block references]][^blockrefs]. See [[Technical Specifications]] below for more.

Next we describe how [[Agora Protocol]] can help provision an [[Agora Platform]] which integrates pro-socially with the wider internet ecosystem, and how a community could use both to run experiments on distributed thought.

[^blockrefs]: Hypothesis: [[Block References]] are suboptimal as [[cognitive devices]] due to being [[competitive]], whereas user generated IDs and encoded structure can be [[complementary]].
[^complexity]: indentation is sufficient

## Agora Platform

## Federation

Individual Agora instances, initially provisioned and maintained by like-minded groups in a [[decentralized]] ([[Fediverse]] compatible) model, but tending towards a fully [[distributed]] model, are expected to federate in a greater [[Agora network]][^fediverse].

An Agora tries to be a [[repository]] of [[patterns]] in the tradition of [[Christopher Alexander]], [[Ward Cunningham]], [[David Bollier]], [[Silke Helfrich]] and [[Murray Bookchin]].

[^fediverse]: An Agora is part of the Fediverse.

- #meta TODO: this [[Agora protocol]] block is a MARK for 'did new writing around here in the last pass', move/delete as needed.

The Agora network is built on a federated protocol the aim of reducing friction to cross-tool cooperation and maximizing the constructiveness of forks. 

Take the case in which two groups might temporarily diverge in their views to want to run separate Agoras. Ideally their instances should be able to continue to cooperate on problems and solutions for which there is enough values/ideological alignment. Persistent best effort cooperation as a default contract also maximizes the chance of re-convergence leading to a merge.

## Bridges
TODO: Define bridges here.

## Siphons
A [[siphon]] can be seen as a bridge across which [[flow]] can take place after some initial [[effort]], with cost-benefit ideally following a Pareto-like distribution.

## Agora Commons

- #pull [[elinor ostrom]] [[free, fair and alive]]

A [[commons]] consists, at a minimum[^comdef], of:

- [[Commoning]], an activity.
  - Exercised in an [[Agora]] via [[Agora Protocol]] as described above.
- [[Commoners]], a group of people.
  - Interacting optionally in the [[Agora Platform]] as described above.
- [[Common goods]], a group of resources.
  - Described in this section.

TODO: describe an [[Agora]]'s [[root repository]].

[^comdef]: https://logicmag.io/commons/singular-plural/

## Intents

The author proposes we use an Agora to define and extend Agora Protocol as a project in the [[commons]]. 

These are sample intents of the [[author]]. They can be optionally endorsed by arbitrary users of an Agora.

- The author tries to follow the [[principle of charity]].
- The author tries to use [[agora protocol]].
- The author offers to extend [[agora protocol]] with [[agora rfcs]].
- The author tries to [[cooperate]] with others [[pro socially]] by default.
- The author tries to [[help]] others whenever possible.
- #pull [[manifesto]]

## Literate programming

Intents in [[Agora protocol]] can be interspersed in long form writing, in which case they can act as human-readable metadata.

[[Tree structures]] with [[wikilinks]] are assumed by an Agora to carry [[Agora protocol]] by default, and may be elided or hidden when performing human-readable format conversions through [[Agora sync]].

# Experiments

## Go links

Go links provide an interest base case to study in the field of provisioning and (pro socially) exploiting[^exploiting] a [[knowledge commons]]. Put simply, [[go links]] are named social bookmarks -- strings of text (usually slugged, but not necessarily) associated with URLs by users in a community of practice.

[^exploiting]: TODO: there's probably a better term for this in [[Free, Fair and Alive]].

[[Go links]] are a [[cognitive tool]] which was developed in [[Silicon Valley]] corporations and has the potential to spread and provide utility at internet scale. As [[cognitive artifacts]] they have a meaningful [[complementary]] component, which makes them interesting as a case study of [[Agora RFCs]] regardless of primary utility of application.

The primary utility, though, is high. In a [[go links]] rich environment, users can depend on other users to have defined [[canonical links]] for named [[entities]]; that is, collections of specially relevant resources to the terms at hand, as shared in a [[commons]]. 

- Go links provide an [[individual]] function. 
  - They allow the user to associate a (usually short) string with a resource of interest, and then recall it from any computing with network access with a short deterministic flow.
  - At companies supporting [[go links]], typing go/<link> in the browser address bar is usually sufficient to be redirected seamlessly to the target resource.
- Go links provide a [[social]] function at low or no additional cost.
  - The trivial extension case for them is social bookmarking; even with invidivuals (not groups) claiming go link space recall of links spreads through a community of practice.
  - Sharing documents becomes simpler by definition in a community of practice that is go links aware. Instead of locating a resource and invoking a sharing flow to share, users are able to say to each other 'go thisdoc' (meaning either go/thisdoc or go/this-doc by convention), effectively transferring a URL in spoken word very efficiently, depending only on a previously understood mechanism to resolve such links (at a well known point, ideally a [[schelling point]]). 

## Pull

## Push

## Node Club

# Applications
This section explores possible further applications in the social and knowledge spaces in the form of a series of short essays.

## Building meaning together through federation and [[Agora RFCs]]

- An Agora supports taxonomies in principle but mostly provides a set of basic tools to converge on meaning best effort through social processes based on federated [[heterarchies]].
- [[Agora trees]], meaning by default [[outliner mode]] text with [[wikilinks]], hint at sections containing [[Agora Protocol]].
- [[Agora RFCs]] allow an Agora community to extend the base [[Agora Protocol]] for more efficient [[commoning]].
    - [[pull]]
    - [[push]]
    - [[go]]
    - [[do]]
- (Details on an [[open source algorithm]] for ranking and filtering based on the above go here.)

## Collaborative world building
- We seek to provision and maintain a distributed knowledge graph tailored specifically to the goal of solving problems: those of its users and society at large.
  - This [[knowledge graph]] will be a [[commons]].
- Its users, as a cooperative group, are promped to take a naive but rational and constructive approach to problem solving by default:
  - For each problem in the set `P` of all problems:
    - Describe it as thoroughly as possible.
    - Maintain a set of known and supported possible solutions, `S(P)`.
  - For each solution in `S(P)`:
    - Describe it thoroughly as an algorithm, a dependency graph or both.
    - Maintain a set of resources (people, time, attention, wealth) needed to implement it, `R(S(P))`.
  - Individual users can also declare their views on the state of the world explicitly: they define which subsets of `P`, `S` and `R` they agree with, in the sense that they believe they are feasible, true, interesting.
    - Users that agree on their defined subsets can then efficiently collaborate on solutions as they become available by pooling of resources.
- Assuming the existence of such a graph we apply some good old recursivity and bootstrap an Agora with the problem of building itself. 
  - That is, we are tasked with solving the problem of building a system that allows participating users and entities to collaborate optimally in the face of adversity (such as biases and irrationality, but perhaps assuming good intent).

## Node Club

- #pull [[node club]]

Thank you to [[neil]] and the [[agora community]]!

## Educational technology

- #pull [[edtech]]
- [[prompts]] as they relate to [[prompt engineering]]?

## Solving coordination problems

- An Agora can be seen as a would-be [[schelling point]] built around the [[principle of charity]].
- An Agora can be used to solve [[coordination problems]] like those we need to solve to enable users to leave walled gardens and protect the [[commons]] against [[enclosure]] by [[anti disintermediating]] parties. It can be said to be a device for enacting [[counter anti disintermediation]].
  - An Agora provides tries to provide free [[bridges]] to escape [[walled gardens]] with your friends.
  - An Agora can help people regain and maintain control of their data, including their [[social graphs]].

## Flow problems 

- #pull [[liquid democracy]] [[network flow]]
- We seek to bootstrap a [[Universal Basic Income]] experiment using an Agora with a set of simple rules:
  - If you consider yourself under-privileged, you sign up to receive an income.
  - If you consider yourself over-privileged, you sign up to donate an income.
  - Incomes are recurring donations for a set number of months.
- Optional [[virality rule]]: the person receiving the income should elect to forward e.g. 10% of the sum received to someone less privileged than them.
  - The virality rule both pushes network growth and constructively exploits wealth inequality and asymmetry of information: an under-privileged person is closer in the world to a more severely under-privileged person than the initial donor, so can more efficiently allocate the resources. This also empowers under-privileged people to also make ethical decisions.
- [[Flancia Collective]] runs experiments in this field using an [[Agora]].

## Market regulation

A [[knowledge]] commons may be conducive to tackling the issue of regulating markets responsibly. A commons can essentially embed a federated network of ethical markets; the community of commoners can agree on the definition of such network and the rules which they which to enforce on transactions through the interface.

# Technical specifications

## Agora Protocol demo

The blocks that follow, and others in the current text in the same [[console typeface]], are a self-documenting demonstration of text based [[Agora Protocol]].

- #push [[agora protocol]]
  - (Push can be used for writing child blocks to a remote context, as if broadcasting to a [[pubsub]] topic.)
  - a [[protocol]].
    - Based on lightweight conventions conducive to [[knowledge federation]] of supported [[data formats]] as described below.
    - [[plain text]] as layer 0 (bootstrapping).
      - What the literate world already runs on: just plain old human language in full [[unicode]].
      - Note that indented bulleted lists are efficient while encoding trees, [[heterarchies]].
    - [[wikilinks]], #hashtags and other link conventions and annotation as part of layer 1.
    - Layer 2 being defined, the same as refinements to other layers, as [[extensions]].
      - If you are a member of an Agora, you can propose extensions to Agora Protocol by contributing to [[Agora RFCs]].
      - This should be sufficient to bootstrap a [[governance layer]] defined by each [[Agora]].
      - #pull [[agora rfcs]]
      - (Pull instructs an Agora to incorporate a remote context into the current context, e.g. [[transclude]] or provision below.)

## Data format

- Layer 0: [[plain text]].
  - Plain text is ubiquituous.
  - It is not only a common standard for all tools in the knowledge space, which simplifies interoperability; it is a common standard for thought as shown by thousands of years of preserved culture.
  - It can trivially encode outlines.
    - It can be made to encode trees, like in this example.
    - Indented bulleted lists designate a useful [[heterarchy]].
  - It generalizes to binary data.
    - It can be made to encode arbitrary data via application of uuencode or other encoding conventions.
- Layer 1: [[markup]] and conventions for cross-referencing and linking.
  - Markdown, org mode, HTML or other rich markups building on top of plain text belong to this layer.
  - [[wikilinks]] and #hashtags seem like sensible cross-format extensions for semantic linking. 
  - Markdown plus [[wikilinks]] is the default Agora layer 1 format.
  - More generally, this is an [[inline metadata]] layer. The above are just relatively unobstrusive generally available implicit standards that inline well.
- Layer 3: JSON, EDN, RDF, protobufs.
  - In general, data exchange formats.
  - The Agora reference implementation currently provides JSON and RDF endpoints.

## Graph definition 

The Agora [[knowledge graph]] can be defined as a **hypergraph** `A` with a set of `k` **nodes** `N` ([[entities]] an Agora knows about) integrated out of **subnodes** `SN_0 .. SN_k`, each containing **subedges** `SE_0 .. SE_k`, aggregating into **edges** `E_0 .. E_k` (semantic links between entities inferred from known subnodes). Edges are annotated implicitly by link context and explicitly via the use of [[agora protocol]] affordances, which is extensible and tries to build on existing conventions in the [[personal knowledge management]] space. 

An Agora differs from other projects in the personal knowledge space in a few ways: whereas a **personal knowledge graph** usually contains resources authored or collected by a single person, and a **wiki** usually contains resources produced by a group, an Agora contains, integrates and interlinks both personal and group resources. Whereas links in a personal knowledge graph or wiki usually have a single target, **Agora links fan out by default** and can be thought of as queries mapping to sets of resources. This is consistent with a general design principle of facilitating storage and retrieval of entity-mapped information with a view toward removing friction from agreement and cooperation.

Building on these general principles and a [[free software]][^reference] reference implementation of the underlying protocols and data, we model and detail how to implement a distributed system that provisions social knowledge services ethically and sustainably with a focus on upholding [[data sovereignty]] principles. We then analyze some of the potential applications of such a system. Finally, we shortly explore future work and implications assuming that the Agora network is run as a [[confederated]] system for the [[public good]].

[^reference]: The provided [[reference Agora]] tries to remain tool, format and platform agnostic, building on general conventions common to many tools and platforms in the knowledge space for ease of integration and maximal inclusivity[^inclusivity] and diversity[^diversity]. 

[^inclusivity]: because we require from would-be Agora contributors only that they indicate where to source their notes, and we are committed to supporting all useful formats, we hope to achieve maximal inclusivity. We believe this is important for the health of the [[commons]].

[^diversity]: we believe diverse groups and communities are healthier, smarter, safer, stronger.

- Being built around a [[knowledge graph]], an Agora can be defined as a set of vertices or **nodes** `N` (each mapping to an entity in a knowledge base) and **edges** `E` (each mapping to a relationship between entities, annotated by context). 
  - An Agora [[node]] is a collection; it contains the set of all known resources *about* (or *related* to) the entity described by the node id, defaulting to its name as an arbitrary length unicode string. 
    - (But potentially overridden or extended with provided metadata and annotations.)
    - In this paper each such resource attached to node `N` is known as a **subnode** `N_s`. 
  - Note that because links can be annotated by context (as they can be considered to be by nearby #tags and [[wikilinks]]), an Agora graph can be said to be a **hypergraph** [^hypergraph].

[^hypergraph]: "Stephen Wolfram likes them." -- see for example https://www.wolframphysics.org/technical-introduction/.

# Reference implementation

- This section covers details on the work-in-progress reference software implementation built on the principles described above, developed as [[free software]] and run as [[public service]].
- The provided [[reference Agora]] is designed to be a minimum viable cooperative platform that integrates and complements [[personal knowledge graphs]] in particular and, more generally, any writing done with a [[social stance]].
- Its guiding architectural principle being to build as much as possible on already existing conventions common to as many tools and platforms as it is possible with the aim to achieve maximal inclusivity and diversity.
-
Here we cover some details of the provided free and open source reference Agora which provides a minimum viable implementation of the [[underlay]], [[interlay]], and [[overlay]] components of a [[distributed knowledge graph]][^kfg].
- The reference Agora stands out from other projects in the [[knowledge graph]] space in a few ways: 
  - Whereas links in a personal knowledge graph or wiki usually have a single target (a particular note or page), **Agora links fan out by default**; targets can be thought of [[collections]] of resources. 
  - While a **personal knowledge graph** usually contains resources and links authored or collected by a single person, and a **wiki** usually contains resources provisioned by a group in (a priori) a shared voice, an Agora tries to integrate and interlink both personal and group resources while preserving distinct voices[^chorus].
  - As of the time of writing, some personal knowledge graph tools are exploring collaborative editing in format- and platform-specific ways. In contrast to this, **the reference Agora described in this chapter tries to be tool, format and platform agnostic** to maximize interoperability and data exchange and provide utility to users of many tools and systems. This is achieved by targeting a minimum viable set of cross-tool conventions.

[^kfg]: https://www.knowledgefutures.org/

## Architecture
![agora architecture](https://social-coop-media.ams3.cdn.digitaloceanspaces.com/media_attachments/files/108/346/148/636/771/913/original/9ffcfe84fe738daf.jpeg)

- The reference Agora is a simple distributed architecture based on off the shelf components.
  - [[agora root]] is a git repository containing the Agora definition, meaning a base [[contract]] which sets the tone and high level goals of the Agora, and a list of data sources to be recurringly integrated.
  - [[agora bridge]] is a git repository containing connectors and importers for supported data sources.
    - User controlled [[git]] repositories are the default data source.
  - [[agora server]] provides a UI supporting querying and composition and [[json]], [[rss]], [[rdf]] endpoints.
    
### Data ownership model

The [[Agora platform]], although strictly rooted in [[web 1]] principles in its reference implementation as of the time of writing, is based on a strictly distributed model: by default users are entities that inform an Agora of repositories they want to contribute to the [[commons]]. As such, an Agora is trivially distributed in the sense that all data required to bootstrap it is hosted independently by users at independent locations[^github].

[^github]: as of the time of writing, GitHub is the most popular git host, but not by much (TODO: percentage goes here). This is likely suboptimal as it undermines the claim of the resulting [[knowledge commons]] of being truly [[distributed]], and can be seen as an instance of the (anti-)pattern [[Anti Disintermediation]].

- Users can contribute [[repositories]] to an Agora.
  - To do so, they publish their resources to a repository they control and then they let an Agora know of their intention to integrate, a desired username and their agreement with an Agora's contract.
  - [[git]] repositories are the default data source, with other repository providers ([[http]], [[ipfs]], [[drive]], [[dropbox]]) to follow.
- Users can contribute individual [[resources]] to an Agora.
  - As of the time of writing they can interact with an Agora system account (i.e. bot) in supported platforms like [[twitter]] and [[mastodon]] while indicating nodes they want to attach to using a Layer 1 convention.
  - (Soon they will be able to submit this information directly on the [[agora server]] provided interface.)
- Whenever a user signals [[opt in]] to remote writing (bridging, siphoning, cross posting), [[an Agora]] does its best to guarantee user data ownership.
  - By default, an Agora will not store data for the user if it the user has not signaled a strong enough intent to write full data. Instead, an Agora will try to [[link]] to resources only in matching contexts, allowing users to recover resources without meddling in data management (see [[go links]] study case).
  - Whenever it does write data, an Agora will try to provision a separate repository per user and try to turn data management into a user's concern at the user's earliest convenience.
    - To put it another way, an Agora actively tries actively to own no data, preferring instead to act as a temporary [[data steward]] of the users' repositories.
    - When an Agora sets up a repository for the user, as in the case in which the user requests to write without having previously indicated their repositories, the Agora will try to set up repositories in such a way that turn-key full access can then be given over to the user on demand.
    - Inasmuch the user depends on services associated with an Agora for repository hosting, an Agora tries to trees repositories as instances of [[pods]] in the [[Solid]][^solid] sense.

[^solid]: https://en.wikipedia.org/wiki/Solid_(web_decentralization_project)

### Endpoints

This section triers to summarize the endpoints that [[Agora server]] provides and plans to provide.

Agoras can define mappings from these to URL schemes generalizing to isomorphic REST-like APIs using `agora.yaml`[^yaml].

[^yaml]: or TOML?

#### Entity resolution
- GET /<context> -> by default the same as /node/<context>, might be overridden with a more particularly useful context
- GET /node/<node> -> entity resolution, node can be percent-encoded
- GET /nodes -> lists known entities in canonical form
- GET /@<user> -> provides details about a user and the [[subnodes]] in their repositories.
- GET /users -> lists users
- GET /search?q=<query> -> generally redirects to /node/<node>?q=<query> with node being a maximally useful context while preserving fidelity of the percent-encoded query string

#### Feeds
- GET /feed/@<user>
- GET /feed/<node>
- GET /feed/journals
- GET /feed/journals/@<user>
- … 

#### Actions
- GET /go/<node>
- GET /go/<node1>/<node2>
- …

# References

- #pull [[elinor ostrom]] [[commons]] [[knowledge commons]] 


# Thanks

To [[Flancia Collective]], [[Agora Discuss]] and the [[Fellowship of the Link]] for discussion and inspiration. 

To my [[friends]] for their ongoing support.
