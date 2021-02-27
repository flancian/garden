# Chrome Remote Desktop

- To make it use an existing session instead of a new X session on connect, follow https://researchxuyc.wordpress.com/2014/07/30/to-show-the-same-display-session-in-ubuntu-by-chrome-remote-desktop/.
  - Edit /opt/google/chrome-remote-desktop/chrome-remote-desktop
  - DEFAULT_SIZE="1920x1080"
  - FIRST_X_DISPLAY_NUMBER = 0
  - Fix get_unused_display_number() to just return that.
  - Change launch_session(...) to the following
```
  def launch_session(self, x_args):
    self._init_child_env()
    self._setup_pulseaudio()
    self._setup_gnubby()
    display = self.get_unused_display_number()
    self.child_env["DISPLAY"] = ":%d" % display
```

