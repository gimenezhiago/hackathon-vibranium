const express = require('express');
const app = express();
const path = require('path');
const {fetch} = require('node-fetch')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/Home/Home.html')
});

async function busca(lat, long){
    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=-31.1757352,-40.9700277&apikey=EbMZ5fZpYQLR45NDGzcPkPlkwHUOkEgg`)

}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

