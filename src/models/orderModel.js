const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const orderSchema = mongoose.Schema({
    customerId: {
        type: objectId,
        ref: 'customer'
    },
    orderDetails: [
        {
            orderId: Number,
            discount:String,
            price:Number
        }
    ]
})
module.exports = mongoose.model('order', orderSchema)