- a [[bridge]].
  - [[bluesky]] [[fediverse]]
  - #go https://fietkau.software/pinhole

Trying this out on [[2023-12-25]] :) I got it to run in dev mode as such:

```
>  git clone git clone https://fietkau.software/Pinhole.git
>  cd Pinhole
>  poetry init
>  poetry add pycryptodome flask requests
>  poetry run pinhole.py
```

Now considering whether I take the step to set up nginx to serve this in a way 'readable' to ActivityPub ecosystem as per instructions in [[go/pinhole]] :)
