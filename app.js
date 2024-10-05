const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
app.use(express.static('public'))

app.engine('handlebars', exphbs.engine({defaultLayout:'default'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home')
});
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
});
app.get('/feedback', (req, res) => {
    res.render('feedback')
});
app.get('/map', (req, res) => {
    res.render('map')
});

// async function busca(lat, long){
//     const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=EbMZ5fZpYQLR45NDGzcPkPlkwHUOkEgg`)
//     const result = await 
// }

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

