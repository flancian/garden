# Ipfs

- a [[project]]
  - [[by]] [[juan benet]]
    - [[protocol labs]]
- [[do]] look into it, think of possible applications. It seems like a natural fit for the [[agora]].
  - Think of the [[mvp]] here.
- [[armengolaltayo]] was using it for his project.
- [[elopio]] is a developer.
- [[go]] https://en.wikipedia.org/wiki/InterPlanetary_File_System
- [[gateways]]  https://dweb-primer.ipfs.io/classical-web/public-gateways
  - If you're using the hash of a specific snapshot of content, use the path https://ipfs.io/ipfs/<your-ipfs-hash>. 
  - If you're using an IPNS hash to get the latest version of some content, use the path https://ipfs.io/ipns/<your-ipns-hash>
- After installing ipfs in a server, disable scanning of local addresses or your server might be blocked by your provider:
  - https://github.com/ipfs/go-ipfs/issues/4343
    - ```ipfs config profile apply server```


