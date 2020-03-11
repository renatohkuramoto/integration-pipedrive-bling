const express = require('express');
const router = express();

router.get('/', async (req, res) => {
    return res.status(200).send({
        0: {endpoint: 'http://localhost:3000/pipedrive/ganhos'},
        1: {endpoint: 'http://localhost:3000/pipedrive/perdas'},
        2: {endpoint: 'http://localhost:3000/bling'},
        3: {endpoint: 'http://localhost:3000/bling/consolidado'}
    });
});

module.exports = router;