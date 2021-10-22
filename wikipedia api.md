# wikipedia api

- [[mediawiki]]
  - [[search]] https://www.mediawiki.org/wiki/API:Search
- [[example]] 
  - search for pages using free form text
    - [[query]] https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=popper
      - returns a query -> search array, of which the first item is high quality. ranking can be customized with parameters. the item contain a pageid, in this case 16623 for the page for Karl Popper.
  - retrieve URL for the pageid in question and additional external resources, extlinks
    - [[query]] https://en.wikipedia.org/w/api.php?action=query&pageids=16623&prop=extlinks|info&inprop=url

