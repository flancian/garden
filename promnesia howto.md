# promnesia howto

- a [[howto]] for [[promnesia]].

In this howto I'll try to document my experience getting Promnesia from zero to fully up and running and integrated with my [[personal knowledge management]] system and the [[agora]].

From [[go/promnesia/git]], which I will be following in this procedure:

"[[Promnesia]] is a [[browser extension]] for Chrome and Firefox which serves as a web surfing copilot, enhancing your browsing history and web exploration experience"

I would myself qualify this a bit and say that Promnesia is a tool with several legs, one of which is the browser extension; to get the full benefits, you also need to install a local process in your machine (a "backend"). In any case, let's begin:

- Install the *browser extension* component.
  - Currently supported are [Firefox](https://addons.mozilla.org/en-US/firefox/addon/promnesia/) and [Chrome](https://chrome.google.com/webstore/detail/promnesia/kdmegllpofldcpaclldkopnnjjljoiio). Choose one :) I use Firefox.
- Install the *local process*.
  - On Linux, type in your terminal: ```pip3 install --user promnesia bs4 lxml mistletoe logzero```. If pip3 is not found, please refer to [[pip]] to install it.
  - On OSX: should be the same.
  - On Windows: unsure. I have a Windows install so I might give it a try soon and report back; [[let me know]] if you are interested and I'll prioritize this.
- Configure the local process.
  - `promnesia config` to seed a config in `.config/promnesia/config.py`
  - Edit to your liking. Refer to [[promnesia config]] for examples.
  - You can install additional sources by referring to [[promnesia sources]].
- Configure the periodic indexer. This means adding a [[cronjob]] that runs `promnesia index`. I run mine every 10 minutes.
  - `crontab -e` and add the following
  - `*/10 * * * * ~/.local/bin/promnesia index >/tmp/promnesia-index-stdout.log 2>/tmp/promnesia-index-stderr.log`
- Start the local process.
  - `promnesia serve`
  - Note that the indexer must have run at least once for this to work; run it manually once if in doubt (`promnesia index`).
- Make the local process sticky across reboots.
  - `promnesia install-server`
- Enjoy!

## Thoughts / asides:

- *love* the pip3 based install. *love* `promnesia install-server` to set up systemctl!
- It might be good to just make optional dependencies default, so that `pip3 install --user promnesia` suffices?
- I got this exception when trying to run promnesia after updating my config:
  - `AssertionError: /home/flancian/.local/share/promnesia/promnesia.sqlite`
  - It was because I had forgotten to run the indexer :) The documentation does say to bring up the indexer first though, my bad.
- Merging `auto` and `guess` in the config does sound like a good idea (as per the comment in the [[promnesia config]]).
- `promnesia index` mostly works, yields 8601 visits but 7 errors:

```[ERROR   2021-04-30 14:14:26 promnesia __main__.py:99] 7 errors, printing them out:
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:101]     'RuntimeError' object has no attribute 'norm_url'
[ERROR   2021-04-30 14:14:26 promnesia __main__.py:102] 7 errors, exit code 1
```

Unsure how to debug further except going in and adding more logging in `__main__.py`.

