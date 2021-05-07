# Fix 500s

- [x] catch subnode read errors
- [x] log errors when they happen
- [ ] log more
- [ ] force graph refresh if inconsistent?
- [x] try other cache setups
  - TLDR: cachetools.func seems to be much faster than Flask's built in SimpleCache, and even than Redis.
  - This might have something to do with the fact that I'm caching the graph as a monolithic entity, and it's already 50MB of data. That's a lot to copy/transfer over a socket.

