const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const config = require('./config/config');
const pipedrive = require('./integration/pipedrive-bling');

// Paramêtros de conexão com o MongoDB
const url = config.mongodb_url;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useUnifiedTopology: false };

// Conexão com o MongoDB
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

// Status da conexão
mongoose.connection.on('erro', (err) => {
    console.log('Erro na conexão ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada');
});

// Body-Parser - Obj JSON
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Rotas
const indexRoute = require('./routes/index');
const pipeRoute = require('./routes/pipedrive');
const blingRoute = require('./routes/bling');
app.use('/', indexRoute);
app.use('/pipedrive', pipeRoute);
app.use('/bling', blingRoute);

// Executa a Integração em intervalo
setInterval(function () {
    console.log('STARTED!');
    pipedrive.integrationBlingPedidos();
},5000);


app.listen(3000);

module.exports = app;