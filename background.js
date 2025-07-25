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
    browser.windows.get(tab.windowId).then(currentWindow => {
      browser.windows.create({
        url: targetUrl,
        type: "popup",
        width: 1200,
        height: 900,
        top: currentWindow.top + 50,    // Offset from parent window
        left: currentWindow.left + 50   // Offset from parent window
      });
    });
  }
});



