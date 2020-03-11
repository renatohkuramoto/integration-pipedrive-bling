const express = require('express');
const router = express();
const request = require('request');
const config = require('../config/config');
const func = require('../functions/function');
const mongoBling = require('../models/mongoBling');

// EndPoint que retorna os pedidos do Bling
router.get('/', async (req, res) => {
    await request(func.blingGetPedidos(config.tokenBling), function (error, response, body){
        if (error) return res.status(500).send({error: 'ERRO INTERNO'});
        return res.status(200).send(JSON.parse(body));
    });
});

// EndPoint que retorna os dados do MongoDB
router.get('/consolidado', async (req, res) => {
    try {
        const consolidado = await mongoBling.find({}).sort({data_pedido: 'descending'});
        return res.status(200).send(consolidado);
    } catch {
        return res.status(500).send({error: 'ERRO INTERNO'});
    }
});

module.exports = router;