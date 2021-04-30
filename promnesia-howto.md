# promnesia howto

- a [[howto]] for [[promnesia]].

In this howto I'll try to document my experience getting Promnesia from zero to fully up and running and integrated with my [[personal knowledge management]] system and the [[agora]].

From [[go/promnesia/git]]:

"[[Promnesia]] is a [[browser extension]] for Chrome and Firefox which serves as a web surfing copilot, enhancing your browsing history and web exploration experience"

I would myself qualify this a bit and say that Promnesia is a tool with several legs, one of which is the browser extension; to get the full benefits, you also need to install a local process in your machine (a "backend"). In any case, let's begin:

1. Install the browser extension component.
  - Currently supported are [Firefox](https://addons.mozilla.org/en-US/firefox/addon/promnesia/ and [Chrome](https://chrome.google.com/webstore/detail/promnesia/kdmegllpofldcpaclldkopnnjjljoiio). Choose one :) I use Firefox.
2. Install the local process.
  - On Linux, type in your terminal: ```pip3 install --user promnesia bs4 lxml mistletoe logzero```. If pip3 is not found, please refer to [[pip]] to install it.
  - On OSX: should be the same.
  - On Windows: unsure. I have a Windows install so I might give it a try soon and report back; [[let me know]] if you are interested and I'll prioritize this.
