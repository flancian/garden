# agora graph

- a [[thing]].
  - [[distributed knowledge graph]].
  - The heart of an [[Agora commons]].
- a [[project]].
  - I want to graph both the Agora as a whole and the context of a node in the agora, as per [[agora ui]]. This requires:
  - create a branch. Done: 'graph'.
  - decide whether to
   - hardcode a path, say /agora-graph, to be a handler specialized in this. Probably the quickest, but it doesn't show the "agora spirit" as much.
   - use runnable subnodes; essentially implement [[run]] or [[exec]] plus
      - [[javascript subnodes]]
      - [[python subnodes]]
   - do [[rdf]] first: expose rdf for the agora and use something like [[rdf grapher]] to graph
    - I did this in the end

