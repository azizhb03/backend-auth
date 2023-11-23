const connect = require('../db');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const saltRounds = 10;
require('../models/auth.schema').createUserSchema()

async function login(req, res) {
    try {
        const db = await connect();
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "email not found" });
        }
        else {
            const match = bcrypt.compareSync(req.body.password, user.password)
            if (match) {
                // const exp = Date.now() + 1000 * 60 * 60 * 7
                const exp  =Date.now() + 1000 *15
                let token = jwt.sign({ email: user.email, id: user._id, exp }, "hjdbsbdqkjdbqksjdbqkjsdbqksdbqksdbjqsdbjqdsb");
                console.log(token);
                res.cookie("access_token", token, {
                    httpOnly: true
                })
                res.status(200).json({ message: "login with success", data: { email: user.email, id: user._id } })
            }
            else {
                res.status(401).json({ message: "unauthorized" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}
async function register(req, res) {
    try {
        const db = await connect();
        const saltRounds = 10;
        const hashed = bcrypt.hashSync(req.body.password, saltRounds);

        const newUser = require('../models/auth.schema').createUserSchema(req.body.email, hashed)
        await db.collection('users').insertOne(newUser)
        res.status(201).json({ message: "user created" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
module.exports = {
    login,
    register,
}