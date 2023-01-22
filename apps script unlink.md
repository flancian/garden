- a [[script]].
  - removes/changes links in Docs programmatically.

```
function unlinkWikilinks() {
  var document = DocumentApp.getActiveDocument();
  var wikilink_re = '\\[\\[(.*)?\\]\\]';
  var body = document.getBody();
  var text = body.editAsText()
  text.appendText('\nTesting, wikilink dump follows.')

  var wikilink = text.findText(wikilink_re);

  while (wikilink != null) {
    //body.appendParagraph(wikilink.getElement().asText().getText());
    var el = wikilink.getElement();
    if (el.isPartial) {
      console.log("Found partial element.")
      console.log(el.asText().getText()[el.getStartOffset(), el.getEndOffsetInclusive()]);
    }
    else {
      // console.log("Found absolute element.")
            console.log(el.asText().getText());
    }
    wikilink = text.findText(wikilink_re, wikilink);
  }

}

// What a pain in the ass!
// ...but it worked :)
// From https://stackoverflow.com/questions/18727341/get-all-links-in-a-document
/**
 * Get an array of all LinkUrls in the document. The function is
 * recursive, and if no element is provided, it will default to
 * the active document's Body element.
 *
 * @param {Element} element The document element to operate on. 
 * .
 * @returns {Array}         Array of objects, vis
 *                              {element,
 *                               startOffset,
 *                               endOffsetInclusive, 
 *                               url}
 */
function getAllLinks(element) {
  var links = [];
  element = element || DocumentApp.getActiveDocument().getBody();
  
  if (element.getType() === DocumentApp.ElementType.TEXT) {
    var textObj = element.editAsText();
    var text = element.getText();
    var inUrl = false;
    for (var ch=0; ch < text.length; ch++) {
      var url = textObj.getLinkUrl(ch);
      if (url != null) {
        if (!inUrl) {
          // We are now!
          inUrl = true;
          var curUrl = {};
          curUrl.element = element;
          curUrl.url = String( url ); // grab a copy
          curUrl.startOffset = ch;
        }
        else {
          curUrl.endOffsetInclusive = ch;
        }          
      }
      else {
        if (inUrl) {
          // Not any more, we're not.
          inUrl = false;
          links.push(curUrl);  // add to links
          curUrl = {};
        }
      }
    }
    if (inUrl) {
      // in case the link ends on the same char that the element does
      links.push(curUrl); 
    }
  }
  else {
    try {
      var numChildren = element.getNumChildren();
      for (var i=0; i<numChildren; i++) {
        links = links.concat(getAllLinks(element.getChild(i)));
      }
    }
    catch (error) {
    }
  }

  return links;
}

/**
 * Replace all or part of UrlLinks in the document.
 *
 * @param {String} searchPattern    the regex pattern to search for 
 * @param {String} replacement      the text to use as replacement
 *
 * @returns {Number}                number of Urls changed 
 */
function findAndReplaceLinks(searchPattern,replacement) {
  var links = getAllLinks();
  console.log("Number of links found:" + links.length)
  var numChanged = 0;
  
  for (var l=0; l<links.length; l++) {
    var link = links[l];
    console.log(link.url);
    if (link.url.match(searchPattern)) {
      if (replacement == null) {
        // This link needs to be nuked
        link.element.setLinkUrl(null);

      }
      else {
        // This link needs to be changed
        var newUrl = link.url.replace(searchPattern,replacement);
        link.element.setLinkUrl(newUrl);
      }
      numChanged++
    }
  }
  return numChanged;
}

function nukeWikilinks() {
  findAndReplaceLinks('anagora.org', null)
}
```
