const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const accountSchema = new mongoose.Schema({
    accountType:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    guarantor: {
        type: String,
        required: false
    },
    accountTitle: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        default: 0,
    },

})


const Account = mongoose.model('ACCOUNT', accountSchema)
module.exports = Account;