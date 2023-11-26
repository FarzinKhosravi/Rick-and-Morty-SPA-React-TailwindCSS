export default function pagesDataSwitcher(pageId, callback, signal) {
  switch (pageId) {
    case 1:
      return callback("pageOne", signal);

    case 2:
      return callback("pageTwo", signal);

    case 3:
      return callback("pageThree", signal);

    default:
      return;
  }
}
