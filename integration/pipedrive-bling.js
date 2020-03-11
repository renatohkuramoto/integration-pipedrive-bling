const jsonpath = require('jsonpath');
const xmlbuilder = require('xmlbuilder');
const request = require('request');
const config = require('../config/config');
const func = require('../functions/function');
const mongoBling = require('../models/mongoBling');

// Função que integra o Pipedrive com o Bling
async function integrationBlingPedidos () {
    // Recebe os dados da API do Pipedrive pelo status
    await request(func.pipeUrlStatus('won', config.tokenPipe), function (error, response, body) {
        if (error) console.log('ERROR integrationBlingPedidos');
        if (response.statusCode != 400 || response.statusCode != 500 || response.statusCode != 401){
            let localDate = func.localTime()
            let jsonDeal = jsonpath.query(JSON.parse(body), `$..data[?(@.won_time>='${localDate}')]`);
            let countDeal = Object.keys(jsonDeal).length;
            
            for (i = 0; i < countDeal; i++) {
                let orderId = (jsonDeal[i].id);
                let customerName = (jsonDeal[i].person_id.name);
                let customerPhone = (jsonDeal[i].person_id.phone[0].value);
                let customerEmail = (jsonDeal[i].person_id.email[0].value);
                // Recebe os produtos de cada ordem
                request(func.pipeGetProducts(orderId, config.tokenPipe), function(error, response, body) {
                    if (error) console.log('ERROR pipeGetProducts');
                    if (response.statusCode != 400 || response.statusCode != 500 || response.statusCode != 401) {
                        let jsonProd = JSON.parse(body);
                        let nameProd = jsonpath.query(jsonProd, '$.data[*].name');
                        let codProd = jsonpath.query(jsonProd, '$.data[*].product_id');
                        let qtdProd = jsonpath.query(jsonProd, '$.data[*].quantity');
                        let priceProd = jsonpath.query(jsonProd, '$.data[*].item_price');
                        let countProd = (Object.keys(codProd).length)
                        // Converte o JSON em XML
                        var root = xmlbuilder.create('pedido', { encoding: 'utf-8' })
                            .raw('<cliente>')
                                root.ele('nome', `${customerName}`)
                                root.ele('fone', `${customerPhone}`)
                                root.ele('email', `${customerEmail}`)
                            root.raw('</cliente>')
                            root.raw('<itens>')
                                for (i = 0; i < countProd; i++){
                                    root.raw('<item>')
                                    root.ele('codigo', `${codProd[i]}`)
                                    root.ele('descricao', `${nameProd[i]}`)
                                    root.ele('un', 'un')
                                    root.ele('qtde', `${qtdProd[i]}`)
                                    root.ele('vlr_unit', `${priceProd[i]}`)
                                    root.raw('</item>')
                                }
                            root.raw('</itens>');
                        let xml = root.end();
                        // Adiciona as propostas em forma de Pedido no Bling e no MongoDB
                        request.post(func.blingAddPedidos(config.tokenBling, xml), function (error, response, body) {
                            if (error) console.log('ERROR blingAddPedidos');
                            if (response.statusCode === 200) {
                                console.log(response.statusCode, 'JÁ EXISTENTE');
                            }
                            else if (response.statusCode === 201) {
                                let pedido_id = jsonpath.query(JSON.parse(body), '$..numero')[0];
                                console.log(response.statusCode, 'PEDIDO INSERIDO NO BLING');
                                mongoBling.findOne({ pedido_id }, (err, data) => {
                                    if (err) console.log('ERRO AO BUSCAR NO MONGODB');
                                    if (data) {
                                        console.log('PEDIDO JÁ CADASTRADO');
                                    } else {
                                        let value_total = jsonpath.query(jsonProd, '$..products_sum_total')[0];
                                        mongoBling.create({ pedido_id: pedido_id, total_venda: value_total });
                                        console.log('PEDIDO ADICIONADO AO MONGODB');
                                    }
                                });
                            }
                            else{
                                console.log(`ERROR STATUS ${response.statusCode}`);
                            } 
                        });
                    };
                });
            }
        }
    });
}

module.exports = {
    integrationBlingPedidos: integrationBlingPedidos
}