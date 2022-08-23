const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const maalLedgerSchema = new mongoose.Schema({
    sellerAccountSelect: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true
    },

    cropName: {
        type: String,
        required: false
    },
    detailedWeight: {
        type: String,
        required: false
    },
    calculatedWeight: {
        type: String,
        required: false
    },
    rate: {
        type: String,
        required: false
    },
    netAmount: {
        type: String,
        required: false
    },
    commission: {
        type: String,
        required: false
    },
    commissionAmount: {
        type: String,
        required: false
    },
    chungi: {
        type: String,
        required: false
    },
    munshiayana: {
        type: String,
        required: false
    },
    totalCommission: {
        type: String,
        required: false
    },
    grossAmount: {
        type: String,
        required: false
    },
    insertDate: {
        type: Object,
        required: false
    },
    cashOrMaal: {
        type: String,
        required: false
    },
    buyerAccountSelect: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: false
    }

})


const MaalLedger = mongoose.model('MAALLEDGER', maalLedgerSchema)
module.exports = MaalLedger;