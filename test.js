 // const url = 
const axios = require('axios');
const cheerio = require('cheerio');
//const apiModule = require('trevo-api');

async function verificaImagensCapitulo(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const images = $('.wp-manga-chapter-img'); // Selecionando as imagens

        if (images.length > 0) {
            return url; // Retorna a URL se imagens forem encontradas
        } else {
            return null; // Retorna nulo se não houver imagens
        }
    } catch (error) {
        console.error('Erro ao fazer a solicitação:', error.message);
        return null; // Retorna nulo em caso de erro na solicitação
    }
}

async function encontrarCapitulosComImagens() {
    const urlBase = 'https://ghostscan.com.br/manga/o-protagonista-masculino-e-um-assassino/cap-';
    let ultimoCapitulo = 1;
    let capituloAtual = ultimoCapitulo;
    let imagensEncontradas = true;
    const urlsCapitulosComImagens = [];

    while (imagensEncontradas) {
        const urlCapitulo = `${urlBase}${capituloAtual}/`;
        const urlEncontrada = await verificaImagensCapitulo(urlCapitulo);

        if (urlEncontrada) {
            urlsCapitulosComImagens.push(urlEncontrada);
            capituloAtual++;
        } else {
            imagensEncontradas = false;
        }
    }

    console.log(urlsCapitulosComImagens);
    return JSON.stringify(urlsCapitulosComImagens, null, 2);


}

async function obterInformacoesManga() {
    try {
        const url = 'https://ghostscan.com.br/manga/o-protagonista-masculino-e-um-assassino/';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const informacoesManga = {};

        // Obtendo informações gerais do mangá
        const tituloManga = $('.post-title h1').text().trim();
        const imagemCapa = $('.summary_image img').attr('src');
        const descricao = $('.description-summary .summary__content').text().trim();

        // Armazenando as informações gerais no objeto informacoesManga
        informacoesManga.titulo = tituloManga;
        informacoesManga.imagemCapa = imagemCapa;
        informacoesManga.descricao = descricao;

        console.log(informacoesManga); // Retorna informações do mangá em formato JSON
        return informacoesManga;
    } catch (error) {
        console.error('Erro ao fazer a solicitação:', error.message);
    }
}

async function manga() {
    try {
        const response = await axios.get('https://ghostscan.com.br');
        const html = response.data;
        const $ = cheerio.load(html);

        const mangaInfo = [];

        $('.col-6.col-md-3.badge-pos-2').each((index, element) => {
            const manga = {};

            const title = $(element).find('.post-title.font-title h3 a').text().trim();
            const imageUrl = $(element).find('.item-thumb.c-image-hover img').attr('src');
            const mangaType = $(element).find('.manga-type').text().trim();
            const rating = $(element).find('.post-total-rating.allow_vote .score').text().trim();
            const link = $(element).find('.item-thumb.c-image-hover a').attr('href');

            if (mangaType.toLowerCase() !== 'novel') {
                manga.title = title;
                manga.imageUrl = imageUrl;
                manga.mangaType = mangaType;
                manga.rating = rating;
                manga.link = link ? link.replace('https://ghostscan.com.br/', '') : ''; // Remover a parte inicial do link

                const chapters = [];

                $(element).find('.list-chapter .chapter-item').each((index, el) => {
                    const chapter = {};

                    const chapterTitle = $(el).find('.chapter a').text().trim();
                    const chapterLink = $(el).find('.chapter a').attr('href');
                    const season = $(el).find('.vol a').text().trim();
                    const publishedAgo = $(el).find('.post-on a').attr('title');

                    chapter.chapterTitle = chapterTitle;
                    chapter.chapterLink = chapterLink;
                    chapter.season = season;
                    chapter.publishedAgo = publishedAgo;

                    chapters.push(chapter);
                });

                manga.chapters = chapters;
                mangaInfo.push(manga);
            }
        });

        return mangaInfo;
    } catch (error) {
        throw new Error('Erro ao obter os dados dos mangás: ' + error.message);
    }
}


module.exports = {
    manga
}





/*const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

async function uploadPhotoToTelegraph(photoBuffer) {
  const form = new FormData();
  form.append('file', photoBuffer, { filename: 'media' });

  try {
    const response = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form,
    });

    const responseBody = await response.text(); // Obter o corpo da resposta como texto

    if (responseBody && response.ok) {
      const data = JSON.parse(responseBody);
      if (data && data[0] && data[0].src) {
        return 'https://telegra.ph' + data[0].src;
      } else {
        throw new Error('Failed to retrieve the image URL from the response.');
      }
    } else {
      throw new Error(`Failed to upload photo. Response status: ${response.status}, Response body: ${responseBody}`);
    }
  } catch (error) {
    throw new Error(`Error uploading photo: ${error.message}`);
  }
}

async function processPhotosInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const photoFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));

  for (const photoFile of photoFiles) {
    const photoPath = path.join(folderPath, photoFile);
    const photoBuffer = fs.readFileSync(photoPath);
    
    try {
      const imageUrl = await uploadPhotoToTelegraph(photoBuffer);
      console.log(imageUrl);
    } catch (error) {
      
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 2 segundos
  }
}

// Substitua 'caminho/da/pasta' pelo caminho real da pasta com as fotos
const photosFolderPath = './A3';
processPhotosInFolder(photosFolderPath);
*/