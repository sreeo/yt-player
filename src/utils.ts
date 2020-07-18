export function getLinksFromString(string: string):RegExpMatchArray {
    const regexPattern = new RegExp(
      '(?<=")(https?://)?(www.)?(youtube.com|youtu.?be)/.+?(?=")',
      'g'
    );
    const links = string.match(regexPattern);
    return links;
  }
  
 export function getIdsFromLinksAndCreatePlaylist(links:string[]) {
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
    let idString = '';
    let videoId = '';
    const idSet = [...new Set(idList)];
  
    for (var i = 0; i < idSet.length; i++) {
      if (i === 0) {
        videoId += idSet[i];
      } else if (i === 1) {
        videoId += ',' + idSet[i];
        idString += ',';
      } else {
        idString += ',' + idSet[i];
      }
    }
  
    playListUrl += videoId + ',' + idString;
    embedUrl += videoId + '?playlist=' + idString;
    return [playListUrl, embedUrl];
  }
  
  function getIdFromString(string: string):string {
    const regexPattern = new RegExp(
      '^.*(youtu.be/|v/|e/|u/w+/|embed/|v=)([^#&?]*).*',
      'g'
    );
    const videoIds = getMatches(string, regexPattern, 2);
  
    if (videoIds != null) {
      return videoIds[0];
    }
  
    return null;
  }
  
  function getMatches(string: string, regex: RegExp, index: number):string[] {
    index || (index = 2); // default to the first capturing group
    let matches = [];
    let match;
    while ((match = regex.exec(string))) {
      matches.push(match[index]);
    }
    return matches;
  }