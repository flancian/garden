# agora graph

I want to graph both the agora as a whole and the context of a node in the agora, as per [[agora ui]]. This requires:

0. create a branch. Done: 'branch'.
1. decide whether to
   1. hardcode a path, say /agora-graph, to be a handler specialized in this. Probably the quickest, but it doesn't show the "agora spirit" as much.
   2. use runnable subnodes; essentially implement [[run]] or [[exec]] plus
      1. [[javascript subnodes]]
      2. [[python subnodes]]
   3. do [[rdf]] first: expose rdf for the agora and use something like [[rdf grapher]] to graph

