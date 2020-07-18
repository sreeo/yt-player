import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


import "./Popup.scss";
import {getLinksFromString, getIdsFromLinksAndCreatePlaylist} from '../utils'



export default function Popup() {
  const [playListURL, setPlayListURL] = useState('');

  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function(tabs) {
        const id = tabs[0].id;
    
        const code = `document.body.innerHTML`;
    
        chrome.tabs.executeScript(id, { code }, function(result) {
          const links = getLinksFromString(result[0]);
          const urls = getIdsFromLinksAndCreatePlaylist(links);

          if (urls != null && urls.length > 0) {
            setPlayListURL(urls[0])
          }

         });
      }
    );

  }, []);


  return <div className="popupContainer">
    <Container fluid>
      <Row>
     <a target="_blank" href={playListURL}>Playlist LINK</a>
      </Row>
    </Container>
  </div>;
}
