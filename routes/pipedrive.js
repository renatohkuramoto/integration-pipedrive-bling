const express = require('express');
const router = express();
const request = require('request');
const config = require('../config/config');
const func = require('../functions/function');

router.get('/', async (req, res) => {
    return res.status(200).send({message: {
        0: '/pipedrive/ganhos - retorna as vendas ganhas',
        1: '/pipedrive/perdas - retorna as vendas perdidas '
    }});
});

router.get('/ganhos', async (req, res) => {
    await request(func.pipeUrlStatus('won', config.tokenPipe), function (error, response, body) {
        if (error) res.status(500).send({error: 'ERRO INTERNO'});
        return res.status(200).send(JSON.parse(body));
    });
});

router.get('/perdas', async (req, res) => {
    await request(func.pipeUrlStatus('lost', config.tokenPipe), function (error, response, body) {
        if (error) res.status(500).send({error: 'ERRO INTERNO'});
        return res.status(200).send(JSON.parse(body));
    });
});

module.exports = router;