const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    loginDate: { type: Date },
    regDate: { type: Date },
    status: {type: String},
    Note: [{ type: Types.ObjectId, ref: 'Note' }]
})

module.exports = model('User', schema)