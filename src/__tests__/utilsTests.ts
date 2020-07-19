import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import {getMatches, getIdFromString,createPlaylistAndEmbedURLs, getLinksFromString} from '../utils'

describe("utils Tests", () => {
  test("get ids from youtube links", async () => {

    // given
    const url1 = "https://youtu.be/51e1gIkzHgk"
    const url2 = "https://www.youtube.com/watch?v=yRfQGXFRr30"
    const url3 = "https://m.youtube.com/watch?v=JmC2igVQdxc"
    const url4 = "https://open.spotify.com/track/6K7wB7VNOJMWFrRrfAhAxo"
    const url5 = null
    const url6 = ""
    const url7 = undefined

    // when
    const id1 = getIdFromString(url1)
    const id2 = getIdFromString(url2)
    const id3 = getIdFromString(url3)
    const id4 = getIdFromString(url4) 
    const id5 = getIdFromString(url5)
    const id6 = getIdFromString(url6)
    const id7 = getIdFromString(url7)

    // then
    expect(id1).toEqual("51e1gIkzHgk")
    expect(id2).toEqual("yRfQGXFRr30")
    expect(id3).toEqual("JmC2igVQdxc")
    expect(id4).toBeNull()
    expect(id5).toBeNull()
    expect(id6).toBeNull()
    expect(id7).toBeNull

  });

  test("get regex matches of youtube video id in link", async () => {

    // given
    const regexPattern = new RegExp(
      '^.*(youtu.be/|v/|e/|u/w+/|embed/|v=)([^#&?]*).*',
      'g'
    );
    const index = 2;

    const url1 = "https://youtu.be/51e1gIkzHgk"
    const url2 = "https://www.youtube.com/watch?v=yRfQGXFRr30"
    const url3 = "https://m.youtube.com/watch?v=JmC2igVQdxc"
    const url4 = "https://open.spotify.com/track/6K7wB7VNOJMWFrRrfAhAxo"
    const url5 = null
    const url6 = ""
    const url7 = undefined
    
    // when
    const match1 = getMatches(url1, regexPattern, index)
    const match2 = getMatches(url2,regexPattern, index)
    const match3 = getMatches(url3,regexPattern, index)
    const match4 = getMatches(url4,regexPattern, index) 
    const match5 = getMatches(url5,regexPattern, index) 
    const match6 = getMatches(url6,regexPattern, index) 
    const match7 = getMatches(url7,regexPattern, index) 
 


    // then
    expect(match1).toEqual(["51e1gIkzHgk"])
    expect(match2).toEqual(["yRfQGXFRr30"])
    expect(match3).toEqual(["JmC2igVQdxc"])
    expect(match4).toEqual([])
    expect(match5).toEqual([])
    expect(match6).toEqual([])
    expect(match7).toEqual([])


  });

  test("playlist urls for list of IDs", async () => {

    // given
    const url1 = "https://youtu.be/51e1gIkzHgk"
    const url2 = "https://www.youtube.com/watch?v=yRfQGXFRr30"
    const url3 = "https://m.youtube.com/watch?v=JmC2igVQdxc"
    const url4 = "https://open.spotify.com/track/6K7wB7VNOJMWFrRrfAhAxo"
    const url5 = null
    const url6 = ""
    const url7 = undefined
    const url8 = "http://youtu.be/51e1gIkzHgk"
    const url9 = "https://google.com"
    const urlsList = [url1, url2, url3, url4, url5, url6, url7, url8, url9]

    
    // when
    const playListAndEmbedResult1 = createPlaylistAndEmbedURLs(urlsList)
    const playListAndEmbedResult2 = createPlaylistAndEmbedURLs([])
    const playListAndEmbedResult3 = createPlaylistAndEmbedURLs(undefined)
    const playListAndEmbedResult4 = createPlaylistAndEmbedURLs(null)
    const playListAndEmbedResult5 = createPlaylistAndEmbedURLs(["https://youtu.be/51e1gIkzHgk"])
    
    
    // then
    expect(playListAndEmbedResult1[0]).toEqual("https://www.youtube.com/watch_videos?video_ids=51e1gIkzHgk,yRfQGXFRr30,JmC2igVQdxc")
    expect(playListAndEmbedResult2).toBeNull()
    expect(playListAndEmbedResult3).toBeNull()
    expect(playListAndEmbedResult4).toBeNull()
    expect(playListAndEmbedResult5[0]).toEqual("https://www.youtube.com/watch_videos?video_ids=51e1gIkzHgk")
    
    expect(playListAndEmbedResult1[1]).toEqual("https://www.youtube.com/embed/51e1gIkzHgk?playlist=yRfQGXFRr30,JmC2igVQdxc")
    expect(playListAndEmbedResult2).toBeNull()
    expect(playListAndEmbedResult3).toBeNull()
    expect(playListAndEmbedResult4).toBeNull()
    expect(playListAndEmbedResult5[1]).toEqual("https://www.youtube.com/embed/51e1gIkzHgk?playlist=")
    
  });

  test("search and get youtube links from string", async () => {

    // given
    const htmlbody1 = '<html><body><a href="https://youtu.be/51e1gIkzHgk"></a> \
    <a href="https://google.com"></a> \
    <a href="https://www.youtube.com/watch?v=yRfQGXFRr30"></a> \
    <a href="https://open.spotify.com/track/6K7wB7VNOJMWFrRrfAhAxo"></a> \
    </body></html>'
    const htmlbody2 = "<html><body><a href='https://youtu.be/51e1gIkzHgk'></a> \
    <a href='https://google.com'></a> \
    <a href='https://www.youtube.com/watch?v=yRfQGXFRr30'></a> \
    <a href='https://open.spotify.com/track/6K7wB7VNOJMWFrRrfAhAxo'></a> \
    </body></html>"
    const htmlbody3 = ""
    const htmlbody4 = undefined
   
    
    // when
    const playListAndEmbedResult1 = getLinksFromString(htmlbody1)
    const playListAndEmbedResult2 = getLinksFromString(htmlbody2)
    const playListAndEmbedResult3 = getLinksFromString(htmlbody3)
   
    
    // then
    expect(playListAndEmbedResult1).toEqual(["https://youtu.be/51e1gIkzHgk","https://www.youtube.com/watch?v=yRfQGXFRr30"])
    expect(playListAndEmbedResult2).toEqual(["https://youtu.be/51e1gIkzHgk","https://www.youtube.com/watch?v=yRfQGXFRr30"])
    expect(playListAndEmbedResult3).toBeNull()
     
  });
});