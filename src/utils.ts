export function getLinksFromString(string: string):RegExpMatchArray {
  if (string != null) {  

  const regexPattern = /(?<="|')(https?:\/\/)?(www.)?(youtube.com|youtu.?be)\/.+?(?="|')/g
    const links = string.match(regexPattern);
    return links;
  }
  
  return null
}
  
 export function createPlaylistAndEmbedURLs(links:string[]) {
    let idList:string[] = [];
  
    if (links != null) {

      for (var i = 0; i < links.length; i++) {
        const id = getIdFromString(links[i]);
        
        if (id != null) {
          idList.push(getIdFromString(links[i]));
        }
      }
    }
  
    if (idList.length === 0) {
      return null;
    }
  
    let playListUrl = 'https://www.youtube.com/watch_videos?video_ids=';
  
    let embedUrl = 'https://www.youtube.com/embed/';
    let videoIds = '';
    let firstVideoId = ''
    const idSet = [...new Set(idList)];
  
    for (var i = 0; i < idSet.length; i++) {

      if (i === 0) {
        videoIds+= idSet[i];
        firstVideoId = videoIds
      } else  {
        videoIds += ',' + idSet[i];
      } 
    }
  
    playListUrl += videoIds;

    videoIds = videoIds.replace(firstVideoId, "")
    videoIds = videoIds.replace(",","")

    embedUrl += firstVideoId + '?playlist=' + videoIds;
    return [playListUrl, embedUrl];
  }
  
  export function getIdFromString(url: string):string {
    const regexPattern = new RegExp(
      '^.*(youtu.be/|v/|e/|u/w+/|embed/|v=)([^#&?]*).*',
      'g'
    );

    const videoIds = getMatches(url, regexPattern, 2);
  
    if (videoIds != null && videoIds.length > 0) {
      return videoIds[0];
    }
  
    return null;
  }
  
  export function getMatches(url: string, regex: RegExp, index: number):string[] {
    index || (index = 2); 
    let matches = [];
    let match;

    while ((match = regex.exec(url))) {
      matches.push(match[index]);
    }

    return matches;
  }