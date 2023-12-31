const express = require('express');
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const formidable = require('formidable');
//const api = require("./api");
const app = express();
const router = app
const __path = require('path');
const axios = require('axios');
const {
  fetchSearchGogo,
  fetchGogoRecentEpisodes,
  fetchGogoAnimeInfo,
  fetchGogoanimeEpisodeSource,
  episod,
  ytPlayMp4,
  tiktokdownload,
  ytPlayMp3,
  getVideoDownloadLink,
  getAudioDownloadLink,
  scrapeWebsite
} = require("./lib/scraper.js");
let clientInstance;
// INÍCIO DO BOT 

//const fs = require('fs');
const P = require('pino');
//const { Boom, badData } = require('@hapi/boom');
const fetch = require('node-fetch');
const chalk = require('chalk');
const { color, bgcolor, logs } = require('./lib/color');
const moment = require('moment-timezone');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const yts = require('yt-search');
const speed = require('performance-now');
const ffmpeg = require('fluent-ffmpeg');
const { exec, spawn, execSync } = require('child_process');
//const axios = require('axios');
const linkfy = require('linkifyjs');
//const { banner, getGroupAdmins, getBuffer, getRandom, getExtension } = require('./lib/funções');


// FIM DO BOT

// Configurando o middleware de sessão
app.use(session({
  secret: 'trevoso',
  resave: false,
  saveUninitialized: true,
}));


const { Schema } = mongoose;

// Configurando o parser para JSON e formulários
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const adminKey = 'sua_chave_do_administrador';

// Definindo o schema do usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  key: { type: String, required: true },
  saldo: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  ft: { type: String, default: null },
});

// Criando o modelo do usuário
const User = mongoose.model('User', userSchema);

//const mongoose = require('mongoose');

const cer = new mongoose.Schema({
  username: String,
  password: String,
  key: String,
  saldo: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  ft: String,
});



app.use(session({
  secret: 'suaChaveSecreta', // Uma chave secreta para assinar a sessão
  resave: false,            // Não salva a sessão a cada requisição
  saveUninitialized: true   // Salva uma sessão vazia, se ela não existir
}));


//const User = mongoose.model('User', cer);

//module.exports = User;
//const User = require('./user'); // Importe o modelo User definido no arquivo user.js

async function diminuirSaldo(username) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return false; // Usuário não encontrado
    }

    if (user.saldo > 0) {
      user.saldo--;
      await user.save(); // Salva os dados atualizados no MongoDB
      return true; // Saldo diminuído com sucesso
    } else {
      return false; // Saldo insuficiente
    }
  } catch (error) {
    console.error('Erro ao diminuir saldo:', error);
    return false;
  }
}


async function adicionarSaldo(username) {
  //async function adicionarTotal(username) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return false; // Usuário não encontrado
    }

    user.total += 1; // Adiciona 1 ao campo total
    await user.save(); // Salva os dados atualizados no MongoDB
    return true; // Total adicionado com sucesso
  } catch (error) {
    console.error('Erro ao adicionar total:', error);
    return false;
  }
}

// Função auxiliar para ler os dados dos usuários do banco de dados
async function readUsers() {
  try {
    return await User.find();
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return [];
  }
}

// Função auxiliar para salvar os dados dos usuários no banco de dados
async function saveUsers(users) {
  try {
    await User.deleteMany(); // Limpa a coleção de usuários no banco
    await User.insertMany(users); // Insere os novos dados de usuários
  } catch (error) {
    console.error('Erro ao salvar os dados no banco de dados:', error);
  }
}

Person = User




// Defina as rotas da sua API
app.get('/rota', (req, res) => {
  // Lógica da rota aqui
  res.json({ message: 'Sua API está funcionando!' });
});


function getMangaById(name, id) {
  var return_data = {};
  const nick = name;
  let bay; // Declare a variável 'bay' aqui
  return (async () => {
    try {
      let response = await axios.get("https://mangalivre.net/manga/" + name + "/" + id);
      bay = response.data;
      const $ = cheerio.load(bay);
      //console.log(response.data)
      const desc = $('meta[name="description"]').attr("content");

      const mangaName = $('span.series-title h1').text().trim();
      const mangaImageURL = $('meta[property="og:image"]').attr("content");
      const result = { "nome": mangaName, "desc": desc, "image": mangaImageURL }
      return_data.manga = result;
    } catch (error) {
      console.error(error.message);
    }
    return return_data;
  })();
}

// Exemplo de uso:
//https://mkit.trevodev.repl.co/manga//9522




async function aaaaaaa(name, id) {
  var return_data = {};
  const nick = name;
  let bay; // Declare a variável 'bay' aqui
  return (async () => {
    try {
      let response = await axios.get("https://mangalivre.net/manga/" + name + "/" + id);
      bay = response.data;
      const $ = cheerio.load(bay);
      //console.log(response.data)
      const desc = $('meta[name="description"]').attr("content");

      const mangaName = $('span.series-title h1').text().trim();
      const mangaImageURL = $('meta[property="og:image"]').attr("content");
      const result = { "nome": mangaName, "desc": desc, "image": mangaImageURL }
      return_data.manga = result;
    } catch (error) {
      console.error(error.message);
    }
    return return_data;
  })();
}
app.get("/dados", async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  aaaaaaa(name, id).then((adm) => {
    res.json(adm);
  });

});



// Endpoint para pesquisar por anime
app.get('/pesquisar/:query', async (req, res) => {
  const query = req.params.query;
  const url = `https://animeland.appanimeplus.tk/videoweb/api.php?action=searchvideo&searchword=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

// Endpoint para os animes tops
app.get('/tops', async (req, res) => {
  const url = "https://animeland.appanimeplus.tk/videoweb/api.php?action=trendingcategory&items=10";

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

// Endpoint para animes recentes
app.get('/novosep', async (req, res) => {
  const url = "https://animeland.appanimeplus.tk/videoweb/api.php?action=latestvideos";

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

// Endpoint para animes dublados
app.get('/dublados', async (req, res) => {
  const url = "https://animeland.appanimeplus.tk/videoweb/api.php?action=searchgenre&searchword=dublado&items=10";

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

// Endpoint para filmes de anime
app.get('/filmes', async (req, res) => {
  const url = "https://animeland.appanimeplus.tk/videoweb/api.php?action=searchgenre&searchword=filme&items=10";

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

// Endpoint para informações do anime por categoria
app.get('/anime/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  const url = `https://animeland.appanimeplus.tk/videoweb/api.php?action=viewcategory&categoryid=${categoryId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

// Endpoint para listar episódios de um anime por categoria
app.get('/episodios/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  const url = `https://animeland.appanimeplus.tk/videoweb/api.php?action=category_videos&category_id=${categoryId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});


app.get('/test', async(req, res) => {
  const aoba = path.join(__dirname, './views/test.html');
  res.sendFile(aoba)
})

// Rota de registro para criar um novo usuário
app.post('/register', async (req, res) => {
  const { username, password, numero, key } = req.body;

  // Verifica se o usuário já existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send('Nome de usuário já existe. Por favor, escolha outro.');
  }

  // Cria um novo usuário com a chave e o saldo padrão
  const ft = "https://telegra.ph/file/f932f56e19397b0c7c448.jpg"; // URL padrão da foto
  const saldo = 800; // Saldo padrão
  const total = 0;
  const newUser = new User({ username, password, key, saldo, total, ft });

  // Salva o novo usuário no banco de dados
  try {
    await newUser.save();
    return res.redirect('/entrar');
  } catch (error) {
    console.error('Erro ao salvar o usuário no banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

app.get('/registrarapi', async (req, res) => {
  const { username, password, numero, key } = req.query;
  if (!username || !password || !numero || !key) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send('Nome de usuário já existe. Por favor, escolha outro.');
  }
  const ft = "https://telegra.ph/file/f932f56e19397b0c7c448.jpg"; // URL padrão da foto
  const saldo = 800; // Saldo padrão
  const total = 0;
  const newUser = new User({ username, password, key, saldo, total, ft });
  try {
    await newUser.save();
    res.json({ username: newUser.username, saldo: newUser.saldo, ft: newUser.ft });
  } catch (error) {
    console.error('Erro ao salvar o usuário no banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

// Rota de login para autenticar o usuário
app.get('/login', (req, res) => {
  res.render('login'); // Renderiza a página de login (login.ejs)
});



//////

app.get('/clover', async (req, res) => {
  const username = req.query.username;
  if (username !== 'SUPREMO') {
    return res.status(401).send('Acesso não autorizado.');
  }
  const users = await User.find();

  res.render('index', { users });
});

// Resto do seu código
app.get('/entrarr', async (req, res) => {
//  const { nome, senha } = req.query;
  const nome = req.query.nome;
  const senha = req.query.senha;
  const username = `${nome}`;
  const password = `${senha}`;
  console.log(senha)
  try {
  const user = await User.findOne({ username }); // Procura o usuário pelo username
  //  const user = await User.findOne({ username });

    if (!user) {
      // Se o usuário não existe, retorna um erro 403 (Forbidden)
      return res.status(403).json(null);
    }
    console.log('Usuário do banco de dados:', user);

    // Aqui você poderia comparar a senha com a senha armazenada no banco de dados (se estiverem criptografadas)
    // Por motivos de segurança, geralmente não se compara diretamente as senhas, mas sim seus hashes
    // Se a senha conferir, você pode retornar os detalhes do usuário
    if (!user || user.password !== senha) {
      console.log('Falha na comparação:', user, password);
      return res.json(null);
    }

    console.log('Usuário autenticado:', user);
    res.json(user); // Retorna os dados do usuário em JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' });
  }
});

// Rota '/paginaPrincipal' para lidar com a autenticação
app.post('/logg', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verifique o email e a senha no banco de dados ou em algum mecanismo de autenticação
    if (email === 'usuario@example.com' && password === 'senha') {
      // Autenticação bem-sucedida
      req.session.user = email;
      req.session.senha = password;
      res.status(200).json({ message: 'Autenticação bem-sucedida' });
    } else {
      // Nome de usuário ou senha incorretos
      res.status(401).json({ message: 'Nome de usuário ou senha incorretos. Por favor, tente novamente.' });
    }
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.' });
  }
});



app.post('/confirma', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).send('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
    }

    // Salva o username e a senha do usuário na sessão para autenticação
    req.session.username = user.username;
    req.session.password = user.password;

    res.redirect(`/edit/${user.username}`);
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

// Após a autenticação bem-sucedida no servidor Express
app.post('/login', async (req, res) => {
  const { username, password, key } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).send('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
    }

    // Salva o username do usuário na sessão para autenticação
    req.session.username = user.username;

    // Salva informações no localStorage após autenticação
    localStorage.setItem('username', user.username);
    localStorage.setItem('key', key);

    res.redirect(`/perfil/${user.username}/${key}/${password}`);
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});


app.post('/paginaPrincipal', async (req, res) => {
  const { username, password, key } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).send('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
    }
    req.session.user = username;
    req.session.senha = password;
    // Salva informações no localStorage após autenticação
    
    res.redirect(`/anikit`);
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar a sessão:', err);
    }
    res.redirect('/'); // Redireciona para a página de login após encerrar a sessão
  });
});

// Rota de perfil do usuário
app.get('/perfil', async (req, res) => {
  const username = req.session.user;
  const password = req.session.senha;
  const user = await User.findOne({ username });
  const users = user
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    res.render('profile', { user });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

// Rota de edição de perfil do usuário
app.get('/editar/:username', async (req, res) => {
  const username = req.session.user;
  const key = username;
  const password = req.session.senha;
  const aoao = 'SUPREMO'
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    if (key !== aoao && user.key !== key) {
      return res.status(401).send('Acesso não autorizado para editar.');
    }

    res.render('edit', { user });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

app.post('/edit/:username', async (req, res) => {
  const { username } = req.params;
  const { password, key, ft, saldo } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    // Atualiza a senha apenas se for fornecida uma nova senha
    if (password) {
      user.password = password;
    }

    // Atualiza a chave apenas se for fornecida uma nova chave
    if (key) {
      user.key = key;
    }

    // Atualiza o saldo apenas se for fornecido um novo saldo
    if (saldo) {
      user.saldo = saldo;
    }

    // Atualiza a foto apenas se for fornecida uma nova URL da foto (ft)
    if (ft) {
      user.ft = ft;
    }

    // Salva as alterações no banco de dados
    await user.save();

    res.redirect(`/logout`);
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

// Restante do código do Express e configurações...

app.get('/anikit', async (req, res) => {
  // Recupera informações do localStorage
  const username = req.session.user;
  const password = req.session.senha;
  // console.log(username, password)
  const key = password;
  // const { username, key } = req.query;

// Use as informações como necessário
console.log('Username do localStorage:', username);
console.log('Key do localStorage:', key);

  // console.log(username, password)
  //const key = password;
  // const { username, key } = req.query;

  try {
    const user = await User.findOne({ username, password });
    const users = user
    if (!user) {
      const htmlPath = path.join(__dirname, './views/login.html');
      res.sendFile(htmlPath);
    }
    const quantidadeRegistrados = await User.countDocuments();
    const topUsers = await User.find().sort({ total: -1 }).limit(7);
    // console.log(quantidadeRegistrados)
    res.render('principal', { user, users, topUsers, quantidade: quantidadeRegistrados });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});
//////////////////

app.get('/nsfw', async(req, res) => {
  const username = req.session.user;
  const password = req.session.senha;
  const key = password;
  try {
    const user = await User.findOne({ username, password });
    const users = user
    if (!user) {
      const htmlPath = path.join(__dirname, './views/login.html');
      res.sendFile(htmlPath);
    }
    // console.log(quantidadeRegistrados)
    res.render('nsfw', { user, users });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
})

app.get('/downloads', async(req, res) => {
  const username = req.session.user;
  const password = req.session.senha;
  const key = password;
  try {
    const user = await User.findOne({ username, password });
    const users = user
    if (!user) {
      const htmlPath = path.join(__dirname, './views/login.html');
      res.sendFile(htmlPath);
    }
    // console.log(quantidadeRegistrados)
    res.render('downloads', { user, users });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
})

app.get('/sfw', async(req, res) => {
  const username = req.session.user;
  const password = req.session.senha;
  const key = password;
  try {
    const user = await User.findOne({ username, password });
    const users = user
    if (!user) {
      const htmlPath = path.join(__dirname, './views/login.html');
      res.sendFile(htmlPath);
    }
    // console.log(quantidadeRegistrados)
    res.render('sfw', { user, users });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
})

app.get('/doisd', async(req, res) => {
  const username = req.session.user;
  const password = req.session.senha;
  const key = password;
  try {
    const user = await User.findOne({ username, password });
    const users = user
    if (!user) {
      const htmlPath = path.join(__dirname, './views/login.html');
      res.sendFile(htmlPath);
    }
    // console.log(quantidadeRegistrados)
    res.render('doisd', { user, users });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
})

app.get('/', async (req, res) => {
  const username = req.session.user;
  const password = req.session.senha;
  // console.log(username, password)
  const key = password;
  // const { username, key } = req.query;

  try {
    const user = await User.findOne({ username, password });
    const users = user
    if (!user) {
      const htmlPath = path.join(__dirname, './views/login.html');
      res.sendFile(htmlPath);
    }

    const topUsers = await User.find().sort({ total: -1 }).limit(7);
    res.render('principal', { user, users, topUsers });
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    return res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
  }
});

app.get('/ver/:username', async (req, res) => {
  const username = req.params.username;
  const dados = await User.findOne({ username });
  // console.log(dados);
  res.render('usuario', { dados });
});

app.get('/entrar', (req, res) => {
  const htmlPath = path.join(__dirname, './views/login.html');
  res.sendFile(htmlPath);
});

app.get('/new', (req, res) => {
  const htmlPath = path.join(__dirname, './views/registro.html');
  res.sendFile(htmlPath);
});


////////// registro do mangas kit

// server.js

function getMangaById(name, id) {
  var return_data;
  const nick = name;
  let bay; // Declare a variável 'bay' aqui
  return (async () => {
    try {
      let response = await axios.get("https://mangalivre.net/manga/" + name + "/" + id);
      bay = response.data;
      const $ = cheerio.load(bay);
      //  console.log(response.data)
      const descriptionContent = $('meta[name="description"]').attr("content");
      const foto = $('meta[property="og:image"]').attr("content");
      const groups = [];
      $('ul.scans-list li').each((index, element) => {
        const priority = $(element).find('h2.priority').text();
        const scanlator = $(element).find('span.separator').next().text();
        const chapters = $(element).find('span.chapters').text().trim();
        groups.push({ priority, scanlator, chapters });
      });
      const result = { "nome": name, "id": id, "desc": descriptionContent, "foto": foto }
      return result;
    } catch (error) {
      console.error(error.message);
    }
  })();
}


app.get("/manga/:name/:id", async (req, res) => {
  const name = req.params.name
  const id = req.params.id;
  getMangaById(ab, aa).then((response) => {
    res.json(response);
  });
});


app.get("/search", (req, res) => {
  const name = req.query.q;
  let resultInstance;

  async function fetchData() {
    try {
      const response = await fetch(`https://zany-pear-deer-gown.cyclic.cloud/search?q=${name}`);
      const resultado = await response.json();
      resultInstance = resultado;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  fetchData().then(() => {
    res.json(resultInstance);
  });
});

app.get("/chapters/:id/", async (req, res) => {
  const id = req.params.id;
  let resultInstance;

  async function fetchData() {
    try {
      const response = await fetch(`https://zany-pear-deer-gown.cyclic.cloud/chapters/${id}`);
      const resultado = await response.json();
      resultInstance = resultado;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  fetchData().then(() => {
    res.json(resultInstance);
  });
});

app.get("/genres/", (_req, res) => {
  let resultInstance;

  async function fetchData() {
    try {
      const response = await fetch(`https://zany-pear-deer-gown.cyclic.cloud/genres`);
      const resultado = await response.json();
      resultInstance = resultado;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  fetchData().then(() => {
    res.json(resultInstance);
  });
});

app.get("/recents", (req, res) => {
  res.redirect("/recents/1");
});

app.get("/recents/:page", (req, res) => {
  let resultInstance;

  async function fetchData() {
    try {
      const response = await fetch(`https://zany-pear-deer-gown.cyclic.cloud/recents/1`);
      const resultado = await response.json();
      resultInstance = resultado;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  fetchData().then(() => {
    res.json(resultInstance);
  });
});

app.get("/popular/", async (_req, res) => {
  res.redirect("/popular/1");
});

app.get("/popular/:page", (req, res) => {
  const page = req.params.page;
  let resultInstance;

  async function fetchData() {
    try {
      const response = await fetch(`https://zany-pear-deer-gown.cyclic.cloud/popular/${page}`);
      const resultado = await response.json();
      resultInstance = resultado;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  fetchData().then(() => {
    res.json(resultInstance);
  });
});

app.get("/top/:page", (req, res) => {
  const page = req.params.page;
  let resultInstance;

  async function fetchData() {
    try {
      const response = await fetch(`https://zany-pear-deer-gown.cyclic.cloud/top/${page}`);
      const resultado = await response.json();
      resultInstance = resultado;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  fetchData().then(() => {
    res.json(resultInstance);
  });
});

app.get("/top/", async (_req, res) => {
  res.redirect("/top/1");
});




// Definir um modelo de usuário (usando o Mongoose)
const salvar = new mongoose.Schema({
  username: String,
  password: String,
});
const Pessoa = mongoose.model('usuarios', salvar);

app.use(bodyParser.json());

// Rota de registro de usuário
app.post('/reg', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifique se o usuário já existe
    const existingUser = await Pessoa.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Hash da senha antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie um novo usuário
    const newUser = new User({
      username,
      password: hashedPassword,
      favoritos: [],
      historico: [],
    });

    await newUser.save();

    return res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota de login
app.post('/log', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Encontre o usuário no banco de dados
    const user = await Pessoa.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifique a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gere um token JWT para o usuário
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

//////////////

router.get('/recent-episodes', async (req, res) => {
  const page = req.query.page;
  const type = req.query.type;

  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
    const data = await fetchGogoRecentEpisodes({ page, type });
    res.json(data).status(200)


  } else {
    console.log('Saldo insuficiente.');
  }
});

router.get('/epis/:animeId', async (req, res) => {
  const animeId = req.params.animeId;
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
    const data = await episod({ animeId });
    res.json(data).status(200);
  } else {
    console.log('Saldo insuficiente.');
  }

});

router.get('pesquisamanga', async (req, res) => {
  const ainaim = req.query.ainaim
  const got = require('got');

  async function searchManga(name) {
    var return_data = { "mangas": [] };
    const form = "search=" + name;

    try {
      let response = await got.post(
        "https://mangalivre.net/lib/search/series.json", {
        body: form,
        headers: {
          "x-requested-with": "XMLHttpRequest",
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      // Convertendo a resposta para JSON
      const responseData = JSON.parse(response.body);

      // Verificando se a chave 'series' existe na resposta
      if (responseData.series) {
        for (let serie of responseData.series) {
          return_data.mangas.push({
            "id_serie": serie.id_serie,
            "name": serie.name,
            "label": serie.label,
            "score": serie.score,
            "value": serie.value,
            "author": serie.author,
            "artist": serie.artist,
            "image": serie.cover,
            "categories": serie.categories.map((categorie) => { return { "name": categorie.name, "id_category": categorie.id_category }; }),
          });
        }
      }

      return return_data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Chamando a função e lidando com a promessa retornada
  searchManga(ainaim)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error(error);
    });
})

router.get('/info/:animeId', async (req, res) => {
  const animeId = req.params.animeId;
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
    const data = await fetchGogoAnimeInfo({ animeId });
    res.json([data]).status(200);
  } else {
    console.log('Saldo insuficiente.');
  }
});


router.get('/popular', async (req, res) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
    fetch(encodeURI("https://animaster.onrender.com/api/popular/1"))
      .then(response => response.json())
      .then(data => {
        res.json(data.results).status(200);
      })
  } else {
    console.log('Saldo insuficiente.');
  }
})

router.get('/watch/:episodeId', async (req, res) => {
  const episodeId = req.params.episodeId;
  const data = await fetchGogoanimeEpisodeSource({ episodeId });
  res.json([data]).status(200);
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
  } else {
    console.log('Saldo insuficiente.');
  }
})

// ACABO;

app.get('/anikit/tiktok', async (req, res) => {
  var videoUrl = req.query.videoUrl
  if (!videoUrl) return res.json({ "error": "faltouo parâmetro videoUrl" })
  //const getVideoDownloadLink = require("./data/youtube.js")
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
    const bad = require('./lib/tkdl.js');

    console.log('Links dos vídeos encontrados:');
    bad.ttdownloader(videoUrl)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get("/anikit/playmp4", async (req, res, next) => {
  var query = req.query.query
  if (!query) return res.json({ "error": "faltouo parâmetro query" })
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
    ytPlayMp4(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    console.log('Saldo insuficiente.');
  }
});

app.get("/anikit/playmp3", async (req, res, next) => {
  const { username, key, query } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    ytPlayMp3(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    console.log('Saldo insuficiente.');
  }
});



app.get('/anikit/ytmp4', async (req, res) => {
  var videoUrl = req.query.videoUrl
  if (!videoUrl) return res.json({ "error": "faltouo parâmetro videoUrl" })
  //const getVideoDownloadLink = require("./data/youtube.js")
  // Exemplo de uso
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
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
  } else {
    console.log('Saldo insuficiente.');
  }

})

app.get('/anikit/ytmp3', async (req, res) => {
  var videoUrl = req.query.videoUrl
  if (!videoUrl) return res.json({ "error": "faltouo parâmetro videoUrl" })
  //const getAudioDownloadLink = require("./data/youtube.js")
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {
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
  } else {
    console.log('Saldo insuficiente.');
  }

});


app.get('/nsfw/ahegao', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ahegao = JSON.parse(fs.readFileSync(__dirname + '/data/ahegao.json'));
    const randahegao = ahegao[Math.floor(Math.random() * ahegao.length)];

    res.json({
      url: `${randahegao}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/ass', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ass = JSON.parse(fs.readFileSync(__dirname + '/data/ass.json'));
    const randass = ass[Math.floor(Math.random() * ass.length)];

    res.json({
      url: `${randass}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/bdsm', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const bdsm = JSON.parse(fs.readFileSync(__dirname + '/data/bdsm.json'));
    const randbdsm = bdsm[Math.floor(Math.random() * bdsm.length)];

    res.json({
      url: `${randbdsm}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/blowjob', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const blowjob = JSON.parse(fs.readFileSync(__dirname + '/data/blowjob.json'));
    const randblowjob = blowjob[Math.floor(Math.random() * blowjob.length)];

    res.json({
      url: `${randblowjob}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/cuckold', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const cuckold = JSON.parse(fs.readFileSync(__dirname + '/data/cuckold.json'));
    const randcuckold = cuckold[Math.floor(Math.random() * cuckold.length)];

    res.json({
      url: `${randcuckold}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/cum', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const cum = JSON.parse(fs.readFileSync(__dirname + '/data/cum.json'));
    const randcum = cum[Math.floor(Math.random() * cum.length)];

    res.json({
      url: `${randcum}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/ero', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ero = JSON.parse(fs.readFileSync(__dirname + '/data/ero.json'));
    const randero = ero[Math.floor(Math.random() * ero.length)];

    res.json({
      url: `${randero}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/memes', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const meme = JSON.parse(fs.readFileSync(__dirname + '/data/memes-video.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/femdom', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const femdom = JSON.parse(fs.readFileSync(__dirname + '/data/femdom.json'));
    const randfemdom = femdom[Math.floor(Math.random() * femdom.length)];

    res.json({
      url: `${randfemdom}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/foot', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const foot = JSON.parse(fs.readFileSync(__dirname + '/data/foot.json'));
    const randfoot = foot[Math.floor(Math.random() * foot.length)];

    res.json({
      url: `${randfoot}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/gangbang', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const gangbang = JSON.parse(fs.readFileSync(__dirname + '/data/gangbang.json'));
    const randgangbang = gangbang[Math.floor(Math.random() * gangbang.length)];

    res.json({
      url: `${randgangbang}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/glasses', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const glasses = JSON.parse(fs.readFileSync(__dirname + '/data/glasses.json'));
    const randglasses = glasses[Math.floor(Math.random() * glasses.length)];

    res.json({
      url: `${randglasses}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/hentai', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const hentai = JSON.parse(fs.readFileSync(__dirname + '/data/hentai.json'));
    const randhentai = hentai[Math.floor(Math.random() * hentai.length)];

    res.json({
      url: `${randhentai}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/gifs', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const gifs = JSON.parse(fs.readFileSync(__dirname + '/data/gifs.json'));
    const randgifs = gifs[Math.floor(Math.random() * gifs.length)];

    res.json({
      url: `${randgifs}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/jahy', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const jahy = JSON.parse(fs.readFileSync(__dirname + '/data/jahy.json'));
    const randjahy = jahy[Math.floor(Math.random() * jahy.length)];

    res.json({
      url: `${randjahy}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/manga', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const manga = JSON.parse(fs.readFileSync(__dirname + '/data/manga.json'));
    const randmanga = manga[Math.floor(Math.random() * manga.length)];

    res.json({
      url: `${randmanga}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/masturbation', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const masturbation = JSON.parse(fs.readFileSync(__dirname + '/data/masturbation.json'));
    const randmasturbation = masturbation[Math.floor(Math.random() * masturbation.length)];

    res.json({
      url: `${randmasturbation}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/neko', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const neko = JSON.parse(fs.readFileSync(__dirname + '/data/neko.json'));
    const randneko = neko[Math.floor(Math.random() * neko.length)];

    res.json({
      url: `${randneko}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/orgy', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const orgy = JSON.parse(fs.readFileSync(__dirname + '/data/orgy.json'));
    const randorgy = orgy[Math.floor(Math.random() * orgy.length)];

    res.json({
      url: `${randorgy}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/panties', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const panties = JSON.parse(fs.readFileSync(__dirname + '/data/panties.json'));
    const randpanties = panties[Math.floor(Math.random() * panties.length)];

    res.json({
      url: `${randpanties}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/pussy', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const pussy = JSON.parse(fs.readFileSync(__dirname + '/data/pussy.json'));
    const randpussy = pussy[Math.floor(Math.random() * pussy.length)];

    res.json({
      url: `${randpussy}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/neko2', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const neko2 = JSON.parse(fs.readFileSync(__dirname + '/data/neko2.json'));
    const randneko2 = neko2[Math.floor(Math.random() * neko2.length)];

    res.json({
      url: `${randneko2}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/tentacles', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const tentacles = JSON.parse(fs.readFileSync(__dirname + '/data/tentacles.json'));
    const randtentacles = tentacles[Math.floor(Math.random() * tentacles.length)];

    res.json({
      url: `${randtentacles}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/thighs', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const thighs = JSON.parse(fs.readFileSync(__dirname + '/data/thighs.json'));
    const randthighs = thighs[Math.floor(Math.random() * thighs.length)];

    res.json({
      url: `${randthighs}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/yuri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const yuri = JSON.parse(fs.readFileSync(__dirname + '/data/yuri.json'));
    const randyuri = yuri[Math.floor(Math.random() * yuri.length)];

    res.json({
      url: `${randyuri}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nsfw/zettai', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const zettai = JSON.parse(fs.readFileSync(__dirname + '/data/zettai.json'));
    const randzettai = zettai[Math.floor(Math.random() * zettai.length)];

    res.json({
      url: `${randzettai}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/keneki', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const keneki = JSON.parse(fs.readFileSync(__dirname + '/data/keneki.json'));
    const randkeneki = keneki[Math.floor(Math.random() * keneki.length)];

    res.json({
      url: `${randkeneki}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/megumin', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const megumin = JSON.parse(fs.readFileSync(__dirname + '/data/megumin.json'));
    const randmegumin = megumin[Math.floor(Math.random() * megumin.length)];

    res.json({
      url: `${randmegumin}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/yotsuba', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const yotsuba = JSON.parse(fs.readFileSync(__dirname + '/data/yotsuba.json'));
    const randyotsuba = yotsuba[Math.floor(Math.random() * yotsuba.length)];

    res.json({
      url: `${randyotsuba}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shinomiya', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shinomiya = JSON.parse(fs.readFileSync(__dirname + '/data/shinomiya.json'));
    const randshinomiya = shinomiya[Math.floor(Math.random() * shinomiya.length)];

    res.json({
      url: `${randshinomiya}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/yumeko', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const yumeko = JSON.parse(fs.readFileSync(__dirname + '/data/yumeko.json'));
    const randyumeko = yumeko[Math.floor(Math.random() * yumeko.length)];

    res.json({
      url: `${randyumeko}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/tejina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const tejina = JSON.parse(fs.readFileSync(__dirname + '/data/tejina.json'));
    const randtejina = tejina[Math.floor(Math.random() * tejina.length)];

    res.json({
      url: `${randtejina}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/chiho', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const chiho = JSON.parse(fs.readFileSync(__dirname + '/data/chiho.json'));
    const randchiho = chiho[Math.floor(Math.random() * chiho.length)];

    res.json({
      url: `${randchiho}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/18/video', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const vid = require("./data/pack.js")
    const video_18 = vid.video_18
    const danvid = video_18[Math.floor(Math.random() * video_18.length)];

    res.json({
      url: `${danvid}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/18/travazap', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const tra = require("./data/pack.js")
    const travazap = tra.travazap
    const traft = travazap[Math.floor(Math.random() * travazap.length)];

    res.json({
      url: `${traft}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/18/foto_18', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }
  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const tra = require("./data/pack.js")
    const foto_18 = tra.foto_18
    const traft = foto_18[Math.floor(Math.random() * foto_18.length)];

    res.json({
      url: `${traft}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/toukachan', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const toukachan = JSON.parse(fs.readFileSync(__dirname + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];

    res.json({
      url: `${randtoukachan}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/akira', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const akira = JSON.parse(fs.readFileSync(__dirname + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];

    res.json({
      url: `${randakira}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/itori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const itori = JSON.parse(fs.readFileSync(__dirname + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];

    res.json({
      url: `${randitori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kurumi', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kurumi = JSON.parse(fs.readFileSync(__dirname + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];

    res.json({
      url: `${randkurumi}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/miku', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const miku = JSON.parse(fs.readFileSync(__dirname + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];

    res.json({
      url: `${randmiku}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/pokemon', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const pokemon = JSON.parse(fs.readFileSync(__dirname + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

    res.json({
      url: `${randpokemon}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/ryujin', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ryujin = JSON.parse(fs.readFileSync(__dirname + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];

    res.json({
      url: `${randryujin}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/rose', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const rose = JSON.parse(fs.readFileSync(__dirname + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];

    res.json({
      url: `${randrose}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kaori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kaori = JSON.parse(fs.readFileSync(__dirname + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];

    res.json({
      url: `${randkaori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shizuka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shizuka = JSON.parse(fs.readFileSync(__dirname + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];

    res.json({
      url: `${randshizuka}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kaga', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kaga = JSON.parse(fs.readFileSync(__dirname + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];

    res.json({
      url: `${randkaga}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kotori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kotori = JSON.parse(fs.readFileSync(__dirname + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];

    res.json({
      url: `${randkotori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/mikasa', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const mikasa = JSON.parse(fs.readFileSync(__dirname + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];

    res.json({
      url: `${randmikasa}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/akiyama', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const akiyama = JSON.parse(fs.readFileSync(__dirname + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];

    res.json({
      url: `${randakiyama}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/gremory', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const gremory = JSON.parse(fs.readFileSync(__dirname + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];

    res.json({
      url: `${randgremory}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/isuzu', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const isuzu = JSON.parse(fs.readFileSync(__dirname + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];

    res.json({
      url: `${randisuzu}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/cosplay', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const cosplay = JSON.parse(fs.readFileSync(__dirname + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];

    res.json({
      url: `${randcosplay}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shina = JSON.parse(fs.readFileSync(__dirname + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];

    res.json({
      url: `${randshina}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kagura', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kagura = JSON.parse(fs.readFileSync(__dirname + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];

    res.json({
      url: `${randkagura}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shinka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shinka = JSON.parse(fs.readFileSync(__dirname + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];

    res.json({
      url: `${randshinka}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/eba', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const eba = JSON.parse(fs.readFileSync(__dirname + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];

    res.json({
      url: `${randeba}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/deidara', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Deidara = JSON.parse(fs.readFileSync(__dirname + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];

    res.json({
      url: `${randDeidara}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})



app.get('/nime/jeni', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const jeni = JSON.parse(fs.readFileSync(__dirname + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];

    res.json({
      url: `${randjeni}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/random/meme', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const meme = JSON.parse(fs.readFileSync(__dirname + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})
app.get('/nime/toukachan', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const toukachan = JSON.parse(fs.readFileSync(__dirname + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];

    res.json({
      url: `${randtoukachan}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/akira', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const akira = JSON.parse(fs.readFileSync(__dirname + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];

    res.json({
      url: `${randakira}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/itori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const itori = JSON.parse(fs.readFileSync(__dirname + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];

    res.json({
      url: `${randitori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kurumi', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kurumi = JSON.parse(fs.readFileSync(__dirname + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];

    res.json({
      url: `${randkurumi}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/miku', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const miku = JSON.parse(fs.readFileSync(__dirname + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];

    res.json({
      url: `${randmiku}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/pokemon', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const pokemon = JSON.parse(fs.readFileSync(__dirname + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

    res.json({
      url: `${randpokemon}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/ryujin', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ryujin = JSON.parse(fs.readFileSync(__dirname + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];

    res.json({
      url: `${randryujin}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/rose', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const rose = JSON.parse(fs.readFileSync(__dirname + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];

    res.json({
      url: `${randrose}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kaori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kaori = JSON.parse(fs.readFileSync(__dirname + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];

    res.json({
      url: `${randkaori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shizuka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shizuka = JSON.parse(fs.readFileSync(__dirname + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];

    res.json({
      url: `${randshizuka}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kaga', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kaga = JSON.parse(fs.readFileSync(__dirname + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];

    res.json({
      url: `${randkaga}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kotori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kotori = JSON.parse(fs.readFileSync(__dirname + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];

    res.json({
      url: `${randkotori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/mikasa', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const mikasa = JSON.parse(fs.readFileSync(__dirname + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];

    res.json({
      url: `${randmikasa}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/akiyama', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const akiyama = JSON.parse(fs.readFileSync(__dirname + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];

    res.json({
      url: `${randakiyama}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/gremory', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const gremory = JSON.parse(fs.readFileSync('./data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    console.log(randgremory)
    res.json({
      url: `${randgremory}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/isuzu', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const isuzu = JSON.parse(fs.readFileSync(__dirname + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];

    res.json({
      url: `${randisuzu}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/cosplay', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const cosplay = JSON.parse(fs.readFileSync(__dirname + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];

    res.json({
      url: `${randcosplay}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shina = JSON.parse(fs.readFileSync(__dirname + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];

    res.json({
      url: `${randshina}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kagura', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const kagura = JSON.parse(fs.readFileSync(__dirname + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];

    res.json({
      url: `${randkagura}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shinka', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const shinka = JSON.parse(fs.readFileSync(__dirname + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];

    res.json({
      url: `${randshinka}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/eba', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const eba = JSON.parse(fs.readFileSync(__dirname + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];

    res.json({
      url: `${randeba}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/deidara', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Deidara = JSON.parse(fs.readFileSync(__dirname + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];

    res.json({
      url: `${randDeidara}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})



app.get('/nime/jeni', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const jeni = JSON.parse(fs.readFileSync(__dirname + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];

    res.json({
      url: `${randjeni}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/random/meme', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const meme = JSON.parse(fs.readFileSync(__dirname + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];

    res.json({
      url: `${randmeme}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/wallpaper/satanic', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const satanic = JSON.parse(fs.readFileSync(__dirname + '/data/satanic.json'));
    const randsatanic = satanic[Math.floor(Math.random() * satanic.length)];

    res.json({
      url: `${randsatanic}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})



app.get('/nime/itachi', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Itachi = JSON.parse(fs.readFileSync(__dirname + '/data/itachi.json'));
    const randItachi = Itachi[Math.floor(Math.random() * Itachi.length)];

    res.json({
      url: `${randItachi}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/madara', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Madara = JSON.parse(fs.readFileSync(__dirname + '/data/madara.json'));
    const randMadara = Madara[Math.floor(Math.random() * Madara.length)];

    res.json({
      url: `${randMadara}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/yuki', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Yuki = JSON.parse(fs.readFileSync(__dirname + '/data/yuki.json'));
    const randYuki = Yuki[Math.floor(Math.random() * Yuki.length)];

    res.json({
      url: `${randYuki}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/wallpaper/asuna', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const asuna = JSON.parse(fs.readFileSync(__dirname + '/data/asuna.json'));
    const randasuna = asuna[Math.floor(Math.random() * asuna.length)];

    res.json({
      url: `${randasuna}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/ayuzawa', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ayuzawa = JSON.parse(fs.readFileSync(__dirname + '/data/ayuzawa.json'));
    const randayuzawa = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];

    res.json({
      url: `${randayuzawa}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/chitoge', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const chitoge = JSON.parse(fs.readFileSync(__dirname + '/data/chitoge.json'));
    const randchitoge = chitoge[Math.floor(Math.random() * chitoge.length)];

    res.json({
      url: `${randchitoge}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/emilia', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const emilia = JSON.parse(fs.readFileSync(__dirname + '/data/emilia.json'));
    const randemilia = emilia[Math.floor(Math.random() * emilia.length)];
    console.log(randemilia)
    res.json({
      url: `${randemilia}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/hestia', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const hestia = JSON.parse(fs.readFileSync(__dirname + '/data/hestia.json'));
    const randhestia = hestia[Math.floor(Math.random() * hestia.length)];

    res.json({
      url: `${randhestia}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/inori', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const inori = JSON.parse(fs.readFileSync(__dirname + '/data/inori.json'));
    const randinori = inori[Math.floor(Math.random() * inori.length)];

    res.json({
      url: `${randinori}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/ana', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const ana = JSON.parse(fs.readFileSync(__dirname + '/data/ana.json'));
    const randana = ana[Math.floor(Math.random() * ana.length)];

    res.json({
      url: `${randana}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/boruto', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Boruto = JSON.parse(fs.readFileSync(__dirname + '/data/boruto.json'));
    const randBoruto = Boruto[Math.floor(Math.random() * Boruto.length)];

    res.json({
      url: `${randBoruto}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/erza', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Erza = JSON.parse(fs.readFileSync(__dirname + '/data/erza.json'));
    const randErza = Erza[Math.floor(Math.random() * Erza.length)];

    res.json({
      url: `${randErza}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kakasih', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Kakasih = JSON.parse(fs.readFileSync(__dirname + '/data/kakasih.json'));
    const randKakasih = Kakasih[Math.floor(Math.random() * Kakasih.length)];

    res.json({
      url: `${randKakasih}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/sagiri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Sagiri = JSON.parse(fs.readFileSync(__dirname + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];

    res.json({
      url: `${randSagiri}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/minato', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Minato = JSON.parse(fs.readFileSync(__dirname + '/data/minato.json'));
    const randMinato = Minato[Math.floor(Math.random() * Minato.length)];

    res.json({
      url: `${randMinato}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/naruto', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Naruto = JSON.parse(fs.readFileSync(__dirname + '/data/naruto.json'));
    const randNaruto = Naruto[Math.floor(Math.random() * Naruto.length)];

    res.json({
      url: `${randNaruto}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/nezuko', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Nezuko = JSON.parse(fs.readFileSync(__dirname + '/data/nezuko.json'));
    const randNezuko = Nezuko[Math.floor(Math.random() * Nezuko.length)];

    res.json({
      url: `${randNezuko}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/onepiece', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Pic = JSON.parse(fs.readFileSync(__dirname + '/data/onepiece.json'));
    const randPic = Pic[Math.floor(Math.random() * Pic.length)];

    res.json({
      url: `${randPic}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/rize', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Rize = JSON.parse(fs.readFileSync(__dirname + '/data/rize.json'));
    const randRize = Rize[Math.floor(Math.random() * Rize.length)];

    res.json({
      url: `${randRize}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/sakura', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Sakura = JSON.parse(fs.readFileSync(__dirname + '/data/sakura.json'));
    const randSakura = Sakura[Math.floor(Math.random() * Sakura.length)];

    res.json({
      url: `${randSakura}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/sasuke', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Sasuke = JSON.parse(fs.readFileSync(__dirname + '/data/sasuke.json'));
    const randSasuke = Sasuke[Math.floor(Math.random() * Sasuke.length)];

    res.json({
      url: `${randSasuke}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/tsunade', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Su = JSON.parse(fs.readFileSync(__dirname + '/data/tsunade.json'));
    const randSu = Su[Math.floor(Math.random() * Su.length)];

    res.json({
      url: `${randSu}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/montor', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Mon = JSON.parse(fs.readFileSync(__dirname + '/data/montor.json'));
    const randMon = Mon[Math.floor(Math.random() * Mon.length)];

    res.json({
      url: `${randMon}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})
// ain
app.get('/nime/mobil', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Mob = JSON.parse(fs.readFileSync(__dirname + '/data/mobil.json'));
    const randMob = Mob[Math.floor(Math.random() * Mob.length)];

    res.json({
      url: `${randMob}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/anime', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Wai23 = JSON.parse(fs.readFileSync(__dirname + '/data/wallhp2.json'));
    const randWai23 = Wai23[Math.floor(Math.random() * Wai23.length)];

    res.json({
      url: `${randWai23}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/wallhp', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Wai22 = JSON.parse(fs.readFileSync(__dirname + '/data/wallhp.json'));
    const randWai22 = Wai22[Math.floor(Math.random() * Wai22.length)];

    res.json({
      url: `${randWai22}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/waifu2', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Wai2 = JSON.parse(fs.readFileSync(__dirname + '/data/waifu2.json'));
    const randWai2 = Wai2[Math.floor(Math.random() * Wai2.length)];

    res.json({
      url: `${randWai2}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/waifu', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Wai = JSON.parse(fs.readFileSync(__dirname + '/data/waifu.json'));
    const randWai = Wai[Math.floor(Math.random() * Wai.length)];

    res.json({
      url: `${randWai}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/hekel', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    Hekel = JSON.parse(fs.readFileSync(__dirname + '/data/hekel.json'));
    const randHekel = Hekel[Math.floor(Math.random() * Hekel.length)]

    res.json({
      url: `${randHekel}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/kucing', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    Kucing = JSON.parse(fs.readFileSync(__dirname + '/data/kucing.json'));
    const randKucing = Kucing[Math.floor(Math.random() * Kucing.length)]

    res.json({
      url: `${randKucing}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/wallpaper/pubg', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    Pubg = JSON.parse(fs.readFileSync(__dirname + '/data/pubg.json'));
    const randPubg = Pubg[Math.floor(Math.random() * Pubg.length)]

    res.json({
      url: `${randPubg}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/wallpaper/ppcouple', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    Pp = JSON.parse(fs.readFileSync(__dirname + '/data/profil.json'));
    const randPp = Pp[Math.floor(Math.random() * Pp.length)]

    res.json({
      url: `${randPp}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/wallpaper/anjing', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    Anjing = JSON.parse(fs.readFileSync(__dirname + '/data/anjing.json'));
    const randAnjing = Anjing[Math.floor(Math.random() * Anjing.length)]

    res.json({
      url: `${randAnjing}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/doraemon', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    Dora = JSON.parse(fs.readFileSync(__dirname + '/data/doraemon.json'));
    const randDora = Dora[Math.floor(Math.random() * Dora.length)]

    res.json({
      url: `${randDora}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/elaina', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Elaina = JSON.parse(fs.readFileSync(__dirname + '/data/elaina.json'))
    const randElaina = Elaina[Math.floor(Math.random() * Elaina.length)]
    //tansole.log(randLoli)

    res.json({
      url: `${randElaina}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/loli', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Loli = JSON.parse(fs.readFileSync(__dirname + '/data/loli.json'))
    const randLoli = Loli[Math.floor(Math.random() * Loli.length)]
    //tansole.log(randLoli)

    res.json({
      url: `${randLoli}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/yuri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Yuri = JSON.parse(fs.readFileSync(__dirname + '/data/yuri.json'))
    const randYuri = Yuri[Math.floor(Math.random() * Yuri.length)]
    //tansole.log(randTech))
    res.json({
      url: `${randYuri}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/nime/cecan', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const cecan = JSON.parse(fs.readFileSync(__dirname + '/data/cecan.json'));
    const randCecan = cecan[Math.floor(Math.random() * cecan.length)];
    //data = await fetch(randCecan).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/cecan.jpeg', data)
    res.json({
      url: `${randCecan}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})


app.get('/wallpaper/aesthetic', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Aesthetic = JSON.parse(fs.readFileSync(__dirname + '/data/aesthetic.json'));
    const randAesthetic = Aesthetic[Math.floor(Math.random() * Aesthetic.length)];
    //data = await fetch(randAesthetic).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/aesthetic.jpeg', data)
    res.json({
      url: `${randAesthetic}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})



app.get('/nime/sagiri', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Sagiri = JSON.parse(fs.readFileSync(__dirname + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];
    //data = await fetch(randSagiri).then(v => v.buffer())
    //await fs.writeFileSync(__dirname + '/tmp/sagiri.jpeg', data)
    res.json({
      url: `${randSagiri}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/shota', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Shota = JSON.parse(fs.readFileSync(__dirname + '/data/shota.json'));
    const randShota = Shota[Math.floor(Math.random() * Shota.length)];
    //data = await fetch(randShota).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/shota.jpeg', data)
    res.json({
      url: `${randShota}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/nsfwloli', async (req, res, next) => {
  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Lol = JSON.parse(fs.readFileSync(__dirname + '/data/nsfwloli.json'));
    const randLol = Lol[Math.floor(Math.random() * Lol.length)];
    //data = await fetch(randLol).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/lol.jpeg', data)
    res.json({
      url: `${randLol}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

app.get('/nime/hinata', async (req, res, next) => {

  const { username, key } = req.query;
  const users = Person
  // Verifica se o usuário existe e a chave está correta
  const user = await User.findOne({ username, key });
  if (!user) {
    return res.status(401).send('Acesso não autorizado.');
  }

  const resultadoDiminuicao = diminuirSaldo(username);
  const add = adicionarSaldo(username)
  if (resultadoDiminuicao && add) {

    const Hinata = JSON.parse(fs.readFileSync(__dirname + '/data/hinata.json'));
    const randHin = Hinata[Math.floor(Math.random() * Hinata.length)];
    //data = await fetch(randHin).then(v => v.buffer());
    //await fs.writeFileSync(__dirname + '/tmp/Hinata.jpeg', data)
    res.json({
      url: `${randHin}`
    })
  } else {
    console.log('Saldo insuficiente.');
  }
})

// Função auxiliar para salvar os dados dos usuários no arquivo JSON
function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error('Erro ao salvar os dados no arquivo users.json:', error);
  }
}



app.get('/mangakit', async (req, res) => {
  try {
    const query = req.query.q || ''; // Define o valor padrão como uma string vazia
    const apiUrl = `https://ruby-careful-skunk.cyclic.app/search?q=${query}`;
    const response_2 = await axios.get(apiUrl);
    const mangas = response_2.data.mangas;
    /*
        res.render('search', { mangas, query }); // Passa o valor de query para o template
        */
    const response = await axios.get(`https://ruby-careful-skunk.cyclic.app/recents`);
    const topesResponse = await axios.get(`https://ruby-careful-skunk.cyclic.app/top/1`);
    const topesdois = await axios.get(`https://ruby-careful-skunk.cyclic.app/top/2`);

    if (!response.ok && !topesResponse.ok && !topesdois.ok) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const dai = await response.data;
    const info = dai.mangas;

    const topesData = await topesResponse.data;
    const mai = await topesdois.data

    res.render('pagina', { data: topesData, zera: mai, info, mangas, query });
  } catch (error) {
    console.error('Error:', error.message);
    //res.status(500).send('An error occurred while fetching manga data.');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
});


app.get('/manga/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foto = req.query.foto;
    // console.log(id);

    const response = await fetch(encodeURI(`https://ruby-careful-skunk.cyclic.app/chapters/${id}`));

    if (!response.ok) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const data = await response.json();
    const info = data;
    // console.log(data);

    const fotos = info.images;
    res.render('manga', { info, foto });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching manga data.');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
});


app.get('/ler/:id', async (req, res) => {

  try {
    const id = req.params.id;
    // console.log(id);

    const response = await fetch(encodeURI(`https://ruby-careful-skunk.cyclic.app/pages/${id}`));

    if (!response.ok) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const data = await response.json();
    const info = data;
    // console.log(data);

    const fotos = info.images;
    res.render('ler', { info, fotos });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching manga data.');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

});

// ... Código anterior

app.get('/search', async (req, res) => {
  try {
    const query = req.query.q || ''; // Define o valor padrão como uma string vazia
    const apiUrl = `https://ruby-careful-skunk.cyclic.app/search?q=${query}`;
    const response = await axios.get(apiUrl);
    const mangas = response.data.mangas;

    res.render('search', { mangas, query }); // Passa o valor de query para o template
  } catch (error) {
    console.error('Erro ao buscar mangás:', error);
    res.status(500).send('Ocorreu um erro ao buscar os mangás.');
  }
});

// Rota para exibir a página de busca sem parâmetros
app.get('/search', (req, res) => {
  res.render('search', { mangas: [], query: '' });
});









app.get('/all', async (req, res) => {
  try {
  const obterMangas = require('./test'); // Ajuste para o nome correto do arquivo
    const mangas = await obterMangas.manga(); // Chama a função que realiza o scraping

    res.json(mangas); // Retorna os mangás encontrados como resposta JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/infomanga', async (req, res) => {
  try {
  const nome = req.query.nome
  const obterMangas = require('./test'); // Ajuste para o nome correto do arquivo
    const mangas = await obterMangas.obterInformacoesManga(nome); // Chama a função que realiza o scraping

    res.json(mangas); // Retorna os mangás encontrados como resposta JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/capsmanga', async (req, res) => {
  try {
  const nome = req.query.nome
  const obterMangas = require('./test'); // Ajuste para o nome correto do arquivo
    const mangas = await obterMangas.encontrarCapitulosComImagens(nome); // Chama a função que realiza o scraping

    res.json(mangas); // Retorna os mangás encontrados como resposta JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Importe suas funções aqui
const { assistir, fetchAnimesRecents, genero, veranime } = require('./api.js');

//app.use(express.json());

// Rota para assistir um episódio
app.get('/assistir/:epId', async (req, res) => {
  const { epId } = req.params;
  try {
    // Chame a função assistir para obter informações do episódio
    const episodeInfo = await assistir(epId);
    res.json(episodeInfo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações do episódio' });
  }
});

// Rota para buscar informações de animes recentes
app.get('/animes-recentes', async (req, res) => {
  try {
    // Chame a função fetchAnimesRecents para obter informações de animes recentes
    const episodes = await fetchAnimesRecents();
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações de animes recentes' });
  }
});

// Rota para buscar animes por gênero
app.get('/genero/:nameGenero', async (req, res) => {
  const { nameGenero } = req.params;
  try {
    // Chame a função genero para obter informações de animes por gênero
    const tvShows = await genero(nameGenero);
    res.json(tvShows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações dos animes por gênero' });
  }
});


// Rota da API que chama a função veranime
app.get('/veranime/:name', async (req, res) => {
  const { name } = req.params;
  try {
    // Chame a função veranime para obter informações de um anime específico
    const animeInfo = await veranime(name);

    // Defina o cabeçalho Content-Type para JSON
    res.setHeader('Content-Type', 'application/json');
    res.send(animeInfo)
    // Envie os dados JSON como resposta
    res.status(200).send(animeInfo);
  } catch (error) {
    console.error('Erro na rota da API:', error);
    res.status(500).send({ error: 'Erro ao buscar informações do anime' });
  }
});




const PORT = 8080;

// Conexão com o MongoDB

mongoose
  .connect('mongodb+srv://anikit:EPt96b3yMx3wmEC@cluster0.ukzkyjq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectou ao banco de dados!');
    app.listen(PORT);
  })
  .catch((err) => console.log(err));