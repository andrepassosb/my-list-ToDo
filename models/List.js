const mongoose = require('../db/conn')
const { Schema } = mongoose

const List = mongoose.model(
    'List',
    new Schema({
        name: {
            type: String,
            required: true
        },
        itens: {
            type: Array,
        },
        owner:{
            type: Object,
            required: true
        },
        users: Array,
    },
    { timestamps: true },
    )
)

module.exports = List