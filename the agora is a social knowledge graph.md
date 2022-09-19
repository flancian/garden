- an [[agora abstract]].
	- #push [[agora abstracts]]
		- #pull [[social knowledge graph]] [[distributed knowledge graph]]
		- An Agora is a [[distributed knowledge graph]] provisioned and maintained by a community as a [[commons]].
			- The Agora can be said to be a [[social knowledge graph]] as it is a [[distributed knowledge graph]] produced in a social context and containing social information.
			- Whereas a [[personal knowledge graph]] usually contains resources authored or collected by a single person, and a wiki usually contains resources produced by a group, an Agora contains and integrates both personal and group resources.
			- Whereas a [[personal knowledge graph]] is usually maintained using a single [[personal knowledge management]] tool and stored in a single format, an Agora tends to be tool and format agnostic, trying to provide and follow the most general conventions.
		- Being a [[graph]], an Agora can be defined as a set of vertexes or [[nodes]] `N` (entities) and [[edges]] `E` (known links between entities, optionally annotated).
			- Agora [[nodes]] are defined by the set of known resources *about* the entity described by their title or other metadata.
				- A [[node]] is a community-maintained [[collection]] of voice-preserving individual [[subnodes]] defined by the resources contributed by a certain user or group.
			- Because links between two nodes in an Agora can be [[annotated]] (i.e. #tagged or qualified by other nearby links) and have multiplicity, the Agora is in fact a [[hypergraph]].
			- Individual agoras are expected to federate and organize into greater Agora networks, which are in themselves graph-like at a higher level.
		- On a system level, there exists a [[free]] and [[open source]] [[reference Agora]] that provides a minimum viable implementation for the [[underlay]], [[interlay]], [[overlay]] components of the [[distributed knowledge graph]].
			- In the reference Agora, links can be said to [[fan out]] by default in the sense that they are evaluated in social context in individual contributions (resulting in following a link sometimes surfacing more than what the individual author envisioned.)
			- We are using said reference Agora to refine the proposed system and run experiments.
			- Some hypotheses that we are testing:
				- Individual contributions can be made maximally useful to others on average when served best-effort in a social context at the only cost of adopting a default social stance (at little extra effort over baseline), and this mechanism benefits from network effects.
				- A [[knowledge commons]] model can provide utility to participating communities efficiently, as the cost of systemic integrations with a hub design such as the Agora can scale with `O(N)` instead of the `O(N^2)` provided by a naive full mesh.
				- Best effort social [[composition]] and [[integration]] of notes might be sufficient to surface yield higher level meaning and order, or at least significantly complement both taxonomic approaches (hierarchical) and individual-scoped eventual convergence (non hierarchical).
					- A composition of personal [[hierarchies]] yields a social [[heterarchy]].
					- The social context afforded by an Agora provides a path towards faster eventual convergence (that is, `K` people contributing to `N` nodes as categorized using loose or implicit personal ontologies can converge on useful emergent categories as `K` increases, at low individual effort).
				- Going from a set of voice-preserving [[individual contributions]] to a shared [[group resource]] might be an efficient way to foster opportunistic collaboration at scale.