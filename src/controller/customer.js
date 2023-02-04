const customerModel = require('../models/customerModel')
const createCustomer = async(req,res) =>{
    try {
        let data = req.body
        const createCustomer = await customerModel.create(data)       
        return res.status(201).send({data:createCustomer})
    } catch (e) {
        return res.status(500).send({status:false,msg:e.message})
    }
}
module.exports = {createCustomer}