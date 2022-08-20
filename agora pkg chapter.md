- a [[paper]].
  - #push As of [[2022-07-24]] being produced as the draft for a [[pkg book]] [[chapter]].
    - Very much looking forward to the book because of others' contributions!
    - See other chapters in https://personalknowledgegraphs.com/#/page/Personal%20Knowledge%20Graphs.
  - This chapter is about the [[Agora]] in general, and about [[an agora]] in particular, and what we could do with them together.
  - Working title: "The Agora is a Distributed Knowledge Graph and Protocol".
    - Original title (for the abstract): "The Agora is a Social Knowledge Graph".
    - Subtitle: Toward a [[Knowledge Commons]].
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
  - (If you don't like this [[Agora]], that's fine -- consider improving it!)
        
# Introduction

In this [[chapter]] we describe an **Agora**, a [[knowledge commons]] provisioned and maintained by a self-governing community for [[public good]]. 

This [[commons]] is built around a [[knowledge graph]] bootstrapped on a well-defined subset of the [[internet]]: crowdsourced [[digital gardens]], [[wikis]] and [[social feeds]] generalizing to arbitrary repositories, all retrieved and integrated using [[free software]], but produced with whichever tools users choose to use.

The Agora as described here is just [[an Agora]], meaning it is just a possible implementation of the principles delineated in this chapter. Other Agoras may exist (and, indeed, arguably already exist -- if not by name, in spirit.)
  
An Agora has multiple facets which we will try to explore in this article:

  - A high level [[protocol]] for information exchange and cooperation, mostly building on conventions already in use in knowledge oriented online communities.
    - #pull [[Agora Protocol]][^protocol]
  - A [[free software]] [[reference implementation]] of an integration platform built on the above, including a set of importers and converters for diverse [[sources]] and [[formats]].
    - #pull [[Agora Server]] [[Agora Bridge]]
    - The provided [[reference Agora]] is designed to be a minimum viable cooperative platform that integrates and complements [[personal knowledge graphs]] in particular and, more generally, any writing done with a [[social stance]].
  - A free [[knowledge graph]] provisioned and maintained by a community.
    - #pull [[Agora]]
    
We then cover potential applications in the [[knowledge]] and [[social]] domains of a federated network built around such conventions and software. This is done in the form of a series of short exploratory essays.

[^chorus]: it is an expression of the [[pattern]] [[chorus of voices]].
[^protocol]: This section serves as a demonstration of a text-based action intent which, in an Agora, will result in the entity mentioned above being transcluded ("pulled", brought into the current context).

# Background
The Agora can be defined in a nutshell as a platform and protocol for provisioning and maintaining a knowledge commons.

#pull [[elinor ostrom]] [[commons]] [[knowledge commons]] 

It is inspired by the work of [[tools for thinking]] pioneers.

#pull [[vannevar bush]] [[memex]] 
#pull [[douglas engelbart]]

It builds on top of the open web, wiki culture and the social movements enabled by them.

#pull [[tim berners lee]] [[solid]] 
#pull [[ward cunningham]] [[wiki]] [[fedwiki]]
#pull [[web]] [[wikis]] [[social media]]

It is also a project with a pragmatic bent directed towards world improvement and the planning and peaceful enactment of global reform and revolution.

#pull [[effective altruism]] [[murray bookchin]]

# Vision
This section details goals and values as they relate to the definition of an Agora on a high level.

The Agora is an overlay and an interlay.

You don't sign up to an Agora. You sign in.

# Applications
This section explores possible further applications in the social and knowledge spaces in the form of a series of short essays.

## Building meaning best effort
- An Agora supports taxonomies in principle but mostly provides a set of basic tools to converge on meaning best effort through social processes.
  - #pull [[agora actions]]
  - #pull [[push]] [[pull]]
  - #pull [[go links]]
  - (Details on open source ranking algorithms based on the above go here.)

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

## Solving coordination problems
- A working Agora is a [[schelling point]] built around the [[principle of charity]].
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

# Technical specifications

## Agora Protocol

This section describes a [[protocol]] based on a set of [[conventions]] that can be said to define an Agora. 

An Agora is any public space that defines itself as such and follows an explicit variation of this Agora Protocol. Individual Agora instances, initially provisioned and maintained by like-minded groups in a decentralized model but later likely moving to a fully distributed model, are expected to **federate** and organize into a greater [[Agora network]].

The Agora network is built on a federated protocol to limit the harmfulness of forks. Groups might temporarily diverge in their views enough to want to run separate Agoras, but ideally Agoras should be able to cooperate on problems and solutions for which there is enough ideological alignment, and eventually merge back best effort.

You probably know Agora Protocol before learning about it: it is meant to reflect and enrich already existing practices in the personal knowledge management space.

- #push [[agora protocol]]
  - a [[protocol]].
    - Based on lightweight conventions for [[knowledge federation]] and the [[data formats]] described below.
    - [[plain text]] as layer 0 (bootstrapping layer).
      - This section is an example of [[agora protocol]].
      - Collections of indented bulleted lists are sufficient to designate a [[heterarchy]].
    - [[wikilinks]] and #hashtags in layer 1, plus other link conventions and metadata extensions.
    - For [[extensions]] to this core protocol:
      - Push your proposals to node [[agora rfcs]].
      - Other layers are discussed there and settled through a [[governance layer]] defined by each [[agora]].

We describe later how an Agora can integrate with the wider internet ecosystem and how it could be used to run experiments on distributed thought.

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
  - Its guiding architectural principle being to build as much as possible on already existing conventions common to as many tools and platforms as it is possible with the aim to achieve maximal inclusivity and diversity.
- Here we cover some details of the provided free and open source reference Agora which provides a minimum viable implementation of the [[underlay]], [[interlay]], and [[overlay]] components of a [[distributed knowledge graph]][^kfg].
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
    
### Data model
- Users can contribute [[repositories]] to an Agora.
  - To do so, they publish their resources to a repository they control and then they let an Agora know of their intention to integrate, a desired username and their agreement with an Agora's contract.
  - [[git]] repositories are the default data source, with other repository providers ([[http]], [[ipfs]], [[drive]], [[dropbox]]) to follow.
- Users can contribute individual [[resources]] to an Agora.
  - As of the time of writing they can interact with an Agora system account (i.e. bot) in supported platforms like [[twitter]] and [[mastodon]] while indicating nodes they want to attach to using a Layer 1 convention.
  - (Soon they will be able to submit this information directly on the [[agora server]] provided interface.)

# Thanks

To [[Flancia Collective]], [[Agora Discuss]] and the [[Fellowship of the Link]] for discussion and inspiration. 

To my [[friends]] for their ongoing support.
