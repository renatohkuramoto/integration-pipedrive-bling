const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cria o schema do banco do MongoDB
const BlingSchema = new Schema({
    pedido_id: { type: Number, required: true, unique: true },
    total_venda: { type: Number, required: true},
    data_pedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PedidosBling', BlingSchema);