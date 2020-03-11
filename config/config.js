const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                mongodb_url: 'MONDOATLAS_URL',
                pipedrive_api: 'https://api.pipedrive.com/v1/deals?status&start=0&api_token',
                blingAddPedidos: 'https://bling.com.br/Api/v2/pedido/json/',
                blingGetPedidos: 'https://bling.com.br/Api/v2/pedidos/json/',
                tokenBling: 'TOKEN_BLING',
                tokenPipe: 'TOKEN_PIPE'
            }
    }
};

console.log(`Ambiente: ${env.toUpperCase()}`)
module.exports = config();