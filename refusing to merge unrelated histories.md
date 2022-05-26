- an [[error]].
  - in [[git]]
  - [[fatal]]

I get this a lot when trying to merge repositories with different histories -- which of course shouldn't happen often, but does happen to me when I'm trying to [[bootstrap]] a new repository.

Case in point: writing the README first when creating the repository in [[gitlab]] or [[github]] makes sense to me, as it's checking a checkbox and editing. And uploading a set of bootstrapping files then makes sense as a second step to me -- but that is ideally done right at the place files live, and once there it's easy to just say `git init`. But then if you want to merge the two you get into problems as [[git]] doesn't merge unrelated histories by default.

- #go https://stackoverflow.com/questions/39761024/refusing-to-merge-unrelated-histories-failure-while-pulling-to-recovered-repos/39783462#39783462

This [[stack overflow]] answer contains the flag you need: `--allow-unrelated-histories`.
