const express = require('express');  //funcionalidad
const morgan = require('morgan');  //informacion de las peticiones a la API
const cors = require('cors'); //quien puede acceder a nuestra api
const app = express(); //
const {mongoose} = require('./database');
const {json} = require('express');

// Middleware (representa funciones intermedias que van a ayudarnos en el desarrollo de la API):

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes:

app.use('/api/v1/movies', require('./routes/movie.route'));
app.use('/', (req, res) => res.send('API is in (api/v1/movies')); //establecemos nuestra API en api/v1/movies y aqui lo redireccionamos


// Settings:

app.set('port', process.env.PORT || 3000);

// Iniciar el Server:

app.listen(app.get('port'), () => {
    console.log('Server on port: ' , app.get('port'));
})