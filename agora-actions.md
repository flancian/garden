# Agora Actions

- a [[project]]
  - The Agora can trigger actions in the context of a node when said node includes a block with a [[wikilink]] representing an [[intention]] to execute an [[intent]]. Those intents include [[actions]]. 
  - If you tell an [[agora]] where your data is, and what you want to do with it, it'll will do it for you if it can. If it can't, it'll keep a record of the request and fulfill it once it's tractable.
  - Currently supported actions are:
    - *go*, which makes [[go node]] (anagora.org/go/<node>) redirect to the url appearing after the action. Example follows.
      - [[go]] https://twitter.com/flancian/status/1329890862499770368
      - <https://anagora.org/go/agora-actions> now redirects to the tweet above.
      - See also [[composite-go-links]].
      - If you trigger it by writing on social media or another remote control surface, the [[agora]] will link the resulting resource.
    - *pull*, which transcludes a target node into the current context (good for synonyms and related content).
      - [[pull]] [[agora action]]
      - (see below for effect)
    - *push*, which transcludes the current *block* and any children to the target node. 
      - [[push]] [[2021-01-25]] 
        - I first documented *push* in this node on that day.
        - See [[2021-01-25]] for effect.
  - See also:
    - [[push and pull]] for interactions between those two actions.
    - [[agora plan]] for plans on further actions.

https://twitter.com/flancian/status/1383438976283856900