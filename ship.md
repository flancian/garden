# Ship

- A small [[script]]. 
```
#!/bin/sh -x
git add -A
git commit -a -m "$*" || git commit -a -m "Default commit message."
git push
```

- I have mine in bin/git-ship; ~/bin is in my $PATH, so '[[git ship]]' also works.


