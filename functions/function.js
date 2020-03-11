const config = require('../config/config');

const pipeUrlStatus = (status, token) => {
    return {
        url: config.pipedrive_api,
        qs: {
            status: status,
            api_token: token
        }
    };
};

const pipeGetProducts = (id, token) => {
    return {
        url: `https://api.pipedrive.com/v1/deals/${id}/products?start=0&api_token`,
        qs: {
            api_token: token
        }
    }
}

const blingAddPedidos = (api, xml) => {
    return {
        url: 'https://bling.com.br/Api/v2/pedido/json/',
        qs: {
            apikey: api,
            xml: xml
        }
    }
}

const blingGetPedidos = (api, xml) => {
    return {
        url: 'https://bling.com.br/Api/v2/pedidos/json/',
        qs: {
            apikey: api,
        }
    }
}

function localTime () {
    let day = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    let hour = ` ${new Date().getHours()}:00:00`
    return (day + hour)
}

module.exports = {
    pipeUrlStatus: pipeUrlStatus,
    blingAddPedidos: blingAddPedidos,
    pipeGetProducts: pipeGetProducts,
    localTime: localTime,
    blingGetPedidos: blingGetPedidos
};