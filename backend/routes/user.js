const { Router } = require("express");
const { SignUpMiddleware, SignInMiddleware, UpdateProfileMiddleware, authMiddleware } = require("../middleware/user");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const router = Router()

router.post("/sign-up", SignUpMiddleware, async (req, res) => {
    const { username, firstName, lastName, password } = req.body
    try {
        //check user
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            res.status(411).json({
                message: "User already exists"
            })
            return
        }

        //bcrypt password
        const bcryptPassword = await bcrypt.hash(password, 10)

        //create new user
        const newUser = await User.create({
            username,
            firstName,
            lastName,
            password: bcryptPassword
        })

        const userId = newUser._id

        //create account
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        //generate token
        const token = jwt.sign({ userId }, JWT_SECRET)

        //send response
        res.json({
            message: "User created successfully",
            token: token
        })
        return
    } catch (error) {
        res.status(500).json({
            error: "Server error: " + error
        })
        return
    }
})

router.put('/update', authMiddleware, UpdateProfileMiddleware, async (req, res) => {
    try {
        console.log(req.userId)
        // Update the user document
        const result = await User.updateOne({ _id: req.userId }, { $set: req.body });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No user found or no changes made" });
        }
        //send response
        res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        res.json({
            error: "Server error: " + error
        })
        return
    }
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.headers.filter || ""
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.post("/sign-in", SignInMiddleware, async (req, res) => {
    const { username, password } = req.body

    try {
        //check user
        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            res.status(400).json({
                error: "User not found: "
            })
            return
        }
        //check valid password
        const validPassword = bcrypt.compare(password, existingUser.password)
        if (!validPassword) {
            res.json({
                error: "Invalid password"
            })
            return
        }

        const userId = existingUser._id

        //generate token
        const token = jwt.sign({ userId }, JWT_SECRET)

        //send token
        res.json({
            message: "User login successfully",
            token: token
        })

    } catch (error) {
        res.json({
            error: "Server error: " + error
        })
        return
    }

})

module.exports = router