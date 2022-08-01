- a [[paper]].
  - #push As of [[2022-07-24]] being produced as the draft for a [[pkg book]] [[chapter]].
    - Very much looking forward to the book because of others' contributions!
    - See other chapters in https://personalknowledgegraphs.com/#/page/Personal%20Knowledge%20Graphs.
  - This chapter is about the [[Agora]] in general, and about [[an agora]] in particular, and what we could maybe do with both of them.
  - Original title (for the abstract): "The Agora is a Social Knowledge Graph"
  - Working title: "The Agora is a Free Knowledge Commons"
  - Expected length: 5k-10k words ~ 10-20 A4 pages single spaced.
  - #push [[deadlines]]
    - [[outline]] July 1: A list of bullets with the sections the chapter will consist of.
    - [[draft]] August 1: A first draft of the chapter, minimum of 2,000 words.
    - [[submission]] September 1: The final chapter submission.
  - #meta the parent block and these children exemplify [[agora protocol]] which is in scope for this chapter.

# Preamble 

This node is longer than the average [[Agora]] node :) It has multiple sections.

- In this subnode (this text file as a note) you'll find:
  - An **abstract**, which is based on but is no longer kept close to what I delivered in early [[2022-06]] to the book editors during the chapter selection process. It is meant to be a short comprehensive stand-alone introduction. If this document or a subset of it actually gets published as a paper, this should probably work as its actual abstract.
  - The actual **chapter text**, including an introduction, which is what should be 5k-10k words once ready to be delivered on [[2022-09-01]].
- In the subnode below, sourced from the [[stoa]]:
  - A snapshot of the chapter outline as it was when I delivered it to editors on [[2022-07-04]] as a list of bullets. 
    - This is now an **independent version**, writable by any interested party; feel free to edit it in whichever direction you want to take it and use it to show what *you* think the Agora is about, or should be.
    - Optionally sign your contributions as per wiki protocol :)
      
# Abstract

In this [[paper]] we describe an **Agora**, a [[social knowledge graph]] provisioned and maintained by a self-governing community as a [commons](https://anagora.org/commons). 

The Agora [[knowledge graph]] can be defined as a **hypergraph** `A` with a set of `k` **nodes** `N`[^node] (entities an Agora knows about) integrated out of **subnodes** `SN_0 .. SN_k` containing **subedges** `SE_0 .. SE_k`, aggregating into **edges** `E_0 .. E_k` (semantic links between entities inferred out of known subnodes). Edges are annotated implicitly by link context and explicitly via the use of [[agora protocol]], which is extensible and tries to build on existing conventions in the [[personal knowledge management]] space. 

An Agora differs from other projects in the personal knowledge space in a few ways: whereas a **personal knowledge graph** usually contains resources authored or collected by a single person, and a **wiki** usually contains resources produced by a group, an Agora contains, integrates and interlinks both personal and group resources. Whereas links in a personal knowledge graph or wiki usually have a single target, **Agora links fan out by default** and can be thought of as mapping to sets of resources. This is consistent with the general design principle of facilitating storage and retrieval of entity-mapped information towards removing friction from cooperation.

Building on the above and a [[free software]][^reference] reference implementation of the underlying protocols and data, we model and detail how to implement a distributed system that provisions social knowledge services ethically and sustainably, upholding [[data sovereignty]] principles. We then analyze some of the potential applications of such a system. Finally, we shortly explore future work and social implications assuming that the Agora is run as a [[confederated]] system for the [[public good]].

[^reference]: The provided [[reference Agora]] tries to remain tool, format and platform agnostic**, building on general conventions common to many tools and platforms in the knowledge space for ease of integration and maximal inclusivity[^inclusivity] and diversity[^diversity]. 
[^node]: An Agora node contains the set of all known resources about or otherwise relevant to the entity described by the node title or any provided metadata. Each such resource is called a **subnode**. Note that because links can be arbitrarily annotated (i.e. #tagged or qualified by other nearby links) and have multiplicity, the Agora is in fact a **hypergraph**.
[^inclusivity]: because we require from would-be Agora contributors only that they indicate where to source their notes, and we are committed to supporting all useful formats, we hope to achieve maximal inclusivity. We believe this is important for the health of the [[commons]].
[^diversity]: we believe diverse groups and communities are healthier, smarter, safer, stronger.
[^confederation]: The free and open source reference Agora provides a minimum viable implementation of the [underlay](https://anagora.org/underlay), **interlay**, **overlay** components of a **distributed knowledge graph** based on off-the-shelf components. Individual Agora instances are expected to **federate** and organize into a greater **Agora network**. We describe how this network can integrate with the wider internet ecosystem and how it could be used to run experiments on distributed thought.

## Introduction

An Agora is a knowledge graph bootstrapped by a self-governing community using a subset of the [[internet]]: crowdsourced [[digital gardens]], [[wikis]] and [[social network]] activity as retrieved and integrated using [[free software]].
  
The Agora has multiple facets which we will explore in the following pages:

  - A high level [[protocol]] for information exchange and cooperation, mostly building on conventions already in use in knowledge oriented online communities.
    - #pull [[Agora Protocol]][^agora-protocol]
  - A [[free software]] [[reference implementation]] of an integration platform built on the above, including a set of importers and converters for diverse [[sources]] and [[formats]].
    - #pull [[Agora Server]] [[Agora Bridge]]
  - A [[social graph]] and matching [[knowledge graph]] provisioned and maintained by a community.
    - #pull [[Agora]]
    
The provided [[reference Agora]] is designed to be a minimum viable cooperative platform that integrates and complements [[personal knowledge graphs]] in particular and, more generally, writing, as an expression of [[human thought]].

The reference Agora stands out from other projects in the [[knowledge graph]] space in a few ways: 

  - Whereas links in a personal knowledge graph or wiki usually have a single target (a particular note or page), **Agora links fan out by default**; targets can be thought of [[collections]] of resources. 
  - While a **personal knowledge graph** usually contains resources and links authored or collected by a single person, and a **wiki** usually contains resources provisioned by a group in (a priori) a shared voice, an Agora tries to integrate and interlink both personal and group resources while preserving distinct voices[^chorus].
  - As of the time of writing, some personal knowledge graph tools are exploring collaborative editing in format- and platform-specific ways. In contrast to this, **the reference Agora described in this chapter tries to be tool, format and platform agnostic** to maximize interoperability and data exchange and provide utility to users of many tools and systems. This is achieved by targeting a minimum viable set of cross-tool conventions.
  
- It also covers a work-in-progress reference software implementation built on the above, developed as [[free software]] and run as [[public service]].
  - Its guiding architectural principle being to build as much as possible on already existing conventions common to as many tools and platforms as it is possible with the aim to achieve maximal inclusivity and diversity.
- Finally, we cover potential applications in the [[knowledge]] and [[social]] domains of a federated network built around such conventions and software.
  - This is done in the form of a series of short exploratory essays.

[^agora-protocol]: This block is a demonstration of the text-based protocol that, in an Agora, will result in the entity mentioned being transcluded ("pulled", brought into the current context) after the current resource.
[^chorus]: it is an expression of the [[pattern]] [[chorus of voices]].

### Agora Protocol
This [[section]] describes a [[protocol]] and sets of [[conventions]] and [[contracts]] that can be said to define an Agora. 

- a [[convention]].
	- To communicate with each other with good intent.
	- [[text based]]. 
    - You can use it anywhere you can write down text; no special format requirements.
	- Agora Protocol in a nutshell: https://twitter.com/flancian/status/1437079533253976066
  - [[layer 0]]
    - Based on [[plain text]].
		- An Agora is any virtual space you can define in any way you want as long as it is [[explicit]] and by default [[public]].
			- Each Agora publishes a set of definitions of intention as expressed by its [[users]].
	- [[layer 1]]
    - You can use [[wikilinks]]. This expresses an intention to make use the [[wiki protocol]], of which the Agora is a special case.
		- The reference Agora, in which you are probably reading this, also has some #hashtag support.
			- This Agora is [[rational]], [[pro social]] and [[heterarchical]].
- a [[protocol]].
  - based on lightweight conventions for [[knowledge federation]].
	- [[plain text]] plus wikilinks as layer 0 (bootstrapping layer).
		- indented bulleted lists designate a useful [[heterarchy]].
    - [[wikilinks]] and #hashtags at layer 1, plus other link conventions and metadata extensions.
		- successive layers are explicitly discussed through [[agora rfcs]] and settled through a [[governance layer]] called an [[agora]] and defined by convention.
			- agora protocol payloads may be exchanged for knowledge for [[free]] in any designated [[agora]].
			- this [[agora]] is built around a [[pro social]] [[distributed knowledge graph]], that is, a [[social knowledge graph]].
			- see [[go/agora-slides]] for more.
		- to see the communally maintained text of the full protocol, please refer to the [[stoa]] below.
			- [[stoa]] https://stoa.anagora.org/p/stoa
  - for [[extensions]]:
		- push to or modify [[agora rfcs]].
      - this is as kept by the community agreeing to cooperate on such a list: the community of the [[agora]].
- The Agora network should be built on a federated protocol to limit the negative impact of diasporas. Groups might temporarily diverge in their views enough to want to run separate Agoras, but ideally Agoras should be able to cooperate on problems and solutions for which there is enough ideological alignment, and eventually merge back.
- #pull [[agora protocol]]

## Graph definition 
- Being built around a knowledge graph, an Agora can be defined as a set of vertices or **nodes** `N` (each mapping to an entity in a knowledge base) and **edges** `E` (each mapping to a relationship between entities, annotated by context). 
  - An Agora [[node]] is a collection; it contains the set of all known resources *about* (or *related* to) the entity described by the node id, defaulting to its name as an arbitrary length unicode string. 
    - (But potentially overridden or extended with provided metadata and annotations.)
    - In this paper each such resource attached to node `N` is known as a **subnode** `N_s`. 
  - Note that because links can be annotated by context (as they can be considered to be by nearby #tags and [[wikilinks]]), an Agora graph can be said to be a **hypergraph** [^hypergraph].

[^hypergraph]: "Wolfram likes them."

## Data format
- Layer 0: [[plain text]].
    - Plain text is ubiquituous.
    - It is not only a common standard for all tools in the knowledge space, which simplifies interoperability; it is a common standard for thought as shown by thousands of years of preserved culture.
    - It can trivially encode outlines.
        - It can be made to encode trees, like in this example.
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
    
## Reference implementation
- Here we cover some details of the provided free and open source reference Agora which provides a minimum viable implementation of the [[underlay]], [[interlay]], and [[overlay]] components of a [[distributed knowledge graph]][^kfg].
  - The reference system is based on off-the-shelf components like git and Markdown. 
  - Individual Agora instances, initially provisioned and maintained by like-minded groups but later moving to a fully distributed model, are expected to **federate** and organize into a greater [[Agora network]]. 
  - We describe how this network can integrate with the wider internet ecosystem and how it could be used to run experiments on distributed thought.

[^kfg]: https://www.knowledgefutures.org/

### Architecture
![agora architecture](https://social-coop-media.ams3.cdn.digitaloceanspaces.com/media_attachments/files/108/346/148/636/771/913/original/9ffcfe84fe738daf.jpeg)

- The reference Agora is a simple distributed architecture based on off the shelf components.
  - [[agora root]] is a git repository containing the Agora definition, meaning a base [[contract]] which sets the tone and high level goals of the Agora, and a list of data sources to be recurringly integrated.
  - [[agora bridge]] is a git repository containing connectors and importers for supported data sources.
      - User controlled [[git]] repositories are the default data source.
  - [[agora server]] provides a UI supporting querying and composition and [[json]], [[rss]], [[rdf]] endpoints.
    
### Data model
- Users can contribute [[repositories]] to an Agora.
  - To do so, they publish their resources to a repository they control and then they let an Agora know of their intention to integrate, a desired username and their agreement with an Agora's contract.
  - [[git]] repositories are the default data source, with other repository providers ([[http]], [[ipfs]], [[drive]], [[dropbox]]) to follow.
- Users can contribute individual [[resources]] to an Agora.
  - As of the time of writing they can interact with an Agora system account (i.e. bot) in supported platforms like [[twitter]] and [[mastodon]] while indicating nodes they want to attach to using a Layer 1 convention.
  - (Soon they will be able to submit this information directly on the [[agora server]] provided interface.)

## Applications

### Building meaning best effort
- An Agora supports taxonomies in principle but mostly provides a set of basic tools to converge on meaning best effort through social processes.
  - (cover:
    - [[agora actions]]
    - #push and #pull
    - #go links
    - open source ranking)

### Collaborative world building
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

### Coordination problems
- A working Agora is a [[schelling point]] built around the [[principle of charity]].

### [[Counter anti disintermediation]] through [[adversarial interoperability]]
- An Agora can be used to solve [[coordination problems]] like those we need to solve to enable users to leave walled gardens and protect the [[commons]] against [[enclosure]] by [[anti disintermediating]] parties.
  - An Agora provides tries to provide free [[bridges]] to escape [[walled gardens]] with your friends.
  - An Agora can help people regain and maintain control of their data, including their [[social graphs]].

### Flow problems 
- #pull [[liquid democracy]] [[network flow]]
- We bootstrap a [[Universal Basic Income]] experiment using an Agora with a set of simple rules:
  - If you consider yourself under-privileged, you sign up to receive an income.
  - If you consider yourself over-privileged, you sign up to donate an income.
  - Incomes are recurring donations for a set number of months.
- Optional [[virality rule]]: the person receiving the income should elect to forward e.g. 10% of the sum received to someone less privileged than them.
  - The virality rule both pushes network growth and constructively exploits wealth inequality and asymmetry of information: an under-privileged person is closer in the world to a more severely under-privileged person than the initial donor, so can more efficiently allocate the resources. This also empowers under-privileged people to also make ethical decisions.

## Thanks

To [[Flancia Collective]], [[Agora Discuss]] and the [[Fellowship of the Link]] for discussion and inspiration. 

To my [[friends]] for their support.
