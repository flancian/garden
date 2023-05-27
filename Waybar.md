- a [[project]].
  - #go https://github.com/Alexays/Waybar

```
>  sudo apt install \
  clang-tidy \
  gobject-introspection \
  libdbusmenu-gtk3-dev \
  libevdev-dev \
  libfmt-dev \
  libgirepository1.0-dev \
  libgtk-3-dev \
  libgtkmm-3.0-dev \
  libinput-dev \
  libjsoncpp-dev \
  libmpdclient-dev \
  libnl-3-dev \
  libnl-genl-3-dev \
  libpulse-dev \
  libsigc++-2.0-dev \
  libspdlog-dev \
  libwayland-dev \
  scdoc \
  upower \
  libxkbregistry-dev
```

Then compile:

```
>  $ git clone https://github.com/Alexays/Waybar
$ cd Waybar
$ meson build
$ ninja -C build
$ ./build/waybar
# If you want to install it
$ ninja -C build install
$ waybar
```
