const fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
app.use(express.static('public'))

app.engine('handlebars', exphbs.engine({defaultLayout:'default'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

async function busca(lat, long) {
    console.log('fouhf')
    const respone = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=VGoRO84RCL16s58fk6hCePorgDKGQrZp`)
    const data = await respone.json()
    return await data.timelines.hourly
}
app.get('/', (req, res) => {
    res.render('home')
});
app.get('/dashboard', (req, res) => {
    busca(req.query.lat,req.query.long).then((result) => {
        res.render('dashboard',{data: result})
        
    }).catch((err) => {
        
    });
});
app.get('/feedback', (req, res) => {
    res.render('feedback')
});
app.get('/map', (req, res) => {
    res.render('map')
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

