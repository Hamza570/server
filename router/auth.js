const express = require('express')
const bcrypt = require('bcryptjs')
const router = express()

require('../db/conn')
const User = require('../model/userSchema')
const Account = require('../model/accountSchema')
const Ledger = require('../model/ledgerSchema')
const MaalLedger = require('../model/maalLedgerSchema')
const mongoose = require('mongoose')

router.get("/", (req, res) => {
    res.send("Home")
})

router.post("/register", async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    if (!name || !email || !password) {
        return res.status(422).send("Fill kro janu")
    }

    try {
        const userExist = await User.findOne({
            email: email
        })
        if (userExist) {
            return res.status(422).send("Email already exsist")
        }
        const user = new User({
            name,
            email,
            password
        })
        const userRegistered = await user.save()
        if (userRegistered) {
            res.status(201).json({
                message: "Data inserted"
            })
        } else {
            res.status(500).json({
                message: "User not added"
            })
        }

    } catch (error) {

    }
})

router.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body
    if (!email || !password) {
        return res.status(422).send("Missing Content")
    }
    try {
        const userExist = await User.findOne({
            email: email
        })
        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password)
            if (isMatch) {
                return res.status(200).send("Login Success")
            } else {
                return res.status(422).send("Invalid Credentials")
            }
        } else {
            return res.status(422).send("Invalid Credentials")
        }
    } catch {

    }
})
// Khaty
// New Khata
router.post("/addAccount", async (req, res) => {
    const {
        accountType,
        name,
        fatherName,
        location,
        phone,
        description,
        guarantor,
        accountTitle
    } = req.body
    if (!name || !accountType) {
        return res.status(422).send("Name cannot be empty!")
    }
    try {
        const newAccount = new Account({
            accountType,
            name,
            fatherName,
            location,
            phone,
            description,
            guarantor,
            accountTitle
        })
        const newAccountAdded = await newAccount.save()
        if (newAccountAdded) {
            res.status(201).json({
                message: "Account created :)"
            })
        } else {
            res.status(500).json({
                message: "Account not created :("
            })
        }
    } catch (error) {

    }
})
//Add Transection
router.post("/addCashTransection", async (req, res) => {
    const {
        accountSelect,
        amount,
        description,
        transectionType,
        cashOrMaal,
        insertDate
    } = req.body
    console.log(req.body)
    if (!accountSelect || !amount || !transectionType || !cashOrMaal) {
        return res.status(422).send("Name cannot be empty!")
    }
    try {
        const newLedger = new Ledger({
            accountId: accountSelect,
            amount,
            description,
            transectionType,
            cashOrMaal,
            date: insertDate
        })
        const newLedgerAdded = await newLedger.save()
        if (newLedgerAdded) {
            res.status(201).json({
                message: "Inserted"
            })
        } else {
            res.status(500).json({
                message: "Failed"
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.post("/addMaalTransection", async (req, res) => {
    const {
        sellerAccountSelect,
        buyerAccountSelect,
        cropName,
        detailedWeight,
        calculatedWeight,
        rate,
        netAmount,
        commission,
        commissionAmount,
        chungi,
        munshiayana,
        totalCommission,
        grossAmount,
        insertDate,
        cashOrMaal
    } = req.body
    console.log(req.body)
    if (!sellerAccountSelect || !buyerAccountSelect || !cropName || !detailedWeight || !calculatedWeight ||
        !rate || !netAmount || !commission || !commissionAmount || !chungi || !munshiayana ||
        !totalCommission || !grossAmount || !insertDate || !cashOrMaal) {
        return res.status(422).send("Data cannot be empty!")
    }
    console.log(req.body)
    try {
        const newLedger = new MaalLedger({
            sellerAccountSelect,
            buyerAccountSelect,
            cropName,
            detailedWeight,
            calculatedWeight,
            rate,
            netAmount,
            commission,
            commissionAmount,
            chungi,
            munshiayana,
            totalCommission,
            grossAmount,
            insertDate,
            cashOrMaal
        })
        const newLedgerAdded = await newLedger.save()
        if (newLedgerAdded) {
            res.status(201).json({
                message: "Inserted"
            })
        } else {
            res.status(500).json({
                message: "Failed"
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.get("/accounts", async (req, res) => {
    let accounts;
    try {
        accounts = await Account.find()
    } catch (error) {
        console.log("chuss")
    }
    if (!accounts) {
        return res.status(404).json({
            message: "No accounts found"
        })
    } else {
        return res.status(200).json({
            accounts
        })
    }
})

router.post("/detailsOfAccount", async (req, res) => {
    const {
        id
    } = req.body
    if (id) {
        let details;
        try {
            details = await Account.findOne({
                _id: id
            })
        } catch (error) {
            console.log("chuss")
        }
        if (!details) {
            return res.status(404).json({
                message: "No details found"
            })
        } else {
            return res.status(200).json({
                details
            })
        }
    }

})
router.post("/ledgerSingleAccount", async (req, res) => {
    const {
        id
    } = req.body
    if (id) {
        let DetailedLedgerOfAccount;
        try {
            DetailedLedgerOfAccount = await Account.aggregate([{
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'ledgers',
                        localField: '_id',
                        foreignField: 'accountId',
                        as: 'TransectionDetails'
                    }
                },
                {
                    $project: {
                        "TransectionDetails": 1,
                        "accountTitle": 1,
                        "accountType": 1,
                        "name": 1,
                        "phone": 1,
                        "location": 1
                    }
                }
            ])

        } catch (error) {
            console.log(error)
        }
        if (!DetailedLedgerOfAccount) {
            return res.status(404).json({
                message: "No details found"
            })
        } else {
            return res.status(200).json({
                DetailedLedgerOfAccount
            })
        }
    }

})
router.post("/ledgerRokar", async (req, res) => {
    const {
        date
    } = req.body
    let ledger;

    try {
        ledger = await Ledger.aggregate([{
                $match: {
                    cashOrMaal: 'cash',
                    date: date
                }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'accountId',
                    foreignField: '_id',
                    as: 'accountDetails'
                }
            },
            {
                $project: {
                    "date": 1,
                    "accountDetails": 1,
                    "transectionType": 1,
                    "amount": 1,
                    "description": 1
                }
            },


        ])


    } catch (error) {
        console.log(error)
    }
    if (!ledger) {
        return res.status(404).json({
            message: "No details found"
        })
    } else {



        return res.status(200).json({
            ledger
        })
    }

})
router.post("/ledgerMaal", async (req, res) => {
    const {
        date
    } = req.body
    let ledger;
    console.log(date)
    try {
        ledger = await MaalLedger.aggregate([{
                $match: {
                    insertDate: date
                }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'sellerAccountSelect',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'buyerAccountSelect',
                    foreignField: '_id',
                    as: 'buyer'
                }
            },
            {
                $project: {
                    "sellerAccountSelect": 0,
                    "buyerAccountSelect": 0
                }
            },


        ])


    } catch (error) {
        console.log(error)
    }
    if (!ledger) {
        return res.status(404).json({
            message: "No details found"
        })
    } else {


        console.log(ledger)
        return res.status(200).json({
            ledger
        })
    }

})

router.post("/accountNamesOnly", async (req, res) => {
    let {
        accountType,
        sellerAccountType,
        buyerAccountType
    } = req.body
    if (accountType || sellerAccountType || buyerAccountType) {
        if (accountType) {
            accountType = accountType
        } else if (sellerAccountType) {
            accountType = sellerAccountType
        } else if (buyerAccountType) {
            accountType = buyerAccountType
        }
        let details;
        try {
            details = await Account.aggregate([{
                $match: {
                    accountType: accountType
                }
            }, {
                $project: {
                    label: "$name"
                }
            }])
        } catch (error) {
            console.log(error)
        }
        if (!details) {
            return res.status(404).json({
                message: "No details found"
            })
        } else {
            return res.status(200).json({
                details
            })
        }
    }

})

module.exports = router