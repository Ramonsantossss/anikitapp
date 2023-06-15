__path = process.cwd()
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');


var app = express()
var mainrouter = require('./main')
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter);
//app.use('/api', mainrouter);


app.listen(8080, () => {
    console.log("Server running on port 8080")
})
