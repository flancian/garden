- `for i in \*-\*md; do git mv $i "$(echo $i | sed -e 's/-/ /g')"; done`

https://social.coop/@flancian/106195626746291723