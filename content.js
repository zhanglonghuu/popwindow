// Content script to intercept link clicks in popup windows
// and open them in new popup windows instead of the main window
// Only apply this behavior in popup windows (marked with isPopup=true parameter)

// Check if this is a popup window by looking for the isPopup parameter
const isPopupWindow = new URLSearchParams(window.location.search).get('isPopup') === 'true';

if (isPopupWindow) {
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
}
