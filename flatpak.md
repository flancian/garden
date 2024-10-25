- a [[tool]].
  - [[packaging system]] [[distribution independent]]
  - [[pet peeves]]
    - It is frustrating to me you can search by name, e.g. `flatpak search projectm`, *and* install by name, e.g. `flatpak install projectm`, but *you can't run by short name*, that is, `flatpak run projectm` doesn't work.
      - This is made worse by the fact that `flatpak search projectm` may or may *not* show you the fully qualified name for the package; if your terminal is wide enough it will, but otherwise it will very unhelpfully take up a lot of the line to describe the package but mangle the fully qualifier identifier (what you need to pass to `flatpak run`) with an ellipsis.
      - I don't know of a good way to work around this currently. It seems like adding a `flatpak easyrun` command would be low hanging fruit? Just run the installed app that matches the search term, if there's exactly one?
    - By default flatpak apps are heavily sandboxed to the point they can't access files in your home directory.
      - That's... alright I guess if you care about security that much, but a bit of an unfriendly/unexpected user experience. It made me feel I was using a phone and not a "proper" computer I control.
      - Thankfully this led me to discover [[flatseal]], which is actually a great UI to manage sandbox permissions of all kinds per-app. I flipped the right access, restarted projectm, and I was able to load presents from my home directory :)

--

Oh, dear Flatpak:

How many times do I have to tell you yes when you ask for every operation? Just make it so if you can, and go beta channel by default.

Thank you for your services in any case :)
