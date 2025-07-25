// Cross-browser compatibility
const browserAPI = chrome || browser;

browserAPI.contextMenus.create({
  id: "open-url-popup",
  title: "Open in Small Popup",
  contexts: ["all"],
  icons: {
    "16": "/icons/icon.svg",  // Make sure to include the leading slash
    "32": "/icons/icon.svg"
  }
});

browserAPI.contextMenus.onClicked.addListener((info, tab) => {
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
    browserAPI.windows.get(tab.windowId, windowInfo => {
      const currentWindow = windowInfo;
      
      // Define the size of the new window
      const windowWidth = currentWindow.width*3/4;
      const windowHeight = currentWindow.height*3/4;

      // Calculate position relative to current window
      const left = Math.max(0, currentWindow.left + 
                          Math.round((currentWindow.width - windowWidth) / 2));
      const top = Math.max(0, currentWindow.top + 
                        Math.round((currentWindow.height - windowHeight) / 2));

      // Create the centered window relative to current window
      browserAPI.windows.create({
        url: targetUrl,
        type: "popup",
        width: Math.round(windowWidth),
        height: Math.round(windowHeight),
        top: Math.round(top),
        left: Math.round(left)
      });
    });
  }
});



