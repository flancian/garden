---
description: "Your daily note template"
tags: template
hooks.newPage:
  suggestedName: "{{today}}"
  #suggestedName: "journal/{{today}}"
  #suggestedName: "Journal/Day/{{today}}"
  confirmName: false
  openIfExists: true
  # forPrefix: "Journal/Day/"
  command: "Open Daily Note"
  key: "Alt-Shift-d"
---
# {{today}}
* |^|