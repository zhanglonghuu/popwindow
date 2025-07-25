browser.contextMenus.create({
  id: "open-url-popup",
  title: "Open in Small Popup",
  contexts: ["all"],
  icons: {
    "16": "/icons/icon.svg",  // Make sure to include the leading slash
    "32": "/icons/icon.svg"
  }
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  let targetUrl = null;

  // Priority 1: link URL
  if (info.linkUrl) {
    targetUrl = info.linkUrl;

    // Priority 2: selected text
  } else if (info.selectionText) {
    const raw = info.selectionText.trim();

    // Add https:// if it's a naked domain
    targetUrl = raw.match(/^https?:\/\//) ? raw : `https://${raw}`;
  }

  if (targetUrl) {
    // Get current window position first
    browser.windows.get(tab.windowId).then((currentWindow) => {
      // Define the size of the new window
      const windowWidth = 1200;
      const windowHeight = 900;

      // Calculate position relative to current window
      const left = Math.max(0, currentWindow.left + 
                          Math.round((currentWindow.width - windowWidth) / 2));
      const top = Math.max(0, currentWindow.top + 
                        Math.round((currentWindow.height - windowHeight) / 2));

      // Create the centered window relative to current window
      browser.windows.create({
        url: targetUrl,
        type: "popup",
        width: windowWidth,
        height: windowHeight,
        top: top,
        left: left
      });
    });
  }
});



