- a [[project]].
  - [[python]] [[dependency management]] [[environment management]]
  - `poetry add` is like pip3 install in the virtualenv followed by pip3 freeze, etc.
  - [[install]] https://python-poetry.org/docs/#installation

To get started (this comes from the [[agora server]] README / https://python-poetry.org/docs/#installation:

```
curl -sSL https://install.python-poetry.org | python3 -
```



```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3 -
source $HOME/.poetry/env`
poetry install  # or add if you're in a new project?
```

Gets installed to `$HOME/.local/bin/poetry` on Linux.
