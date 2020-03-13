const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String },
    text: { type: String, required: true },
    color: { type: String },
    createDat: { type: Date, default: Date.now },
    owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Note', schema)