// Content script to intercept link clicks in popup windows
// and open them in new popup windows instead of the main window

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  
  if (link && link.href) {
    // Check if it's a valid URL
    try {
      new URL(link.href);
      
      // Prevent default behavior
      e.preventDefault();
      e.stopPropagation();
      
      // Send message to background script to open in new popup
      chrome.runtime.sendMessage({
        action: 'openInPopup',
        url: link.href
      });
    } catch (err) {
      // Invalid URL, let default behavior happen
    }
  }
}, true); // Use capture phase to ensure we catch the click first
