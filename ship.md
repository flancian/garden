# Ship

- ```cat bin/ship```
```
#!/bin/sh -x
git add -A
git commit -a -m "$*" || git commit -a -m "Default commit message."
git push
```


