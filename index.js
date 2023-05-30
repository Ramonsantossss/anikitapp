
var favicon = require('serve-favicon');
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
var router = express.Router();
//var mainrouter = require('./routes/main'),
//    apirouter = require('./routes/api')

var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
//app.use(favicon(__path +'/views/favicon.ico'))
app.use(express.static("public"))


router.get('/', (req, res) => {
    res.sendFile(__path + '/paginas/index.html')
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})
