const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/User.model")
const UserRouter = express.Router()


UserRouter.post("/register", (req, res) => {
    const { name, email, gender, password } = req.body
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = new UserModel({ name, email, gender, password: hash })
            await user.save();
            res.status(200).send({ msg: "New User has been registered" })
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "something went wrong" })
    }
})


UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            // console.log(user)
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ authorId: user._id }, 'evaluation');
                    res.status(200).send({ msg: "Login successfully", token: token })
                } else {
                    res.status(200).send({ msg: "wrong credential" })
                }
            });

        }

    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"something went wrong"})
    }



})


module.exports = {
    UserRouter
}