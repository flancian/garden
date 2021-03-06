# Agora Search

https://twitter.com/flancian/status/1399779789368664065

- The [[agora]] is in essence equivalent to a [[distributed]] [[wiki]]. 
  - Note you could theoretically use a wiki to [[crowdsource]] search results; in the limit, think of having a wiki page for every likely user query.
  - Perhaps [[agora search]] tries to find a good match for your query locally and redirects to other agoras in the network or to [[google]] or [[duckduckgo]] if a good local result isn't available. 
    - When it volunteers something, it also offers to continue your query in the search authority of your choice.
  - [[push and pull]] could be used to offer hints for how to route queries to relevant results.
- The [[agora]] can already be used as a [[search engine]].
  - To do so, you can use the following URL template in your browser of choice: ```https://anagora.org/search?q=%s```
    - Searching this way behaves the same way as searching using the text box always at the top of this [[agora]].
  - As of [[2021-02-27]], you can also just use [[open search]] to add the [[agora]] as a search engine; this works at least on [[firefox]]. You should be able to see the agora as an available search engine to add in the search box.
  - The [[agora]] will try to serve any relevant nodes for your queries -- useful for when you have notes on the topic you're searching for.
    - In every case, the [[agora]] will try to make it easy for you to 'click through' and continue your search elsewhere -- in established search engines or the websites of your choice.
- Agora Search is [[crowdsourced search]] for the [[open]] [[internet]].
- [[user story]] https://twitter.com/flancian/status/1350835941603221504
- [[keywords]] https://twitter.com/flancian/status/1352671899583713288
- [[pull]] [[crowdsourced search]]
- This [[agora]] tries to search all [[agoras]], and also the internet as it manifests an [[intent to cooperate]].
    - See [[stoa]].
  - You can use [[open search]] to add it to your browser while you're visiting it.
  - You can have it as default search engine, like I sometimes do, or you can associate it with a prefix. I use 'a' and 'an'. Like in 'an entity'. 
- [[2021-02-27]]
  - Hooking up with [[yubnub]] seems like a good idea.
  - Working on general [[usability]] in parallel.

## Design
- In [[agora server]], `/search` / `/exec` does the following:
  - It takes a query string in argument 'q' (sort of standard).
  - It optionally tokenizes the query string (unsure if this is the right stage for tokenizing, or tokenization should be done ad-hoc by search providers to allow for domain-specific tweaks).
  - It offers the query string or the tokens to [[search providers]], essentially hooks that volunteer [[actions]] or [[results]] -- perhaps as bids in a distributed system modelled as a market (later).
  - It scores the alternatives and either chooses one for the user (based on programmable rules) or presents them as alternatives.
  - The default action is 'redirect to the agora node matching/encoding the query'.
  - Also supported currently: 
    - [[go]], which redirects immediately to a go link if present in the parameter node or a [[combination]].

https://merveilles.town/web/statuses/105997152161798151
https://twitter.com/flancian/status/1379495094001238026

