# Force Graph

- a [[library]]
  - [[javascript]] [[d3]]
  - [[wp]] https://en.wikipedia.org/wiki/Force-directed_graph_drawing
  - [[go]] https://github.com/vasturiano/force-graph
    - [[graph drawing library]] in use by [[logseq]]: https://twitter.com/logseq/status/1322933174964428801
  - I think it makes sense. Seems reasonable fast at the high-thousand-nodes level; the agora is currently at 10k. And most of the visualizations I want to do are actually node-scoped plus links, so really just an issue for hugely outlier nodes degree wise (like [[person]] or [[go]]).
  - Unfortunately it doesn't seem to provide labels for edges?
    - False, it does: https://vasturiano.github.io/force-graph/example/text-links/
  - Data format, JSON:

```
{
    "nodes": [
        {
          "id": "id1",
          "name": "name1",
          "val": 1
        },
        {
          "id": "id2",
          "name": "name2",
          "val": 10
        },
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        (...)
    ]
}
```




