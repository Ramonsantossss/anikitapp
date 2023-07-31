const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const router = app
const __path = require('path');

// Configurando o parser para JSON e formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const adminKey = 'sua_chave_do_administrador';

app.set("json spaces",2)


const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Verifica se o arquivo users.json existe e o cria com um objeto vazio caso não exista
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify({ users: [] }, null, 2));
}

// Função auxiliar para ler os dados dos usuários do arquivo JSON
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data).users;
  } catch (error) {
    console.error('Erro ao ler o arquivo users.json:', error);
    return [];
  }
}

// Rota para servir o arquivo HTML de registro
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, './views/registro.html');
  res.sendFile(htmlPath);
});

app.get('/clover', (req, res) => {
  const { key } = req.query;
  if (key !== adminKey) {
    return res.status(401).send('Acesso não autorizado para editar.');
  }
  const users = readUsers();
  res.render('index', { users });
});

app.get('/entrar', (req, res) => {
  const htmlPath = path.join(__dirname, './views/login.html');
  res.sendFile(htmlPath);
});

app.get('/editar/:username', (req, res) => {
  const { username } = req.params;
  const { key } = req.query;
  if (key !== adminKey) {
    return res.status(401).send('Acesso não autorizado para editar.');
  }
  const users = readUsers();
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).send('Usuário não encontrado.');
  }
  res.render('edit', { user });
});

app.post('/edit/:username', (req, res) => {
  const { username } = req.params;
  const { password, key, ft } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    return res.status(404).send('Usuário não encontrado.');
  }

  // Atualiza a senha apenas se for fornecida uma nova senha
  if (password) {
    users[userIndex].password = password;
  }

  // Atualiza a chave apenas se for fornecida uma nova chave
  if (key) {
    users[userIndex].key = key;
  }

  // Atualiza a ft apenas se for fornecida uma nova URL da foto (ft)
  if (ft) {
    users[userIndex].ft = ft;
  }

  saveUsers(users);
  res.redirect('/');
});



// Rota de perfil do usuário
app.get('/perfil/:username', (req, res) => {
  const { username } = req.params;
  const users = readUsers();
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).send('Usuário não encontrado.');
  }
  res.render('profile', { user });
});

// Rota de login para autenticar o usuário
// Rota POST para fazer login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  try {
    // Lê os dados de usuário do JSON de logins
    
    const users = readUsers();

    // Procura o usuário correspondente ao nome de usuário e senha informados
    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
      return res.status(401).send('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
    }

    // Redireciona para a rota protegida (neste caso, a rota '/anikit') com os parâmetros na URL
    res.redirect(`/anikit?username=${user.username}&key=${user.key}`);
  } catch (error) {
    console.error('Erro ao ler o arquivo de logins:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

app.get('/anikit', (req, res) => {
  const { username, key } = req.query;

  // Verifica se os valores de username e key estão presentes na URL
  if (!username || !key) {
    return res.status(401).send('Acesso não autorizado.');
  }

  // Lê os dados de usuário do JSON de logins
  const users = readUsers();

  // Procura o usuário correspondente ao nome de usuário e chave informados
  const user = users.find((user) => user.username === username && user.key === key);

  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  res.render('principal', { users });
});


// Rota de registro para criar um novo usuário
app.post('/register', (req, res) => {
  const { username, password, key } = req.body;

  const users = readUsers();

  // Verifica se o usuário já existe
  if (users.some((user) => user.username === username)) {
    return res.status(409).send('Nome de usuário já existe. Por favor, escolha outro.');
  }

  // Cria um novo usuário com a chave e o adiciona à lista
  const ft = "https://telegra.ph/file/020394500926d7d13fc69.jpg"
  const newUser = { username, password, key, ft };
  users.push(newUser);

  // Salva os usuários atualizados no arquivo JSON
  saveUsers(users);

  return res.redirect('/entrar');
});

// Rota protegida que requer chave e nome de usuário válidos
app.get('/protected', (req, res) => {
  const { username, key } = req.query;

  const users = readUsers();

  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  return res.send('Bem-vindo à rota protegida! Você está autorizado a acessá-la.');
});


app.get('/docs', (req, res) => {
  const htmlPath = path.join(__dirname, './views/docs.html');
  res.sendFile(htmlPath);
});




app.get('/editar/:username', (req, res) => {
  const { username } = req.params;
  const { key } = req.query;
  if (key !== adminKey) {
    return res.status(401).send('Acesso não autorizado para editar.');
  }
  const users = readUsers();
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).send('Usuário não encontrado.');
  }
  res.render('edit', { user });
});

app.post('/edit/:username', (req, res) => {
  const { username } = req.params;
  const { password, key } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    return res.status(404).send('Usuário não encontrado.');
  }
  users[userIndex].password = password;
  users[userIndex].key = key;
  saveUsers(users);
  res.redirect(`/anikit?username=${user.username}&key=${user.key}`);
});

app.post('/register', (req, res) => {
  const { username, password, key } = req.body;
  const users = readUsers();
  if (users.some((user) => user.username === username)) {
    return res.status(409).send('Nome de usuário já existe. Por favor, escolha outro.');
  }
  const newUser = { username, password, key };
  users.push(newUser);
  saveUsers(users);
  return res.redirect('/entrar');
});

app.get('/protected', (req, res) => {
  const { username, key } = req.query;
  const users = readUsers();
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
  return res.send('Bem-vindo à rota protegida! Você está autorizado a acessá-la.');
});

function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error('Erro ao salvar os dados no arquivo users.json:', error);
  }
}


var { ytPlayMp4, tiktokdownload, ytPlayMp3, getVideoDownloadLink, getAudioDownloadLink } = require('./data/youtube.js')
const listkey = ["anikit"];
 var { youtube } = require('./data/youtube.js')


app.get('/anikit/tiktok', async(req, res) => {
var videoUrl = req.query.videoUrl
if(!videoUrl) return res.json({"error": "faltouo parâmetro videoUrl"})
//const getVideoDownloadLink = require("./data/youtube.js")
const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
      tiktokdownload(videoUrl)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });

})


app.get("/anikit/playmp4", async (req, res, next) => {
var query = req.query.query
if(!query) return res.json({"error": "faltouo parâmetro query"})
    const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  } 
    ytPlayMp4(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });

});

app.get("/anikit/playmp3", async (req, res, next) => {
    const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
 
    ytPlayMp3(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
});



app.get('/anikit/ytmp4', async(req, res) => {
var videoUrl = req.query.videoUrl
if(!videoUrl) return res.json({"error": "faltouo parâmetro videoUrl"})
//const getVideoDownloadLink = require("./data/youtube.js")
// Exemplo de uso
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
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

app.get('/anikit/ytmp3', async(req, res) => {
var videoUrl = req.query.videoUrl
if(!videoUrl) return res.json({"error": "faltouo parâmetro videoUrl"})
//const getAudioDownloadLink = require("./data/youtube.js")
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
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


app.get('/nsfw/ahegao', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ahegao = JSON.parse(fs.readFileSync(__dirname + '/data/ahegao.json'));
    const randahegao = ahegao[Math.floor(Math.random() * ahegao.length)];

    res.json({
      url: `${randahegao}`
    })

})

app.get('/nsfw/ass', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ass = JSON.parse(fs.readFileSync(__dirname + '/data/ass.json'));
    const randass = ass[Math.floor(Math.random() * ass.length)];

    res.json({
      url: `${randass}`
    })

})

app.get('/nsfw/bdsm', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const bdsm = JSON.parse(fs.readFileSync(__dirname + '/data/bdsm.json'));
    const randbdsm = bdsm[Math.floor(Math.random() * bdsm.length)];

    res.json({
      url: `${randbdsm}`
    })

})

app.get('/nsfw/blowjob', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const blowjob = JSON.parse(fs.readFileSync(__dirname + '/data/blowjob.json'));
    const randblowjob = blowjob[Math.floor(Math.random() * blowjob.length)];

    res.json({
      url: `${randblowjob}`
    })

})

app.get('/nsfw/cuckold', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const cuckold = JSON.parse(fs.readFileSync(__dirname + '/data/cuckold.json'));
    const randcuckold = cuckold[Math.floor(Math.random() * cuckold.length)];

    res.json({
      url: `${randcuckold}`
    })

})

app.get('/nsfw/cum', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const cum = JSON.parse(fs.readFileSync(__dirname + '/data/cum.json'));
    const randcum = cum[Math.floor(Math.random() * cum.length)];

    res.json({
      url: `${randcum}`
    })

})

app.get('/nsfw/ero', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ero = JSON.parse(fs.readFileSync(__dirname + '/data/ero.json'));
    const randero = ero[Math.floor(Math.random() * ero.length)];

    res.json({
      url: `${randero}`
    })

})

app.get('/nsfw/femdom', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const femdom = JSON.parse(fs.readFileSync(__dirname + '/data/femdom.json'));
    const randfemdom = femdom[Math.floor(Math.random() * femdom.length)];

    res.json({
      url: `${randfemdom}`
    })

})

app.get('/nsfw/foot', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const foot = JSON.parse(fs.readFileSync(__dirname + '/data/foot.json'));
    const randfoot = foot[Math.floor(Math.random() * foot.length)];

    res.json({
      url: `${randfoot}`
    })

})

app.get('/nsfw/gangbang', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const gangbang = JSON.parse(fs.readFileSync(__dirname + '/data/gangbang.json'));
    const randgangbang = gangbang[Math.floor(Math.random() * gangbang.length)];

    res.json({
      url: `${randgangbang}`
    })

})

app.get('/nsfw/glasses', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const glasses = JSON.parse(fs.readFileSync(__dirname + '/data/glasses.json'));
    const randglasses = glasses[Math.floor(Math.random() * glasses.length)];

    res.json({
      url: `${randglasses}`
    })

})

app.get('/nsfw/hentai', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const hentai = JSON.parse(fs.readFileSync(__dirname + '/data/hentai.json'));
    const randhentai = hentai[Math.floor(Math.random() * hentai.length)];

    res.json({
      url: `${randhentai}`
    })

})

app.get('/nsfw/gifs', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const gifs = JSON.parse(fs.readFileSync(__dirname + '/data/gifs.json'));
    const randgifs = gifs[Math.floor(Math.random() * gifs.length)];

    res.json({
      url: `${randgifs}`
    })

})

app.get('/nsfw/jahy', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const jahy = JSON.parse(fs.readFileSync(__dirname + '/data/jahy.json'));
    const randjahy = jahy[Math.floor(Math.random() * jahy.length)];

    res.json({
      url: `${randjahy}`
    })

})

app.get('/nsfw/manga', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const manga = JSON.parse(fs.readFileSync(__dirname + '/data/manga.json'));
    const randmanga = manga[Math.floor(Math.random() * manga.length)];

    res.json({
      url: `${randmanga}`
    })

})

app.get('/nsfw/masturbation', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const masturbation = JSON.parse(fs.readFileSync(__dirname + '/data/masturbation.json'));
    const randmasturbation = masturbation[Math.floor(Math.random() * masturbation.length)];

    res.json({
      url: `${randmasturbation}`
    })

})

app.get('/nsfw/neko', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const neko = JSON.parse(fs.readFileSync(__dirname + '/data/neko.json'));
    const randneko = neko[Math.floor(Math.random() * neko.length)];

    res.json({
      url: `${randneko}`
    })

})

app.get('/nsfw/orgy', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const orgy = JSON.parse(fs.readFileSync(__dirname + '/data/orgy.json'));
    const randorgy = orgy[Math.floor(Math.random() * orgy.length)];

    res.json({
      url: `${randorgy}`
    })

})

app.get('/nsfw/panties', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const panties = JSON.parse(fs.readFileSync(__dirname + '/data/panties.json'));
    const randpanties = panties[Math.floor(Math.random() * panties.length)];

    res.json({
      url: `${randpanties}`
    })

})

app.get('/nsfw/pussy', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const pussy = JSON.parse(fs.readFileSync(__dirname + '/data/pussy.json'));
    const randpussy = pussy[Math.floor(Math.random() * pussy.length)];

    res.json({
      url: `${randpussy}`
    })

})

app.get('/nsfw/neko2', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const neko2 = JSON.parse(fs.readFileSync(__dirname + '/data/neko2.json'));
    const randneko2 = neko2[Math.floor(Math.random() * neko2.length)];

    res.json({
      url: `${randneko2}`
    })

})

app.get('/nsfw/tentacles', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const tentacles = JSON.parse(fs.readFileSync(__dirname + '/data/tentacles.json'));
    const randtentacles = tentacles[Math.floor(Math.random() * tentacles.length)];

    res.json({
      url: `${randtentacles}`
    })

})

app.get('/nsfw/thighs', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const thighs = JSON.parse(fs.readFileSync(__dirname + '/data/thighs.json'));
    const randthighs = thighs[Math.floor(Math.random() * thighs.length)];

    res.json({
      url: `${randthighs}`
    })

})

app.get('/nsfw/yuri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const yuri = JSON.parse(fs.readFileSync(__dirname + '/data/yuri.json'));
    const randyuri = yuri[Math.floor(Math.random() * yuri.length)];

    res.json({
      url: `${randyuri}`
    })

})

app.get('/nsfw/zettai', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const zettai = JSON.parse(fs.readFileSync(__dirname + '/data/zettai.json'));
    const randzettai = zettai[Math.floor(Math.random() * zettai.length)];

    res.json({
      url: `${randzettai}`
    })

})

app.get('/anime/keneki', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const keneki = JSON.parse(fs.readFileSync(__dirname + '/data/keneki.json'));
    const randkeneki = keneki[Math.floor(Math.random() * keneki.length)];

    res.json({
      url: `${randkeneki}`
    })

})

app.get('/anime/megumin', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const megumin = JSON.parse(fs.readFileSync(__dirname + '/data/megumin.json'));
    const randmegumin = megumin[Math.floor(Math.random() * megumin.length)];

    res.json({
      url: `${randmegumin}`
    })

})

app.get('/anime/yotsuba', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const yotsuba = JSON.parse(fs.readFileSync(__dirname + '/data/yotsuba.json'));
    const randyotsuba = yotsuba[Math.floor(Math.random() * yotsuba.length)];

    res.json({
      url: `${randyotsuba}`
    })

})

app.get('/anime/shinomiya', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shinomiya = JSON.parse(fs.readFileSync(__dirname + '/data/shinomiya.json'));
    const randshinomiya = shinomiya[Math.floor(Math.random() * shinomiya.length)];

    res.json({
      url: `${randshinomiya}`
    })

})

app.get('/anime/yumeko', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const yumeko = JSON.parse(fs.readFileSync(__dirname + '/data/yumeko.json'));
    const randyumeko = yumeko[Math.floor(Math.random() * yumeko.length)];

    res.json({
      url: `${randyumeko}`
    })

})

app.get('/anime/tejina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const tejina = JSON.parse(fs.readFileSync(__dirname + '/data/tejina.json'));
    const randtejina = tejina[Math.floor(Math.random() * tejina.length)];

    res.json({
      url: `${randtejina}`
    })

})

app.get('/anime/chiho', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const chiho = JSON.parse(fs.readFileSync(__dirname + '/data/chiho.json'));
    const randchiho = chiho[Math.floor(Math.random() * chiho.length)];

    res.json({
      url: `${randchiho}`
    })

})




app.get('/anime/toukachan', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const toukachan = JSON.parse(fs.readFileSync(__dirname + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];

    res.json({
      url: `${randtoukachan}`
    })

})

app.get('/anime/akira', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const akira = JSON.parse(fs.readFileSync(__dirname + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];

    res.json({
      url: `${randakira}`
    })

})

app.get('/anime/itori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const itori = JSON.parse(fs.readFileSync(__dirname + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];

    res.json({
      url: `${randitori}`
    })

})

app.get('/anime/kurumi', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kurumi = JSON.parse(fs.readFileSync(__dirname + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];

    res.json({
      url: `${randkurumi}`
    })

})

app.get('/anime/miku', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const miku = JSON.parse(fs.readFileSync(__dirname + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];

    res.json({
      url: `${randmiku}`
    })

})

app.get('/anime/pokemon', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const pokemon = JSON.parse(fs.readFileSync(__dirname + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

    res.json({
      url: `${randpokemon}`
    })

})

app.get('/anime/ryujin', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ryujin = JSON.parse(fs.readFileSync(__dirname + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];

    res.json({
      url: `${randryujin}`
    })

})

app.get('/anime/rose', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const rose = JSON.parse(fs.readFileSync(__dirname + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];

    res.json({
      url: `${randrose}`
    })

})

app.get('/anime/kaori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kaori = JSON.parse(fs.readFileSync(__dirname + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];

    res.json({
      url: `${randkaori}`
    })

})

app.get('/anime/shizuka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shizuka = JSON.parse(fs.readFileSync(__dirname + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];

    res.json({
      url: `${randshizuka}`
    })

})

app.get('/anime/kaga', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kaga = JSON.parse(fs.readFileSync(__dirname + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];

    res.json({
      url: `${randkaga}`
    })

})

app.get('/anime/kotori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kotori = JSON.parse(fs.readFileSync(__dirname + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    
    res.json({
      url: `${randkotori}`
    })

})

app.get('/anime/mikasa', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const mikasa = JSON.parse(fs.readFileSync(__dirname + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];

    res.json({
      url: `${randmikasa}`
    })

})

app.get('/anime/akiyama', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const akiyama = JSON.parse(fs.readFileSync(__dirname + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];

    res.json({
      url: `${randakiyama}`
    })

})

app.get('/anime/gremory', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const gremory = JSON.parse(fs.readFileSync(__dirname + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    
    res.json({
      url: `${randgremory}`
    })

})

app.get('/anime/isuzu', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const isuzu = JSON.parse(fs.readFileSync(__dirname + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];

    res.json({
      url: `${randisuzu}`
    })

})

app.get('/anime/cosplay', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const cosplay = JSON.parse(fs.readFileSync(__dirname + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];

    res.json({
      url: `${randcosplay}`
    })

})

app.get('/anime/shina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shina = JSON.parse(fs.readFileSync(__dirname + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];

    res.json({
      url: `${randshina}`
    })

})

app.get('/anime/kagura', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kagura = JSON.parse(fs.readFileSync(__dirname + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];

    res.json({
      url: `${randkagura}`
    })

})

app.get('/anime/shinka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shinka = JSON.parse(fs.readFileSync(__dirname + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];

    res.json({
      url: `${randshinka}`
    })

})

app.get('/anime/eba', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const eba = JSON.parse(fs.readFileSync(__dirname + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];

    res.json({
      url: `${randeba}`
    })

})

app.get('/anime/deidara', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Deidara = JSON.parse(fs.readFileSync(__dirname + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];

    res.json({
      url: `${randDeidara}`
    })

})



app.get('/anime/jeni', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const jeni = JSON.parse(fs.readFileSync(__dirname + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];

    res.json({
      url: `${randjeni}`
    })

})


app.get('/random/meme', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const meme = JSON.parse(fs.readFileSync(__dirname + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })

})
app.get('/anime/toukachan', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const toukachan = JSON.parse(fs.readFileSync(__dirname + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];

    res.json({
      url: `${randtoukachan}`
    })

})

app.get('/anime/akira', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const akira = JSON.parse(fs.readFileSync(__dirname + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];

    res.json({
      url: `${randakira}`
    })

})

app.get('/anime/itori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const itori = JSON.parse(fs.readFileSync(__dirname + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];

    res.json({
      url: `${randitori}`
    })

})

app.get('/anime/kurumi', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kurumi = JSON.parse(fs.readFileSync(__dirname + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];

    res.json({
      url: `${randkurumi}`
    })

})

app.get('/anime/miku', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const miku = JSON.parse(fs.readFileSync(__dirname + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];

    res.json({
      url: `${randmiku}`
    })

})

app.get('/anime/pokemon', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const pokemon = JSON.parse(fs.readFileSync(__dirname + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

    res.json({
      url: `${randpokemon}`
    })

})

app.get('/anime/ryujin', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ryujin = JSON.parse(fs.readFileSync(__dirname + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];

    res.json({
      url: `${randryujin}`
    })

})

app.get('/anime/rose', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const rose = JSON.parse(fs.readFileSync(__dirname + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];

    res.json({
      url: `${randrose}`
    })

})

app.get('/anime/kaori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kaori = JSON.parse(fs.readFileSync(__dirname + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];

    res.json({
      url: `${randkaori}`
    })

})

app.get('/anime/shizuka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shizuka = JSON.parse(fs.readFileSync(__dirname + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];

    res.json({
      url: `${randshizuka}`
    })

})

app.get('/anime/kaga', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kaga = JSON.parse(fs.readFileSync(__dirname + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];

    res.json({
      url: `${randkaga}`
    })

})

app.get('/anime/kotori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kotori = JSON.parse(fs.readFileSync(__dirname + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    
    res.json({
      url: `${randkotori}`
    })

})

app.get('/anime/mikasa', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const mikasa = JSON.parse(fs.readFileSync(__dirname + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];

    res.json({
      url: `${randmikasa}`
    })

})

app.get('/anime/akiyama', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const akiyama = JSON.parse(fs.readFileSync(__dirname + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];

    res.json({
      url: `${randakiyama}`
    })

})

app.get('/anime/gremory', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const gremory = JSON.parse(fs.readFileSync(__dirname + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    
    res.json({
      url: `${randgremory}`
    })

})

app.get('/anime/isuzu', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const isuzu = JSON.parse(fs.readFileSync(__dirname + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];

    res.json({
      url: `${randisuzu}`
    })

})

app.get('/anime/cosplay', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const cosplay = JSON.parse(fs.readFileSync(__dirname + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];

    res.json({
      url: `${randcosplay}`
    })

})

app.get('/anime/shina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shina = JSON.parse(fs.readFileSync(__dirname + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];

    res.json({
      url: `${randshina}`
    })

})

app.get('/anime/kagura', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const kagura = JSON.parse(fs.readFileSync(__dirname + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];

    res.json({
      url: `${randkagura}`
    })

})

app.get('/anime/shinka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const shinka = JSON.parse(fs.readFileSync(__dirname + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];

    res.json({
      url: `${randshinka}`
    })

})

app.get('/anime/eba', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const eba = JSON.parse(fs.readFileSync(__dirname + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];

    res.json({
      url: `${randeba}`
    })

})

app.get('/anime/deidara', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Deidara = JSON.parse(fs.readFileSync(__dirname + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];

    res.json({
      url: `${randDeidara}`
    })

})



app.get('/anime/jeni', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const jeni = JSON.parse(fs.readFileSync(__dirname + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];

    res.json({
      url: `${randjeni}`
    })

})


app.get('/random/meme', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const meme = JSON.parse(fs.readFileSync(__dirname + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })

})

app.get('/wallpaper/satanic', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const satanic = JSON.parse(fs.readFileSync(__dirname + '/data/satanic.json'));
    const randsatanic = satanic[Math.floor(Math.random() * satanic.length)];

    res.json({
      url: `${randsatanic}`
    })

})



app.get('/anime/itachi', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Itachi = JSON.parse(fs.readFileSync(__dirname + '/data/itachi.json'));
    const randItachi = Itachi[Math.floor(Math.random() * Itachi.length)];

    res.json({
      url: `${randItachi}`
    })

})

app.get('/anime/madara', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Madara = JSON.parse(fs.readFileSync(__dirname + '/data/madara.json'));
    const randMadara = Madara[Math.floor(Math.random() * Madara.length)];

    res.json({
      url: `${randMadara}`
    })

})

app.get('/anime/yuki', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Yuki = JSON.parse(fs.readFileSync(__dirname + '/data/yuki.json'));
    const randYuki = Yuki[Math.floor(Math.random() * Yuki.length)];

    res.json({
      url: `${randYuki}`
    })

})

app.get('/wallpaper/asuna', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const asuna = JSON.parse(fs.readFileSync(__dirname + '/data/asuna.json'));
    const randasuna = asuna[Math.floor(Math.random() * asuna.length)];

    res.json({
      url: `${randasuna}`
    })

})

app.get('/anime/ayuzawa', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ayuzawa = JSON.parse(fs.readFileSync(__dirname + '/data/ayuzawa.json'));
    const randayuzawa = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];

    res.json({
      url: `${randayuzawa}`
    })

})

app.get('/anime/chitoge', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const chitoge = JSON.parse(fs.readFileSync(__dirname + '/data/chitoge.json'));
    const randchitoge = chitoge[Math.floor(Math.random() * chitoge.length)];

    res.json({
      url: `${randchitoge}`
    })

})

app.get('/anime/emilia', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const emilia = JSON.parse(fs.readFileSync(__dirname + '/data/emilia.json'));
    const randemilia = emilia[Math.floor(Math.random() * emilia.length)];

    res.json({
      url: `${randemilia}`
    })

})

app.get('/anime/hestia', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const hestia = JSON.parse(fs.readFileSync(__dirname + '/data/hestia.json'));
    const randhestia = hestia[Math.floor(Math.random() * hestia.length)];

    res.json({
      url: `${randhestia}`
    })

})

app.get('/anime/inori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const inori = JSON.parse(fs.readFileSync(__dirname + '/data/inori.json'));
    const randinori = inori[Math.floor(Math.random() * inori.length)];

    res.json({
      url: `${randinori}`
    })

})

app.get('/anime/ana', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const ana = JSON.parse(fs.readFileSync(__dirname + '/data/ana.json'));
    const randana = ana[Math.floor(Math.random() * ana.length)];

    res.json({
      url: `${randana}`
    })

})

app.get('/anime/boruto', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Boruto = JSON.parse(fs.readFileSync(__dirname + '/data/boruto.json'));
    const randBoruto = Boruto[Math.floor(Math.random() * Boruto.length)];

    res.json({
      url: `${randBoruto}`
    })

})

app.get('/anime/erza', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Erza = JSON.parse(fs.readFileSync(__dirname + '/data/erza.json'));
    const randErza = Erza[Math.floor(Math.random() * Erza.length)];

    res.json({
      url: `${randErza}`
    })

})

app.get('/anime/kakasih', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Kakasih = JSON.parse(fs.readFileSync(__dirname + '/data/kakasih.json'));
    const randKakasih = Kakasih[Math.floor(Math.random() * Kakasih.length)];

    res.json({
      url: `${randKakasih}`
    })

})

app.get('/anime/sagiri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Sagiri = JSON.parse(fs.readFileSync(__dirname + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];

    res.json({
      url: `${randSagiri}`
    })

})

app.get('/anime/minato', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Minato = JSON.parse(fs.readFileSync(__dirname + '/data/minato.json'));
    const randMinato = Minato[Math.floor(Math.random() * Minato.length)];

    res.json({
      url: `${randMinato}`
    })

})

app.get('/anime/naruto', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Naruto = JSON.parse(fs.readFileSync(__dirname + '/data/naruto.json'));
    const randNaruto = Naruto[Math.floor(Math.random() * Naruto.length)];

    res.json({
      url: `${randNaruto}`
    })

})

app.get('/anime/nezuko', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Nezuko = JSON.parse(fs.readFileSync(__dirname + '/data/nezuko.json'));
    const randNezuko = Nezuko[Math.floor(Math.random() * Nezuko.length)];

    res.json({
      url: `${randNezuko}`
    })

})

app.get('/anime/onepiece', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Pic = JSON.parse(fs.readFileSync(__dirname + '/data/onepiece.json'));
    const randPic = Pic[Math.floor(Math.random() * Pic.length)];

    res.json({
      url: `${randPic}`
    })

})

app.get('/anime/rize', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Rize = JSON.parse(fs.readFileSync(__dirname + '/data/rize.json'));
    const randRize = Rize[Math.floor(Math.random() * Rize.length)];

    res.json({
      url: `${randRize}`
    })

})

app.get('/anime/sakura', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Sakura = JSON.parse(fs.readFileSync(__dirname + '/data/sakura.json'));
    const randSakura = Sakura[Math.floor(Math.random() * Sakura.length)];

    res.json({
      url: `${randSakura}`
    })

})

app.get('/anime/sasuke', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Sasuke = JSON.parse(fs.readFileSync(__dirname + '/data/sasuke.json'));
    const randSasuke = Sasuke[Math.floor(Math.random() * Sasuke.length)];

    res.json({
      url: `${randSasuke}`
    })

})

app.get('/anime/tsunade', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Su = JSON.parse(fs.readFileSync(__dirname + '/data/tsunade.json'));
    const randSu = Su[Math.floor(Math.random() * Su.length)];

    res.json({
      url: `${randSu}`
    })

})

app.get('/anime/montor', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Mon = JSON.parse(fs.readFileSync(__dirname + '/data/montor.json'));
    const randMon = Mon[Math.floor(Math.random() * Mon.length)];

    res.json({
      url: `${randMon}`
    })

})
// ain
app.get('/anime/mobil', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Mob = JSON.parse(fs.readFileSync(__dirname + '/data/mobil.json'));
    const randMob = Mob[Math.floor(Math.random() * Mob.length)];

    res.json({
      url: `${randMob}`
    })

})


app.get('/anime/anime', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Wai23 = JSON.parse(fs.readFileSync(__dirname + '/data/wallhp2.json'));
    const randWai23 = Wai23[Math.floor(Math.random() * Wai23.length)];

    res.json({
      url: `${randWai23}`
    })

})


app.get('/anime/wallhp', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Wai22 = JSON.parse(fs.readFileSync(__dirname + '/data/wallhp.json'));
    const randWai22 = Wai22[Math.floor(Math.random() * Wai22.length)];

    res.json({
      url: `${randWai22}`
    })

})

app.get('/anime/waifu2', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Wai2 = JSON.parse(fs.readFileSync(__dirname + '/data/waifu2.json'));
    const randWai2 = Wai2[Math.floor(Math.random() * Wai2.length)];

    res.json({
      url: `${randWai2}`
    })

})

app.get('/anime/waifu', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Wai = JSON.parse(fs.readFileSync(__dirname + '/data/waifu.json'));
    const randWai = Wai[Math.floor(Math.random() * Wai.length)];
    
    res.json({
      url: `${randWai}`
    })

})


app.get('/anime/hekel', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    Hekel = JSON.parse(fs.readFileSync(__dirname + '/data/hekel.json'));
    const randHekel = Hekel[Math.floor(Math.random() * Hekel.length)]

    res.json({
      url: `${randHekel}`
    })

})

app.get('/anime/kucing', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    Kucing = JSON.parse(fs.readFileSync(__dirname + '/data/kucing.json'));
    const randKucing = Kucing[Math.floor(Math.random() * Kucing.length)]

    res.json({
      url: `${randKucing}`
    })

})

app.get('/wallpaper/pubg', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    Pubg = JSON.parse(fs.readFileSync(__dirname + '/data/pubg.json'));
    const randPubg = Pubg[Math.floor(Math.random() * Pubg.length)]

    res.json({
      url: `${randPubg}`
    })

})

app.get('/wallpaper/ppcouple', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    Pp = JSON.parse(fs.readFileSync(__dirname + '/data/profil.json'));
    const randPp = Pp[Math.floor(Math.random() * Pp.length)]

    res.json({
      url: `${randPp}`
    })

})

app.get('/wallpaper/anjing', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    Anjing = JSON.parse(fs.readFileSync(__dirname + '/data/anjing.json'));
    const randAnjing = Anjing[Math.floor(Math.random() * Anjing.length)]

    res.json({
      url: `${randAnjing}`
    })

})

app.get('/anime/doraemon', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    Dora = JSON.parse(fs.readFileSync(__dirname + '/data/doraemon.json'));
    const randDora = Dora[Math.floor(Math.random() * Dora.length)]

    res.json({
      url: `${randDora}`
    })

})


app.get('/anime/elaina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Elaina = JSON.parse(fs.readFileSync(__dirname + '/data/elaina.json'))
    const randElaina = Elaina[Math.floor(Math.random() * Elaina.length)]
    //tansole.log(randLoli)

    res.json({
      url: `${randElaina}`
    })

})


app.get('/anime/loli', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Loli = JSON.parse(fs.readFileSync(__dirname + '/data/loli.json'))
    const randLoli = Loli[Math.floor(Math.random() * Loli.length)]
    //tansole.log(randLoli)

    res.json({
      url: `${randLoli}`
    })

})


app.get('/anime/yuri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Yuri = JSON.parse(fs.readFileSync(__dirname + '/data/yuri.json'))
    const randYuri = Yuri[Math.floor(Math.random() * Yuri.length)]
    //tansole.log(randTech))
    res.json({
      url: `${randYuri}`
    })

})


app.get('/anime/cecan', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const cecan = JSON.parse(fs.readFileSync(__dirname + '/data/cecan.json'));
    const randCecan = cecan[Math.floor(Math.random() * cecan.length)];
    //data = await fetch(randCecan).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/cecan.jpeg', data)
    res.json({
      url: `${randCecan}`
    })

})


app.get('/wallpaper/aesthetic', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Aesthetic = JSON.parse(fs.readFileSync(__dirname + '/data/aesthetic.json'));
    const randAesthetic = Aesthetic[Math.floor(Math.random() * Aesthetic.length)];
    //data = await fetch(randAesthetic).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/aesthetic.jpeg', data)
    res.json({
      url: `${randAesthetic}`
    })

})



app.get('/anime/sagiri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Sagiri = JSON.parse(fs.readFileSync(__dirname + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];
    //data = await fetch(randSagiri).then(v => v.buffer())
    //await fs.writeFileSync(__dirname + '/tmp/sagiri.jpeg', data)
    res.json({
      url: `${randSagiri}`
    })

})

app.get('/anime/shota', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Shota = JSON.parse(fs.readFileSync(__dirname + '/data/shota.json'));
    const randShota = Shota[Math.floor(Math.random() * Shota.length)];
    //data = await fetch(randShota).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/shota.jpeg', data)
    res.json({
      url: `${randShota}`
    })

})

app.get('/anime/nsfwloli', async (req, res, next) => {
  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Lol = JSON.parse(fs.readFileSync(__dirname + '/data/nsfwloli.json'));
    const randLol = Lol[Math.floor(Math.random() * Lol.length)];
    //data = await fetch(randLol).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/lol.jpeg', data)
    res.json({
      url: `${randLol}`
    })

})

app.get('/anime/hinata', async (req, res, next) => {

  const { username, key } = req.query;
  const users = readUsers();
  // Verifica se o usuário existe e a chave está correta
  const user = users.find((user) => user.username === username && user.key === key);
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

    const Hinata = JSON.parse(fs.readFileSync(__dirname + '/data/hinata.json'));
    const randHin = Hinata[Math.floor(Math.random() * Hinata.length)];
    //data = await fetch(randHin).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/Hinata.jpeg', data)
    res.json({
      url: `${randHin}`
    })

})

// Função auxiliar para salvar os dados dos usuários no arquivo JSON
function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error('Erro ao salvar os dados no arquivo users.json:', error);
  }
}

const PORT = 8070;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
