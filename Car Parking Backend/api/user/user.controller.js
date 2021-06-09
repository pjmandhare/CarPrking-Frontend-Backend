'use strict';

const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
const jwt = require('jsonwebtoken')

// const UserService = require('./user.service');
const UserModel = require('./user.model'); 
const userSessionModel = require('../userSession/userSession.model');
// const UtilService = require('../utility/util');
// const htmlTemplateService = require('../utility/htmltemplates');
// const UserSession = require('../userSession/userSession.model'); 
// const _ = require('lodash');


function handleError(res,error,code){
    res.status(code).send({success: false, message:error.message.split(',')[0]});
}

exports.create = function(req,res){
    try{
        req.body.role = "user";
        UserModel.create(req.body)
        .then( async function (user){
         
                res.send({success: true, user,message: 'User created'})
        
            // sending access token
           
        })
        .catch(function(error){
            //console.log('error')
            //console.log(error)
            if(error.errors && error.errors.email && error.errors.email.message == 'The specified email address is already in use.'){
                res.send({message: 'The specified email address is already in use.', success: false})
            }else if(error.errors && error.errors.email && error.errors.email.message == "Path `email` is required."){
                res.send({message: 'Email is required', success: false})
            }else if(error.message == 'Invalid password'){
                res.send({message: 'Invalid password', success: false})
            }
            // if(error.code == 11000){
            //     console.log(error.keyValue)
            //     if(error.keyValue == 'liecenseNo'){
            //         res.send({err: error})
            //     }
            //     // res.status(422).send(['This email address is already be in use'])
               
            // }
            else{
                handleError(res,error,500);
            }
           
            
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}

exports.login = async function(req, res){
    try{
        console.log(req.params)
        let {email, password} = req.body
        console.log(req.body)
        await UserModel.findOne({
            email
        }, (err,user)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })    
            }
            if(user!=null){
                
                if(user.authenticate(password)){
                    // const token = jwt.sign({
                    //     email: user.email,
                    //     userId: user._id
                    // }, 'car-parked-app-@Secret@12', {
                    //     expiresIn: "2 days"
                    // })
                    userSessionModel.create({user: user._id}, (err, raw)=>{ 
                        
                        res.send({success: true, token: raw._id, user, message: 'Successfull Login'})
                    })
                   
                   
                }else{
                    res.send({
                        success: false,
                        message: "Incorrect password."
                    })
                }
            }else{
                
                res.send({
                    success: false,
                    message: "User not found"
                })
            }
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}


exports.users = async function(req, res){
    try{
        await UserModel.find({},async(err,users)=>{
            res.send({
                users:users
            })

    })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 

}