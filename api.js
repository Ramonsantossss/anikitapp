const axios = require('axios');
const cheerio = require('cheerio');

// ASSISTA 
async function assistir(epId) {
  try {
    const url = `https://animesonlinecc.to/episodio/${epId}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);


// Extrair o título do episódio
const episodeTitle = $('.epih1').text();

// Extrair a descrição do episódio
const episodeDescription = $('[itemprop="description"]').text();

// Extrair a imagem do episódio
const episodeImage = $('.imgep img').attr('src');

// Extrair o link para o próximo episódio
const nextEpisodeLink = $('.pag_episodes .item:last-child a').attr('href');

// Extrair a tag <iframe> com o link do vídeo/episódio
const videoIframe = $('#option-1 iframe').attr('src');

// Crie um objeto com as informações extraídas
const episodeInfo = {
  title: episodeTitle,
  description: episodeDescription,
  image: episodeImage,
  nextEpisodeLink: nextEpisodeLink,
  videoIframe: videoIframe,
};

return episodeInfo;


  } catch (error) {
    console.error('Erro ao buscar informações do anime:', error);
  }
}




// Função para buscar informações de animes recentes.
async function fetchAnimesRecents() {
  try {
    const url = 'https://animesonlinecc.to/episodio/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const episodes = [];

// Selecione os elementos desejados e extraia as informações
$('.item.se.episodes').each((index, element) => {
  const name = $(element).find('.eptitle h3 a').text();
  const thumbnail = $(element).find('.poster img').attr('src');
  const quality = $(element).find('.quality').text();
  const href = $(element).find('.eptitle h3 a').attr('href');

  // Extrair o ID do episódio a partir da URL
  const idEpisodeSplit = href.split('/');
  const idEpisode = idEpisodeSplit[idEpisodeSplit.length - 2];

  episodes.push({
    idEpisode,
    name,
    thumbnail,
    quality,
  });
});

return episodes;
  } catch (error) {
    console.error('Erro ao buscar informações de animes recentes:', error);
    throw error;
  }
}




// Pegar anime por gênero
async function genero(nameGenero) {
  try {
    // https://animesonlinecc.to/genero/romance/page/2/
    const url = `https://animesonlinecc.to/genero/${nameGenero}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);


// Array para armazenar os resultados
const tvShows = [];

// Selecione os elementos desejados e extraia as informações
$('.item.tvshows').each((index, element) => {
  const name = $(element).find('.data h3 a').text();
  const imageUrl = $(element).find('.poster img').attr('src');
  const rating = $(element).find('.rating').text().trim();

  // URL do anime
  const animeUrl = $(element).find('.data h3 a').attr('href');

  // Extrair o ID do anime a partir da URL
  const idAnimeSplit = animeUrl.split('/');
  const idAnime = idAnimeSplit[idAnimeSplit.length - 2];

  tvShows.push({
    idAnime,
    name,
    imageUrl,
    rating,
  });
});

// Exibir os resultados
return tvShows;
  } catch (error) {
    console.error('Erro ao buscar informações dos últimos episódios:', error);
    throw error;
  }
}



//INFORMAÇÕES DO ANIME
async function veranime(name) {
  try {
    const url = `https://animesonlinecc.to/anime/${name}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const animeInfo = {
      title: $('.sheader h1').text(),
      description: $('.wp-content p').text(),
      genres: [],
      seasons: [],
    };

    // Extrair gêneros
    $('.sgeneros a[rel="tag"]').each((_, genreElement) => {
      animeInfo.genres.push($(genreElement).text());
    });

    // Extrair informações das temporadas
    $('.se-c').each((seasonIndex, seasonElement) => {
      const seasonTitle = $(seasonElement).find('.title').text();
      const seasonEpisodes = [];

      // Usar seletores mais específicos para extrair episódios
      $(seasonElement).find('.episodiotitle').each((_, episodeElement) => {
        const episodeNumber = $(episodeElement).find('.numerando').text();
        const episodeTitle = $(episodeElement).find('a').text();
        const episodeURL = $(episodeElement).find('a').attr('href');

        seasonEpisodes.push({
          number: episodeNumber,
          title: episodeTitle,
          url: episodeURL,
        });
      });

      animeInfo.seasons.push({
        title: seasonTitle,
        episodes: seasonEpisodes,
      });
    });

    return animeInfo; // Retorna animeInfo como resposta
  } catch (error) {
    console.error('Erro ao buscar informações do anime:', error);
    throw error;
  }
}






module.exports = {
assistir,
fetchAnimesRecents,
genero,
veranime
}
