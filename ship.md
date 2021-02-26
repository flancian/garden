# Ship

- A small [[script]]. I have it in bin/ship (~/bin is in my $PATH).
```
#!/bin/sh -x
git add -A
git commit -a -m "$*" || git commit -a -m "Default commit message."
git push
```


