
var moment = require('moment'); // require


// const UserService = require('./user.service');

const slotsModel = require('../slots/slots.model');


exports.slots = async(req,res)=>{
    try{
       
            await slotsModel.find({time : { $lt : moment() }},async(err,slot)=>{
                slot.map(async s=>{
                    s.userId = null
                    s.vaccant = true
                    await s.save();
                })
            await slotsModel.find({},async(err,slots)=>{
                res.send({
                    slots: slots
                })
            })
               
            })
       
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}


exports.create = async(req,res)=>{
    try{
       
        await slotsModel.create(req.body,async(err,slot)=>{
            res.send({
                slot:slot
            })
        })
       
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}