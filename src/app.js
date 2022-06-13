const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const res = require('express/lib/response');

// Define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const name = 'Piotr Pik';
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req,res) => {
    res.render('index', {
        title:"Home",
        name
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help page",
        name
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
       return res.send({ error: 'Your must provide a search term'})
    }
    res.send({latitude: 130, longitude: 111})
});


app.get('/products', (req,res) => {
    if(!req.query.search) {
       return res.send({ error: 'Your must provide a search term'})
    }
    res.send({products: []})
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'Help article not found',
        name
    })
});

app.get('*', (req, res) => {
    res.render('404',{
        message: 'Page not found',
        name
    })
});

app.listen(port, () => {
    console.log('Serer is up on port ' + port);
})