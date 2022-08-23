const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const ledgerSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    transectionType: {
        type: String,
        required: true
    },
    cashOrMaal: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})


const Ledger = mongoose.model('LEDGER', ledgerSchema)
module.exports = Ledger;