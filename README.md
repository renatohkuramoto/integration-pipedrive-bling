### Exemplo de Integração/API

#### A integração se comunica com a API da plataforma PipeDrive, onde busca as demandas com status de "ganho".
#### As demandas são adicionadas na plataforma Bling como pedidos.
#### Os pedidos adicionados ao Bling são registrados no banco de dados MongoDB.
#### Para testar, criar as contas no Pipedrive e Bling e substituir os API Token no arquivo config/config.js.

#### Depedências:
- npm install --save jsonpath
- npm install --save xmlbuilder
- npm install --save request
- npm install --save mongoose
- npm install --save body-parser

### Configurar o Token das plataformas no arquivo config/config.js

#### Rotas e Endpoints
- http://localhost:3000/pipedrive/ganhos - Retorna as demandas com status "ganho".
- http://localhost:3000/pipedrive/perdas - Retorna as demandas com status "perda".
- http://localhost:3000/bling - Retorna os pedidos da plataforma Bling.
- http://localhost:3000/bling/consolidado - Retorna os pedidos consolidados no MongoDB.


###### Renato Kuramoto
[LinkedIn](https://www.linkedin.com/in/renato-kuramoto-236281189/)
