# agora twitter bug

- [[s5bug]] dups are still around:
  - https://twitter.com/Fish_CTO/status/1438971471448064001
- exception
```
  File "./agora-bot.py", line 137, in get_conversation_id                                                    │·······
    return resp.json()['data'][0]['conversation_id']                                                         │·······
KeyError: 'data'                 
```