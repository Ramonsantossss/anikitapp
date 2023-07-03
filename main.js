
__path = process.cwd()

var express = require('express');
var router = express.Router();
var fs = require('fs')
router.get('/docs', (req, res) => {
    res.sendFile(__path + '/paginas/docs.html')
})

router.get('/', (req, res) => {
    res.sendFile(__path + '/paginas/index.html')
})

var { ytPlayMp4, ytPlayMp3, getVideoDownloadLink, getAudioDownloadLink } = require('./data/youtube.js')
const listkey = ["anikit"];
 var { youtube } = require('./data/youtube.js')

router.get("/anikit/playmp4", async (req, res, next) => {
  const query = req.query.query;
  if (!query) return res.json({"error": "faltouo parâmetro query"})
    ytPlayMp4(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });

});

router.get("/anikit/playmp3", async (req, res, next) => {
  const query = req.query.query;
  if (!query) return res.json({"error": "faltouo parâmetro query"})
    ytPlayMp3(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
});



router.get('/anikit/ytmp4', async(req, res) => {
var videoUrl = req.query.videoUrl
if(!videoUrl) return res.json({"error": "faltouo parâmetro videoUrl"})
//const getVideoDownloadLink = require("./data/youtube.js")
// Exemplo de uso
getVideoDownloadLink(videoUrl)
  .then((downloadLink) => {
    if (downloadLink) {
      res.json({
      url: `${downloadLink}`
    })
    } else {
      console.log('Falha ao obter o link de download do vídeo.');
    }
  });

})

router.get('/anikit/ytmp3', async(req, res) => {
var videoUrl = req.query.videoUrl
if(!videoUrl) return res.json({"error": "faltouo parâmetro videoUrl"})
//const getAudioDownloadLink = require("./data/youtube.js")
getAudioDownloadLink(videoUrl)
  .then((downloadLink) => {
    if (downloadLink) {
    res.json({
      url: `${downloadLink}`
    })
     // console.log('Link de download do áudio:', downloadLink);
    } else {
      console.log('Falha ao obter o link de download do áudio.');
    }
  });

});


router.get('/nsfw/ahegao', async (req, res, next) => {


    const ahegao = JSON.parse(fs.readFileSync(__path + '/data/ahegao.json'));
    const randahegao = ahegao[Math.floor(Math.random() * ahegao.length)];

    res.json({
      url: `${randahegao}`
    })

})

router.get('/nsfw/ass', async (req, res, next) => {


    const ass = JSON.parse(fs.readFileSync(__path + '/data/ass.json'));
    const randass = ass[Math.floor(Math.random() * ass.length)];

    res.json({
      url: `${randass}`
    })

})

router.get('/nsfw/bdsm', async (req, res, next) => {


    const bdsm = JSON.parse(fs.readFileSync(__path + '/data/bdsm.json'));
    const randbdsm = bdsm[Math.floor(Math.random() * bdsm.length)];

    res.json({
      url: `${randbdsm}`
    })

})

router.get('/nsfw/blowjob', async (req, res, next) => {


    const blowjob = JSON.parse(fs.readFileSync(__path + '/data/blowjob.json'));
    const randblowjob = blowjob[Math.floor(Math.random() * blowjob.length)];

    res.json({
      url: `${randblowjob}`
    })

})

router.get('/nsfw/cuckold', async (req, res, next) => {


    const cuckold = JSON.parse(fs.readFileSync(__path + '/data/cuckold.json'));
    const randcuckold = cuckold[Math.floor(Math.random() * cuckold.length)];

    res.json({
      url: `${randcuckold}`
    })

})

router.get('/nsfw/cum', async (req, res, next) => {


    const cum = JSON.parse(fs.readFileSync(__path + '/data/cum.json'));
    const randcum = cum[Math.floor(Math.random() * cum.length)];

    res.json({
      url: `${randcum}`
    })

})

router.get('/nsfw/ero', async (req, res, next) => {


    const ero = JSON.parse(fs.readFileSync(__path + '/data/ero.json'));
    const randero = ero[Math.floor(Math.random() * ero.length)];

    res.json({
      url: `${randero}`
    })

})

router.get('/nsfw/femdom', async (req, res, next) => {


    const femdom = JSON.parse(fs.readFileSync(__path + '/data/femdom.json'));
    const randfemdom = femdom[Math.floor(Math.random() * femdom.length)];

    res.json({
      url: `${randfemdom}`
    })

})

router.get('/nsfw/foot', async (req, res, next) => {


    const foot = JSON.parse(fs.readFileSync(__path + '/data/foot.json'));
    const randfoot = foot[Math.floor(Math.random() * foot.length)];

    res.json({
      url: `${randfoot}`
    })

})

router.get('/nsfw/gangbang', async (req, res, next) => {


    const gangbang = JSON.parse(fs.readFileSync(__path + '/data/gangbang.json'));
    const randgangbang = gangbang[Math.floor(Math.random() * gangbang.length)];

    res.json({
      url: `${randgangbang}`
    })

})

router.get('/nsfw/glasses', async (req, res, next) => {


    const glasses = JSON.parse(fs.readFileSync(__path + '/data/glasses.json'));
    const randglasses = glasses[Math.floor(Math.random() * glasses.length)];

    res.json({
      url: `${randglasses}`
    })

})

router.get('/nsfw/hentai', async (req, res, next) => {


    const hentai = JSON.parse(fs.readFileSync(__path + '/data/hentai.json'));
    const randhentai = hentai[Math.floor(Math.random() * hentai.length)];

    res.json({
      url: `${randhentai}`
    })

})

router.get('/nsfw/gifs', async (req, res, next) => {


    const gifs = JSON.parse(fs.readFileSync(__path + '/data/gifs.json'));
    const randgifs = gifs[Math.floor(Math.random() * gifs.length)];

    res.json({
      url: `${randgifs}`
    })

})

router.get('/nsfw/jahy', async (req, res, next) => {


    const jahy = JSON.parse(fs.readFileSync(__path + '/data/jahy.json'));
    const randjahy = jahy[Math.floor(Math.random() * jahy.length)];

    res.json({
      url: `${randjahy}`
    })

})

router.get('/nsfw/manga', async (req, res, next) => {


    const manga = JSON.parse(fs.readFileSync(__path + '/data/manga.json'));
    const randmanga = manga[Math.floor(Math.random() * manga.length)];

    res.json({
      url: `${randmanga}`
    })

})

router.get('/nsfw/masturbation', async (req, res, next) => {


    const masturbation = JSON.parse(fs.readFileSync(__path + '/data/masturbation.json'));
    const randmasturbation = masturbation[Math.floor(Math.random() * masturbation.length)];

    res.json({
      url: `${randmasturbation}`
    })

})

router.get('/nsfw/neko', async (req, res, next) => {


    const neko = JSON.parse(fs.readFileSync(__path + '/data/neko.json'));
    const randneko = neko[Math.floor(Math.random() * neko.length)];

    res.json({
      url: `${randneko}`
    })

})

router.get('/nsfw/orgy', async (req, res, next) => {


    const orgy = JSON.parse(fs.readFileSync(__path + '/data/orgy.json'));
    const randorgy = orgy[Math.floor(Math.random() * orgy.length)];

    res.json({
      url: `${randorgy}`
    })

})

router.get('/nsfw/panties', async (req, res, next) => {


    const panties = JSON.parse(fs.readFileSync(__path + '/data/panties.json'));
    const randpanties = panties[Math.floor(Math.random() * panties.length)];

    res.json({
      url: `${randpanties}`
    })

})

router.get('/nsfw/pussy', async (req, res, next) => {


    const pussy = JSON.parse(fs.readFileSync(__path + '/data/pussy.json'));
    const randpussy = pussy[Math.floor(Math.random() * pussy.length)];

    res.json({
      url: `${randpussy}`
    })

})

router.get('/nsfw/neko2', async (req, res, next) => {


    const neko2 = JSON.parse(fs.readFileSync(__path + '/data/neko2.json'));
    const randneko2 = neko2[Math.floor(Math.random() * neko2.length)];

    res.json({
      url: `${randneko2}`
    })

})

router.get('/nsfw/tentacles', async (req, res, next) => {


    const tentacles = JSON.parse(fs.readFileSync(__path + '/data/tentacles.json'));
    const randtentacles = tentacles[Math.floor(Math.random() * tentacles.length)];

    res.json({
      url: `${randtentacles}`
    })

})

router.get('/nsfw/thighs', async (req, res, next) => {


    const thighs = JSON.parse(fs.readFileSync(__path + '/data/thighs.json'));
    const randthighs = thighs[Math.floor(Math.random() * thighs.length)];

    res.json({
      url: `${randthighs}`
    })

})

router.get('/nsfw/yuri', async (req, res, next) => {


    const yuri = JSON.parse(fs.readFileSync(__path + '/data/yuri.json'));
    const randyuri = yuri[Math.floor(Math.random() * yuri.length)];

    res.json({
      url: `${randyuri}`
    })

})

router.get('/nsfw/zettai', async (req, res, next) => {


    const zettai = JSON.parse(fs.readFileSync(__path + '/data/zettai.json'));
    const randzettai = zettai[Math.floor(Math.random() * zettai.length)];

    res.json({
      url: `${randzettai}`
    })

})

router.get('/anime/keneki', async (req, res, next) => {


    const keneki = JSON.parse(fs.readFileSync(__path + '/data/keneki.json'));
    const randkeneki = keneki[Math.floor(Math.random() * keneki.length)];

    res.json({
      url: `${randkeneki}`
    })

})

router.get('/anime/megumin', async (req, res, next) => {


    const megumin = JSON.parse(fs.readFileSync(__path + '/data/megumin.json'));
    const randmegumin = megumin[Math.floor(Math.random() * megumin.length)];

    res.json({
      url: `${randmegumin}`
    })

})

router.get('/anime/yotsuba', async (req, res, next) => {


    const yotsuba = JSON.parse(fs.readFileSync(__path + '/data/yotsuba.json'));
    const randyotsuba = yotsuba[Math.floor(Math.random() * yotsuba.length)];

    res.json({
      url: `${randyotsuba}`
    })

})

router.get('/anime/shinomiya', async (req, res, next) => {


    const shinomiya = JSON.parse(fs.readFileSync(__path + '/data/shinomiya.json'));
    const randshinomiya = shinomiya[Math.floor(Math.random() * shinomiya.length)];

    res.json({
      url: `${randshinomiya}`
    })

})

router.get('/anime/yumeko', async (req, res, next) => {


    const yumeko = JSON.parse(fs.readFileSync(__path + '/data/yumeko.json'));
    const randyumeko = yumeko[Math.floor(Math.random() * yumeko.length)];

    res.json({
      url: `${randyumeko}`
    })

})

router.get('/anime/tejina', async (req, res, next) => {


    const tejina = JSON.parse(fs.readFileSync(__path + '/data/tejina.json'));
    const randtejina = tejina[Math.floor(Math.random() * tejina.length)];

    res.json({
      url: `${randtejina}`
    })

})

router.get('/anime/chiho', async (req, res, next) => {


    const chiho = JSON.parse(fs.readFileSync(__path + '/data/chiho.json'));
    const randchiho = chiho[Math.floor(Math.random() * chiho.length)];

    res.json({
      url: `${randchiho}`
    })

})




router.get('/anime/toukachan', async (req, res, next) => {


    const toukachan = JSON.parse(fs.readFileSync(__path + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];

    res.json({
      url: `${randtoukachan}`
    })

})

router.get('/anime/akira', async (req, res, next) => {


    const akira = JSON.parse(fs.readFileSync(__path + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];

    res.json({
      url: `${randakira}`
    })

})

router.get('/anime/itori', async (req, res, next) => {


    const itori = JSON.parse(fs.readFileSync(__path + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];

    res.json({
      url: `${randitori}`
    })

})

router.get('/anime/kurumi', async (req, res, next) => {


    const kurumi = JSON.parse(fs.readFileSync(__path + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];

    res.json({
      url: `${randkurumi}`
    })

})

router.get('/anime/miku', async (req, res, next) => {


    const miku = JSON.parse(fs.readFileSync(__path + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];

    res.json({
      url: `${randmiku}`
    })

})

router.get('/anime/pokemon', async (req, res, next) => {


    const pokemon = JSON.parse(fs.readFileSync(__path + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

    res.json({
      url: `${randpokemon}`
    })

})

router.get('/anime/ryujin', async (req, res, next) => {


    const ryujin = JSON.parse(fs.readFileSync(__path + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];

    res.json({
      url: `${randryujin}`
    })

})

router.get('/anime/rose', async (req, res, next) => {


    const rose = JSON.parse(fs.readFileSync(__path + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];

    res.json({
      url: `${randrose}`
    })

})

router.get('/anime/kaori', async (req, res, next) => {


    const kaori = JSON.parse(fs.readFileSync(__path + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];

    res.json({
      url: `${randkaori}`
    })

})

router.get('/anime/shizuka', async (req, res, next) => {


    const shizuka = JSON.parse(fs.readFileSync(__path + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];

    res.json({
      url: `${randshizuka}`
    })

})

router.get('/anime/kaga', async (req, res, next) => {


    const kaga = JSON.parse(fs.readFileSync(__path + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];

    res.json({
      url: `${randkaga}`
    })

})

router.get('/anime/kotori', async (req, res, next) => {


    const kotori = JSON.parse(fs.readFileSync(__path + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    
    res.json({
      url: `${randkotori}`
    })

})

router.get('/anime/mikasa', async (req, res, next) => {


    const mikasa = JSON.parse(fs.readFileSync(__path + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];

    res.json({
      url: `${randmikasa}`
    })

})

router.get('/anime/akiyama', async (req, res, next) => {


    const akiyama = JSON.parse(fs.readFileSync(__path + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];

    res.json({
      url: `${randakiyama}`
    })

})

router.get('/anime/gremory', async (req, res, next) => {


    const gremory = JSON.parse(fs.readFileSync(__path + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    
    res.json({
      url: `${randgremory}`
    })

})

router.get('/anime/isuzu', async (req, res, next) => {


    const isuzu = JSON.parse(fs.readFileSync(__path + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];

    res.json({
      url: `${randisuzu}`
    })

})

router.get('/anime/cosplay', async (req, res, next) => {


    const cosplay = JSON.parse(fs.readFileSync(__path + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];

    res.json({
      url: `${randcosplay}`
    })

})

router.get('/anime/shina', async (req, res, next) => {


    const shina = JSON.parse(fs.readFileSync(__path + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];

    res.json({
      url: `${randshina}`
    })

})

router.get('/anime/kagura', async (req, res, next) => {


    const kagura = JSON.parse(fs.readFileSync(__path + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];

    res.json({
      url: `${randkagura}`
    })

})

router.get('/anime/shinka', async (req, res, next) => {


    const shinka = JSON.parse(fs.readFileSync(__path + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];

    res.json({
      url: `${randshinka}`
    })

})

router.get('/anime/eba', async (req, res, next) => {


    const eba = JSON.parse(fs.readFileSync(__path + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];

    res.json({
      url: `${randeba}`
    })

})

router.get('/anime/deidara', async (req, res, next) => {


    const Deidara = JSON.parse(fs.readFileSync(__path + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];

    res.json({
      url: `${randDeidara}`
    })

})



router.get('/anime/jeni', async (req, res, next) => {


    const jeni = JSON.parse(fs.readFileSync(__path + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];

    res.json({
      url: `${randjeni}`
    })

})


router.get('/random/meme', async (req, res, next) => {


    const meme = JSON.parse(fs.readFileSync(__path + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })

})
router.get('/anime/toukachan', async (req, res, next) => {


    const toukachan = JSON.parse(fs.readFileSync(__path + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];

    res.json({
      url: `${randtoukachan}`
    })

})

router.get('/anime/akira', async (req, res, next) => {


    const akira = JSON.parse(fs.readFileSync(__path + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];

    res.json({
      url: `${randakira}`
    })

})

router.get('/anime/itori', async (req, res, next) => {


    const itori = JSON.parse(fs.readFileSync(__path + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];

    res.json({
      url: `${randitori}`
    })

})

router.get('/anime/kurumi', async (req, res, next) => {


    const kurumi = JSON.parse(fs.readFileSync(__path + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];

    res.json({
      url: `${randkurumi}`
    })

})

router.get('/anime/miku', async (req, res, next) => {


    const miku = JSON.parse(fs.readFileSync(__path + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];

    res.json({
      url: `${randmiku}`
    })

})

router.get('/anime/pokemon', async (req, res, next) => {


    const pokemon = JSON.parse(fs.readFileSync(__path + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

    res.json({
      url: `${randpokemon}`
    })

})

router.get('/anime/ryujin', async (req, res, next) => {


    const ryujin = JSON.parse(fs.readFileSync(__path + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];

    res.json({
      url: `${randryujin}`
    })

})

router.get('/anime/rose', async (req, res, next) => {


    const rose = JSON.parse(fs.readFileSync(__path + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];

    res.json({
      url: `${randrose}`
    })

})

router.get('/anime/kaori', async (req, res, next) => {


    const kaori = JSON.parse(fs.readFileSync(__path + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];

    res.json({
      url: `${randkaori}`
    })

})

router.get('/anime/shizuka', async (req, res, next) => {


    const shizuka = JSON.parse(fs.readFileSync(__path + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];

    res.json({
      url: `${randshizuka}`
    })

})

router.get('/anime/kaga', async (req, res, next) => {


    const kaga = JSON.parse(fs.readFileSync(__path + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];

    res.json({
      url: `${randkaga}`
    })

})

router.get('/anime/kotori', async (req, res, next) => {


    const kotori = JSON.parse(fs.readFileSync(__path + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    
    res.json({
      url: `${randkotori}`
    })

})

router.get('/anime/mikasa', async (req, res, next) => {


    const mikasa = JSON.parse(fs.readFileSync(__path + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];

    res.json({
      url: `${randmikasa}`
    })

})

router.get('/anime/akiyama', async (req, res, next) => {


    const akiyama = JSON.parse(fs.readFileSync(__path + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];

    res.json({
      url: `${randakiyama}`
    })

})

router.get('/anime/gremory', async (req, res, next) => {


    const gremory = JSON.parse(fs.readFileSync(__path + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    
    res.json({
      url: `${randgremory}`
    })

})

router.get('/anime/isuzu', async (req, res, next) => {


    const isuzu = JSON.parse(fs.readFileSync(__path + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];

    res.json({
      url: `${randisuzu}`
    })

})

router.get('/anime/cosplay', async (req, res, next) => {


    const cosplay = JSON.parse(fs.readFileSync(__path + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];

    res.json({
      url: `${randcosplay}`
    })

})

router.get('/anime/shina', async (req, res, next) => {


    const shina = JSON.parse(fs.readFileSync(__path + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];

    res.json({
      url: `${randshina}`
    })

})

router.get('/anime/kagura', async (req, res, next) => {


    const kagura = JSON.parse(fs.readFileSync(__path + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];

    res.json({
      url: `${randkagura}`
    })

})

router.get('/anime/shinka', async (req, res, next) => {


    const shinka = JSON.parse(fs.readFileSync(__path + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];

    res.json({
      url: `${randshinka}`
    })

})

router.get('/anime/eba', async (req, res, next) => {


    const eba = JSON.parse(fs.readFileSync(__path + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];

    res.json({
      url: `${randeba}`
    })

})

router.get('/anime/deidara', async (req, res, next) => {


    const Deidara = JSON.parse(fs.readFileSync(__path + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];

    res.json({
      url: `${randDeidara}`
    })

})



router.get('/anime/jeni', async (req, res, next) => {


    const jeni = JSON.parse(fs.readFileSync(__path + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];

    res.json({
      url: `${randjeni}`
    })

})


router.get('/random/meme', async (req, res, next) => {


    const meme = JSON.parse(fs.readFileSync(__path + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })

})

router.get('/wallpaper/satanic', async (req, res, next) => {


    const satanic = JSON.parse(fs.readFileSync(__path + '/data/satanic.json'));
    const randsatanic = satanic[Math.floor(Math.random() * satanic.length)];

    res.json({
      url: `${randsatanic}`
    })

})



router.get('/anime/itachi', async (req, res, next) => {


    const Itachi = JSON.parse(fs.readFileSync(__path + '/data/itachi.json'));
    const randItachi = Itachi[Math.floor(Math.random() * Itachi.length)];

    res.json({
      url: `${randItachi}`
    })

})

router.get('/anime/madara', async (req, res, next) => {


    const Madara = JSON.parse(fs.readFileSync(__path + '/data/madara.json'));
    const randMadara = Madara[Math.floor(Math.random() * Madara.length)];

    res.json({
      url: `${randMadara}`
    })

})

router.get('/anime/yuki', async (req, res, next) => {


    const Yuki = JSON.parse(fs.readFileSync(__path + '/data/yuki.json'));
    const randYuki = Yuki[Math.floor(Math.random() * Yuki.length)];

    res.json({
      url: `${randYuki}`
    })

})

router.get('/wallpaper/asuna', async (req, res, next) => {


    const asuna = JSON.parse(fs.readFileSync(__path + '/data/asuna.json'));
    const randasuna = asuna[Math.floor(Math.random() * asuna.length)];

    res.json({
      url: `${randasuna}`
    })

})

router.get('/anime/ayuzawa', async (req, res, next) => {


    const ayuzawa = JSON.parse(fs.readFileSync(__path + '/data/ayuzawa.json'));
    const randayuzawa = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];

    res.json({
      url: `${randayuzawa}`
    })

})

router.get('/anime/chitoge', async (req, res, next) => {


    const chitoge = JSON.parse(fs.readFileSync(__path + '/data/chitoge.json'));
    const randchitoge = chitoge[Math.floor(Math.random() * chitoge.length)];

    res.json({
      url: `${randchitoge}`
    })

})

router.get('/anime/emilia', async (req, res, next) => {


    const emilia = JSON.parse(fs.readFileSync(__path + '/data/emilia.json'));
    const randemilia = emilia[Math.floor(Math.random() * emilia.length)];

    res.json({
      url: `${randemilia}`
    })

})

router.get('/anime/hestia', async (req, res, next) => {


    const hestia = JSON.parse(fs.readFileSync(__path + '/data/hestia.json'));
    const randhestia = hestia[Math.floor(Math.random() * hestia.length)];

    res.json({
      url: `${randhestia}`
    })

})

router.get('/anime/inori', async (req, res, next) => {


    const inori = JSON.parse(fs.readFileSync(__path + '/data/inori.json'));
    const randinori = inori[Math.floor(Math.random() * inori.length)];

    res.json({
      url: `${randinori}`
    })

})

router.get('/anime/ana', async (req, res, next) => {


    const ana = JSON.parse(fs.readFileSync(__path + '/data/ana.json'));
    const randana = ana[Math.floor(Math.random() * ana.length)];

    res.json({
      url: `${randana}`
    })

})

router.get('/anime/boruto', async (req, res, next) => {


    const Boruto = JSON.parse(fs.readFileSync(__path + '/data/boruto.json'));
    const randBoruto = Boruto[Math.floor(Math.random() * Boruto.length)];

    res.json({
      url: `${randBoruto}`
    })

})

router.get('/anime/erza', async (req, res, next) => {


    const Erza = JSON.parse(fs.readFileSync(__path + '/data/erza.json'));
    const randErza = Erza[Math.floor(Math.random() * Erza.length)];

    res.json({
      url: `${randErza}`
    })

})

router.get('/anime/kakasih', async (req, res, next) => {


    const Kakasih = JSON.parse(fs.readFileSync(__path + '/data/kakasih.json'));
    const randKakasih = Kakasih[Math.floor(Math.random() * Kakasih.length)];

    res.json({
      url: `${randKakasih}`
    })

})

router.get('/anime/sagiri', async (req, res, next) => {


    const Sagiri = JSON.parse(fs.readFileSync(__path + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];

    res.json({
      url: `${randSagiri}`
    })

})

router.get('/anime/minato', async (req, res, next) => {


    const Minato = JSON.parse(fs.readFileSync(__path + '/data/minato.json'));
    const randMinato = Minato[Math.floor(Math.random() * Minato.length)];

    res.json({
      url: `${randMinato}`
    })

})

router.get('/anime/naruto', async (req, res, next) => {


    const Naruto = JSON.parse(fs.readFileSync(__path + '/data/naruto.json'));
    const randNaruto = Naruto[Math.floor(Math.random() * Naruto.length)];

    res.json({
      url: `${randNaruto}`
    })

})

router.get('/anime/nezuko', async (req, res, next) => {


    const Nezuko = JSON.parse(fs.readFileSync(__path + '/data/nezuko.json'));
    const randNezuko = Nezuko[Math.floor(Math.random() * Nezuko.length)];

    res.json({
      url: `${randNezuko}`
    })

})

router.get('/anime/onepiece', async (req, res, next) => {


    const Pic = JSON.parse(fs.readFileSync(__path + '/data/onepiece.json'));
    const randPic = Pic[Math.floor(Math.random() * Pic.length)];

    res.json({
      url: `${randPic}`
    })

})

router.get('/anime/rize', async (req, res, next) => {


    const Rize = JSON.parse(fs.readFileSync(__path + '/data/rize.json'));
    const randRize = Rize[Math.floor(Math.random() * Rize.length)];

    res.json({
      url: `${randRize}`
    })

})

router.get('/anime/sakura', async (req, res, next) => {


    const Sakura = JSON.parse(fs.readFileSync(__path + '/data/sakura.json'));
    const randSakura = Sakura[Math.floor(Math.random() * Sakura.length)];

    res.json({
      url: `${randSakura}`
    })

})

router.get('/anime/sasuke', async (req, res, next) => {


    const Sasuke = JSON.parse(fs.readFileSync(__path + '/data/sasuke.json'));
    const randSasuke = Sasuke[Math.floor(Math.random() * Sasuke.length)];

    res.json({
      url: `${randSasuke}`
    })

})

router.get('/anime/tsunade', async (req, res, next) => {


    const Su = JSON.parse(fs.readFileSync(__path + '/data/tsunade.json'));
    const randSu = Su[Math.floor(Math.random() * Su.length)];

    res.json({
      url: `${randSu}`
    })

})

router.get('/anime/montor', async (req, res, next) => {


    const Mon = JSON.parse(fs.readFileSync(__path + '/data/montor.json'));
    const randMon = Mon[Math.floor(Math.random() * Mon.length)];

    res.json({
      url: `${randMon}`
    })

})
// ain
router.get('/anime/mobil', async (req, res, next) => {


    const Mob = JSON.parse(fs.readFileSync(__path + '/data/mobil.json'));
    const randMob = Mob[Math.floor(Math.random() * Mob.length)];

    res.json({
      url: `${randMob}`
    })

})


router.get('/anime/anime', async (req, res, next) => {


    const Wai23 = JSON.parse(fs.readFileSync(__path + '/data/wallhp2.json'));
    const randWai23 = Wai23[Math.floor(Math.random() * Wai23.length)];

    res.json({
      url: `${randWai23}`
    })

})


router.get('/anime/wallhp', async (req, res, next) => {


    const Wai22 = JSON.parse(fs.readFileSync(__path + '/data/wallhp.json'));
    const randWai22 = Wai22[Math.floor(Math.random() * Wai22.length)];

    res.json({
      url: `${randWai22}`
    })

})

router.get('/anime/waifu2', async (req, res, next) => {


    const Wai2 = JSON.parse(fs.readFileSync(__path + '/data/waifu2.json'));
    const randWai2 = Wai2[Math.floor(Math.random() * Wai2.length)];

    res.json({
      url: `${randWai2}`
    })

})

router.get('/anime/waifu', async (req, res, next) => {


    const Wai = JSON.parse(fs.readFileSync(__path + '/data/waifu.json'));
    const randWai = Wai[Math.floor(Math.random() * Wai.length)];
    
    res.json({
      url: `${randWai}`
    })

})


router.get('/anime/hekel', async (req, res, next) => {


    Hekel = JSON.parse(fs.readFileSync(__path + '/data/hekel.json'));
    const randHekel = Hekel[Math.floor(Math.random() * Hekel.length)]

    res.json({
      url: `${randHekel}`
    })

})

router.get('/anime/kucing', async (req, res, next) => {


    Kucing = JSON.parse(fs.readFileSync(__path + '/data/kucing.json'));
    const randKucing = Kucing[Math.floor(Math.random() * Kucing.length)]

    res.json({
      url: `${randKucing}`
    })

})

router.get('/wallpaper/pubg', async (req, res, next) => {


    Pubg = JSON.parse(fs.readFileSync(__path + '/data/pubg.json'));
    const randPubg = Pubg[Math.floor(Math.random() * Pubg.length)]

    res.json({
      url: `${randPubg}`
    })

})

router.get('/wallpaper/ppcouple', async (req, res, next) => {


    Pp = JSON.parse(fs.readFileSync(__path + '/data/profil.json'));
    const randPp = Pp[Math.floor(Math.random() * Pp.length)]

    res.json({
      url: `${randPp}`
    })

})

router.get('/wallpaper/anjing', async (req, res, next) => {


    Anjing = JSON.parse(fs.readFileSync(__path + '/data/anjing.json'));
    const randAnjing = Anjing[Math.floor(Math.random() * Anjing.length)]

    res.json({
      url: `${randAnjing}`
    })

})

router.get('/anime/doraemon', async (req, res, next) => {


    Dora = JSON.parse(fs.readFileSync(__path + '/data/doraemon.json'));
    const randDora = Dora[Math.floor(Math.random() * Dora.length)]

    res.json({
      url: `${randDora}`
    })

})


router.get('/anime/elaina', async (req, res, next) => {


    const Elaina = JSON.parse(fs.readFileSync(__path + '/data/elaina.json'))
    const randElaina = Elaina[Math.floor(Math.random() * Elaina.length)]
    //tansole.log(randLoli)

    res.json({
      url: `${randElaina}`
    })

})


router.get('/anime/loli', async (req, res, next) => {


    const Loli = JSON.parse(fs.readFileSync(__path + '/data/loli.json'))
    const randLoli = Loli[Math.floor(Math.random() * Loli.length)]
    //tansole.log(randLoli)

    res.json({
      url: `${randLoli}`
    })

})


router.get('/anime/yuri', async (req, res, next) => {


    const Yuri = JSON.parse(fs.readFileSync(__path + '/data/yuri.json'))
    const randYuri = Yuri[Math.floor(Math.random() * Yuri.length)]
    //tansole.log(randTech))
    res.json({
      url: `${randYuri}`
    })

})


router.get('/anime/cecan', async (req, res, next) => {


    const cecan = JSON.parse(fs.readFileSync(__path + '/data/cecan.json'));
    const randCecan = cecan[Math.floor(Math.random() * cecan.length)];
    //data = await fetch(randCecan).then(v => v.buffer());
    //await fs.writeFileSync(__path + '/tmp/cecan.jpeg', data)
    res.json({
      url: `${randCecan}`
    })

})


router.get('/wallpaper/aesthetic', async (req, res, next) => {


    const Aesthetic = JSON.parse(fs.readFileSync(__path + '/data/aesthetic.json'));
    const randAesthetic = Aesthetic[Math.floor(Math.random() * Aesthetic.length)];
    //data = await fetch(randAesthetic).then(v => v.buffer());
    //await fs.writeFileSync(__path + '/tmp/aesthetic.jpeg', data)
    res.json({
      url: `${randAesthetic}`
    })

})



router.get('/anime/sagiri', async (req, res, next) => {


    const Sagiri = JSON.parse(fs.readFileSync(__path + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];
    //data = await fetch(randSagiri).then(v => v.buffer())
    //await fs.writeFileSync(__path + '/tmp/sagiri.jpeg', data)
    res.json({
      url: `${randSagiri}`
    })

})

router.get('/anime/shota', async (req, res, next) => {


    const Shota = JSON.parse(fs.readFileSync(__path + '/data/shota.json'));
    const randShota = Shota[Math.floor(Math.random() * Shota.length)];
    //data = await fetch(randShota).then(v => v.buffer());
    //await fs.writeFileSync(__path + '/tmp/shota.jpeg', data)
    res.json({
      url: `${randShota}`
    })

})

router.get('/anime/nsfwloli', async (req, res, next) => {


    const Lol = JSON.parse(fs.readFileSync(__path + '/data/nsfwloli.json'));
    const randLol = Lol[Math.floor(Math.random() * Lol.length)];
    //data = await fetch(randLol).then(v => v.buffer());
    //await fs.writeFileSync(__path + '/tmp/lol.jpeg', data)
    res.json({
      url: `${randLol}`
    })

})

router.get('/anime/hinata', async (req, res, next) => {

    const Hinata = JSON.parse(fs.readFileSync(__path + '/data/hinata.json'));
    const randHin = Hinata[Math.floor(Math.random() * Hinata.length)];
    //data = await fetch(randHin).then(v => v.buffer());
    //await fs.writeFileSync(__path + '/tmp/Hinata.jpeg', data)
    res.json({
      url: `${randHin}`
    })

})



module.exports = router
