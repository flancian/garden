- an [[error]].
  - in [[git]]
  - [[fatal]]

I get this a lot when trying to merge repositories with different histories -- which of course shouldn't happen often, but does happen to me when I'm trying to [[bootstrap]] a new repository.

Case in point: writing the README first when creating the repository in [[gitlab]] or [[github]] makes sense to me, as it's checking a checkbox and editing. And uploading a set of bootstrapping files then makes sense as a second step to me -- but that is ideally done right at the place files live, and once there it's easy to just say `git init`. But then if you want to merge the two you get into problems as [[git]] doesn't merge unrelated histories by default.

- #go https://stackoverflow.com/questions/39761024/refusing-to-merge-unrelated-histories-failure-while-pulling-to-recovered-repos/39783462#39783462

This [[stack overflow]] answer contains the flag you need: `--allow-unrelated-histories`. I guess [[git]] doesn't include it in the error message to prevent people from just tacking it on without knowing what they are doing (just to make the error go away) and having a mess as a result. It only makes sense if not surprising: that is, if you are trying to merge two unrelated repositories.

```
flancian@paramita:~/.local/share/chezmoi$ git pull origin main --allow-unrelated-histories
From gitlab.com:flancian/flancian
 * branch            main       -> FETCH_HEAD
hint: Pulling without specifying how to reconcile divergent branches is
hint: discouraged. You can squelch this message by running one of the following
hint: commands sometime before your next pull:
hint: 
hint:   git config pull.rebase false  # merge (the default strategy)
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
Merge made by the 'recursive' strategy.
 README.md                 | 35 +++++++++++++++++++++++++++++++++++
 social/mastodon/README.md |  1 +
 social/twitter/README.md  |  1 +
 social/twitter/apikey.asc | 21 +++++++++++++++++++++
 4 files changed, 58 insertions(+)
 create mode 100644 README.md
 create mode 100644 social/mastodon/README.md
 create mode 100644 social/twitter/README.md
 create mode 100644 social/twitter/apikey.asc
flancian@paramita:~/.local/share/chezmoi$ 
```
