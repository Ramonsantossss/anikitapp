const ytdl = require('ytdl-core');

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

module.exports = {
getAudioDownloadLink,
getVideoDownloadLink
}
