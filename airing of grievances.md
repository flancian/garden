- a [[ritual]].
  - part of [[Festivus]].

Some out-of-season [[airing of grievances]], in no particular order:

## [[Flatpak]]

Flatpak sucks, yet is somehow also the best known (to me) solution to the problem of shipping apps in a platform/distribution agnostic way as of the time of writing ([[2023]]). [[Snap]] is clearly worse. How can this be?

Why, WHY, am I able to `flatpak search chromium` and even `flatpak install chromium` but (I kid you not) I need to write `flatpak run org.chromium.Chromium` to actually run the package?

Oh, it's because the developers refuse to accept patches to implement short forms for the run subcommand specifically. In practice this means ~millions of people around the world are maintaining independent collections of shoddy one-liners or aliases to make flatpak command invocations sane again.

Also, if you run `flatpak search` in a narrow terminal it will helpfully elide the full application ID, so flatpak search cannot even be depended on to retrieve the right incantation consistently. WHY.

## [[Systemd]]

I love Systemd; I remember curating SysV Init scripts and I think the process of writing Systemd services is much improved. Having said that :)

Why is it so hard to just make sure a service will actually start and keep retrying forever if it can't start? There are several incantations in the configuration spec that *seem* like they should achieve indefinite retries, but really don't (or do only in some cases). I understand why you'd want to have something like a sane retry policy (with backoff), but I really would like to tell it: just keep trying for me. Under no situation it seems reasonable for me to find a service marked as `inactive (dead)`, run start on it and have it work flawlessly. The computer should have done that for me.

Also, why 
