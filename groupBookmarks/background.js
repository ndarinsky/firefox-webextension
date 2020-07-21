var currentTab;
var currentBookmark;

function onRejected(error) {
  console.log(`An error: ${error}`);
}

function scanTree(bookmarkItems) {
  searchItemsToMove(bookmarkItems[0], 0);
  itemsToMove.forEach(item => browser.bookmarks.move(item.id, {parentId : foundFolder.id}))
}

let foundFolder
const itemsToMove = []
const folder = 'HabrHabr'
const regex = 'habr'

function searchItemsToMove(bookmarkItem) {
  if (bookmarkItem.title === folder) {
    foundFolder = bookmarkItem
  }
  if (bookmarkItem.url && bookmarkItem.url.includes(regex)) {
    itemsToMove.push(bookmarkItem)
  } 
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      searchItemsToMove(child);
    }
  }
}

/*
 * Add or remove the bookmark on the current page.
 */
function startExecution() {
  var gettingTree = browser.bookmarks.getTree();
  gettingTree.then(scanTree, onRejected);
}

browser.browserAction.onClicked.addListener(startExecution);
