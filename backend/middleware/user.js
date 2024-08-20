const zod = require("zod")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

const signUpSchema = zod.object({
    username: zod.string().min(1, "Username is not valid").max(30),
    firstName: zod.string().min(1, "First Name is not valid").max(50),
    lastname: zod.string().min(1, "Last Name is not valid").max(50),
    password: zod.string().min(6, "Required minimum 6 characters")
})

const signInSchema = zod.object({
    username: zod.string().min(1, "Username is not valid").max(30),
    password: zod.string().min(6, "Required minimum 6 characters")
})

const updateProfileSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

function SignUpMiddleware(req, res, next) {
    try {
        signUpSchema.safeParse(req.body)
        next()
    } catch (error) {
        res.json({
            error: "Invalid Input: " + error
        })
        return
    }
}

function SignInMiddleware(req, res, next) {
    try {
        signInSchema.safeParse(req.body)
        next()
    } catch (error) {
        res.json({
            error: "Invalid Input: " + error
        })
        return
    }
}

function UpdateProfileMiddleware(req, res, next) {
    try {
        updateProfileSchema.safeParse(req.body)
        next()
    } catch (error) {
        res.json({
            error: "Invalid input: " + error
        })
    }
}

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer token

        if (token == null) return res.sendStatus(401); // If no token, return unauthorized status

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // If token is invalid, return forbidden status
            req.userId = user.userId; // Attach user object to request
            // console.log(req.userId)
            next(); // Proceed to next middleware or route handler
        });
    } catch(error){
        res.json({
            error: "Invalid Token: " + error
        })
    }
}

module.exports = {
    SignUpMiddleware,
    SignInMiddleware,
    UpdateProfileMiddleware,
    authMiddleware
}