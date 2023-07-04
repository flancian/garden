- a [[ritual]].
  - part of [[Festivus]].

Some out-of-season [[airing of grievances]], in no particular order:

## [[Flatpak]]

Flatpak sucks, yet is somehow also the best known (to me) solution to the problem of shipping apps in a platform/distribution agnostic way as of the time of writing ([[2023]]). [[Snap]] is clearly worse. How can this be?

Why, WHY, am I able to `flatpak search chromium` and even `flatpak install chromium` but (I kid you not) I need to write `flatpak run org.chromium.Chromium` to actually run the package?

Oh, it's because the developers refuse to accept patches to implement short forms for the run subcommand specifically. In practice this means ~millions of people around the world are maintaining independent collections of shoddy one-liners or aliases to make flatpak command invocations sane again.

