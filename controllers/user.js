const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/user')

module.exports.getUsers = (req , res , next) => {
    console.log('here');
    User.find()
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(500).json({
                error : 'can not get users'
            })
        })
}

module.exports.signup = (req ,res ,next)=>{
   
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const age = req.body.age
    const email = req.body.email
    const password = req.body.password

    User.find({email:email})
        .then((result)=>{
            if (result.length >= 1) {
                return res.status(409).json({
                    msg: 'User exist!'
                })
            } else{
                bcrypt.hash(password , 12 , (err ,hash)=>{
                    if (err) {
                        return res.status(500).json({
                            error : err
                        })
                    } else {
                        const user = new User({
                            firstName:firstName,
                            lastName:lastName,
                            age:age,
                            email:email,
                            password:hash
                        })
                        user.save()
                            .then((result) => {
                                console.log(result);
                                res.status(200).json({
                                    msg:'user created successfuly'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

module.exports.login = (req,res,next)=>{
    User.find({email:req.body.email})
        .then(user=>{
            console.log(user);
            if (user.length < 1) {
                return res.status(401).json({
                    msg:'Auth Faild'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: 'Auth Failed!'
                    })
                } else if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 'secret', { expiresIn: '1h' })
                    return res.status(200).json({
                        msg: 'Login Successful!',
                        token: token
                    })
                } else {
                    res.status(401).json({
                        msg: 'Auth Failed!'
                    })
                }
            })


        })
}

module.exports.logout = (req,res,next) => {
    const id = req.params.userId;
    mongoose.set('useFindAndModify', false);
    User.findByIdAndRemove({_id:id} ,(err , result) => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(result)
        }
    })
}

module.exports.updateUserInfo = (req,res,next)=>{
    const id = req.params.userId
    mongoose.set('useFindAndModify', false);
    User.findOneAndUpdate({_id:id}, req.body,{new:true} , (err , result)=>{
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(result)
        }
    })
}

module.exports.deleteUser = (req,res,next)=>{
    console.log(req.params.userId);
    const id = req.params.userId;
    User.deleteOne({_id:id})
        .then(reuslt => {
            return res.status(200).json(reuslt)
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
}

