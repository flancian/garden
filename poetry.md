- a [[project]].
  - [[python]] [[dependency management]] [[environment management]]
  - `poetry add` is like pip3 install in the virtualenv followed by pip3 freeze, etc.
  - [[install]] https://python-poetry.org/docs/#installation

To get started (this comes from the [[agora server]] README / https://python-poetry.org/docs/#installation:


```
curl -sSL https://install.python-poetry.org | python3 -
poetry install  # or add if you're in a new project?
```

It gets installed to `$HOME/.local/bin/poetry` on Linux (useful if you don't have .local/bin in your $PATH).
