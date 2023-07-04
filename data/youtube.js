const search = require('yt-search');
const ytdl = require('ytdl-core');
const Axios = require('axios')
const cheerio = require('cheerio')
const qs = require('qs')
const FormData = require('form-data')

function tiktokdownload(url) {
     return new Promise((resolve, reject) => {
          Axios.get('https://ttdownloader.com/')
               .then((data) => {
                    const $ = cheerio.load(data.data)
                    const cookie = data.headers['set-cookie'].join('')
                    const dataPost = {
                         url: url,
                         format: '',
                         token: $('#token').attr('value')
                    }
                    // return console.log(cookie);
                    Axios({
                         method: 'POST',
                         url: 'https://ttdownloader.com/search/',
                         headers: {
                              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                              origin: 'https://ttdownloader.com',
                              referer: 'https://ttdownloader.com/',
                              cookie
                         },
                         data: qs.stringify(dataPost)
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         const result = {
                              nowm: $('#results-list > div:nth-child(2) > div.download > a')?.attr('href'),
                              wm: $('#results-list > div:nth-child(3) > div.download > a')?.attr('href'),
                              audio: $('#results-list > div:nth-child(4) > div.download > a').attr('href')
                         }
                         resolve(result);
                    })
                         .catch(e => {
                              reject({ status: false, message: 'error fetch data', e: e.message })
                         })
               })
               .catch(e => {
                    reject({ status: false, message: 'error fetch data', e: e.message })
               })
     })
}




// Função para obter o link de download do vídeo
async function getVideoDownloadLink(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    return format.url;
  } catch (error) {
    console.error('Ocorreu um erro ao obter o link de download do vídeo:', error);
    return null;
  }
}

// Função para obter o link de download do áudio
async function getAudioDownloadLink(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    return format.url;
  } catch (error) {
    console.error('Ocorreu um erro ao obter o link de download do áudio:', error);
    return null;
  }
}

// Função para pesquisar vídeos no YouTube pelo título
async function searchYouTubeVideos(query) {
  const results = await search(query);
  
  if (results && results.videos.length > 0) {
    return results.videos;
  }
  
  return [];
}

// Função para obter os links de download do áudio e vídeo de um vídeo do YouTube
async function getDownloadLinks(videoId) {
  const videoInfo = await ytdl.getInfo(videoId);
  
  const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
    filter: 'audioonly'
  });
  
  const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
    quality: 'highestvideo'
  });
  
  return {
    audio: audioFormat.url,
    video: videoFormat.url
  };
}

const yt = require("ytdl-core")
const yts = require("yt-search")

async function ytPlayMp3(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    status: true,
                    code: 200,
                    creator: '@CM',
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytPlayMp4(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytSearch(query) {
    return new Promise((resolve, reject) => {
        try {
            const cari = yts(query)
            .then((data) => {
                res = data.all
                return res
            })
            resolve(cari)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

module.exports = {
getAudioDownloadLink,
getVideoDownloadLink,
getDownloadLinks,
searchYouTubeVideos,
ytPlayMp4,
ytPlayMp3,
ytSearch,
tiktokdownload
}
