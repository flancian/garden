# async search

- search currently happens in every node by default, and it's full text (regex even) search. this is very costly, I knew when adding it but it was just too convenient and useful to have it :)
- today on [[2021-08-14]] I'll try to fix this by making search be an async action: search only triggers when users reach the bottom of the page or request searching explicitly.
  - this will have the nice side effect of making the agora cheap by default when servicing bot requests, which probably won't run the javascript that is needed to retrieve search.
- initial testing with `ab` (I know, old school)
  - `ab -n 100 -c 10 https://1.anagora.org/index`
    - ~10 seconds overall, 50% ~0.6 seconds, 99% ~2 seconds
  - on localhost (dev instance) the 99% goes up to 50-60 seconds, there are clear hangs.
  - [[before and after cache]]
- testing after disabling full text search:
  - on localhost (dev instance) the 99% goes down to 3-6s (!). as expected, but nice to see.
- this didn't end up being enough to fix significant spikes of latency in high percentiles, so added [[uwsgi caching]] also.
  - see [[before and after cache]]

