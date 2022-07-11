const mongoose = require('../db/conn')
const { Schema } = mongoose

const List = mongoose.model(
    'StandardList',
    new Schema({
        name: {
            type: String,
            required: true
        },
        itens: {
            type: Array,
        },
    },
    { timestamps: true },
    )
)

module.exports = List