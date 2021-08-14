# async search

- search currently happens in every node, and it's full text search. this is very costly, I knew when adding it but it was just too convenient.
- today on [[2021-08-14]] I'll try to fix this by making search be an async action: search only triggers when users reach the bottom of the page or request searching explicitly.
  - this will have the nice side effect of making the agora cheap by default when servicing bot requests, which probably won't run the javascript that is needed to retrieve search.

