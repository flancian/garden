# agora ranking

- As of [[2021-11-06]] Agora ranking is essentially non-existent except for
  - 1. a hack in [[agora.py]] which upranks users [[@agora]], [[@flancian]], [[@vera]], [[@neil]] in that order -- essentially admins in order of entry. This was hotfixed in when some long content that didn't render well (due to garden conversion issues) grabbed top position in interesting nodes. It's not a stable setup and I don't like that this kind of list could grow into a fixed hierarchy.
  - 2. client-side, as implemented by [[vera]] -- see, in the same node handler in [[agora.py]], the /uprank/ functionality. This is called by client side code for sorting.
- I think we should start working on actual better ranking.
  - One simple alternative would be to introduce upvotes/emoji reactions in the interface, and store those either in git (as a reaction log) or in, say, sqlite. This could be treated as 'volatile' data -- treating all data not derivable from the [[agora]] main repo transitively as volatile seems like a good design decision to me.
  - Another alternative would be to support explicit upranking *within nodes*. So, for example, if I write [[uprank]] [[@neil]] in [[flaneur]], the Agora would render Neil's node above mine.