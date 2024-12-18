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
    const respone = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=EbMZ5fZpYQLR45NDGzcPkPlkwHUOkEgg`)
    const data = await respone.json()
    return await data.timelines
    return null
}
app.get('/', (req, res) => {
    res.render('home')
});
app.get('/dashboard', (req, res) => {
    busca(req.query.lat?req.query.lat:50,req.query.long?req.query.long:50).then((result) => {
        res.render('dashboard',{data: result.hourly, lat: req.query.lat?req.query.lat:50, long: req.query.long?req.query.long:50})
        
    }).catch((err) => {
        
    });
});
app.get('/feedback', (req, res) => {
    res.render('feedback')
});
app.get('/map', (req, res) => {
    res.render('map')
});

app.get("/relatorio", (req,res)=>{
    busca(req.query.lat?req.query.lat:50,req.query.long?req.query.long:50).then((result) => {
        console.log(result.daily[0])
        res.render('relatorio',{data: result.daily[0], lat: req.query.lat?req.query.lat:50, long: req.query.long?req.query.long:50})
        
    }).catch((err) => {
        
    });
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

