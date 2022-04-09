- To go from spaces to tabs in Python code:
	- `for i in *py; do unexpand -t 4 $i | sponge $i; done`
		- [[sponge]] is in [[moreutils]]
- To go from tabs to spaces in Python code:
	- `for i in *py; do expand -t 4 $i | sponge $i; done`
- [[pep8]] is against tabs in Python code. We are currently experimenting with using tabs in [[agora server]] regardless.
	- In .vimrc you might need to add:
		- ```" work around python filetype's insistence that tabs are 8 spaces wide
		  let g:python_recommended_style = 0
		  filetype plugin indent on
		  syntax on
		  set tabstop=4
		  ```