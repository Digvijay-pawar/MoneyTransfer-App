const { Router } = require("express");
const { authMiddleware } = require("../middleware/user");
const { Account } = require("../db/db");
const { default: mongoose } = require("mongoose");
const router = Router()

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId })
        res.json({
            message: "Balance fetch successfully",
            balance: account.balance
        })
    } catch (error) {
        res.json({
            error: "Server error: " + error
        })
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        //start session
        const session = await mongoose.startSession()

        //start transaction
        session.startTransaction()

        const { amount, to } = req.body;
        const userId = req.userId

        //check user account
        const account = await Account.findOne({ userId })
        if (!account || account.balance < amount) {
            await session.abortTransaction()
            res.json({
                error: "Insufficient balance"
            })
            return
        }

        // check to account
        const toAccount = await Account.findOne({ userId:to })
        if (!toAccount) {
            await session.abortTransaction()
            res.json({
                error: "Invalid account"
            })
            return
        }

        // debited from user account
        await Account.updateOne({
            userId: userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session)

        // creadited to to's account
        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session)

        //commit transaction
        await session.commitTransaction()

        //send responce
        res.json({
            message: "Transfer successful"
        })
        return
    } catch (error) {
        res.json({
            error: "Server error: " + error
        })
        return
    }
})

module.exports = router