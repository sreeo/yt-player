import React, { useEffect } from "react";
import "./Popup.scss";
import {getLinksFromString, getIdsFromLinksAndCreatePlaylist} from '../utils'

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function(tabs) {
        const id = tabs[0].id;
    
        const code = `document.body.innerHTML`;
    
        // http://infoheap.com/chrome-extension-tutorial-access-dom/
        chrome.tabs.executeScript(id, { code }, function(result) {
          // result has the return value from `code`
          const links = getLinksFromString(result[0]);
          const urls = getIdsFromLinksAndCreatePlaylist(links);
          chrome.runtime.sendMessage({ popupMounted: true, links, urls });
        });
      }
    );

  }, []);

  return <div className="popupContainer">Hello, world!</div>;
}
