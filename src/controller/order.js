let customerModel = require('../models/customerModel')
const orderModel = require('../models/orderModel')

let createOrder = async (req, res) => {
    try {
        let data = req.body
        let id = data.customerId

        /* -----Check if customer is new----  */
        let checkCustomer = await orderModel.findOne({ customerId: id })
        if (!checkCustomer) {
            data.orderDetails = { orderId: 1, discount: "0%", price: 100 }
            let createOrder = await orderModel.create(data)
            await customerModel.findByIdAndUpdate(id, { $inc: { numberOfOrder: 1 } })
            return res.send(createOrder)
        }
        /* ------If customer is old----- */

        let orderId = (checkCustomer.orderDetails)[checkCustomer.orderDetails.length - 1].orderId
        let incOrderId = orderId + 1

        /* --------Gold Case --------*/

        if (incOrderId == 9) {
            await orderModel.findOneAndUpdate({ customerId: id }, { $push: { orderDetails: { orderId: incOrderId, discount: "0%", price: 100 } } })
            await customerModel.findByIdAndUpdate(id, { $inc: { numberOfOrder: 1 } })
            return res.status(201).send({ message: "Order Placed Successfully ,You have placed 9 orders with us. Buy one more stuff and you will be promoted to Gold customer and enjoy 10% discounts!" })
        }
        if (incOrderId >= 10 ) {
            await orderModel.findOneAndUpdate({ customerId: id }, { $push: { orderDetails: { orderId: incOrderId, discount: "10%", price: (100 - (100 * 0.10)) } } })
            await customerModel.findByIdAndUpdate(id, { $inc: { numberOfOrder: 1 }, category: "gold" })
            return res.status(200).send({ message: "Gold Order Placed Successfully" })
        }
        /* -------Platinum Case------- */

        if (incOrderId == 19) {
            await orderModel.findOneAndUpdate({ customerId: id }, { $push: { orderDetails: { orderId: incOrderId, discount: "10%", price: (100 - (100 * 0.10)) } } })
            await customerModel.findByIdAndUpdate(id, { $inc: { numberOfOrder: 1 } })
            return res.status(201).send({ message: "Order Placed Successfully ,You have placed 19 orders with us. Buy one more stuff and you will be promoted to Platinum customer and enjoy 20% discounts!" })
        }
        if (incOrderId >= 20) {
            await orderModel.findOneAndUpdate({ customerId: id }, { $push: { orderDetails: { orderId: incOrderId, discount: "20%", price: (100 - (100 * 0.20)) } } })
            await customerModel.findByIdAndUpdate(id, { $inc: { numberOfOrder: 1 }, category: "platinum" })
            return res.status(200).send({ message: "Platinum Order Placed Successfully" })
        }
        /* -------Regular Case------ */
        
        await orderModel.findOneAndUpdate({ customerId: id }, { $push: { orderDetails: { orderId: incOrderId, discount: "0%", price: 100 } } })
        await customerModel.findByIdAndUpdate(id, { $inc: { numberOfOrder: 1 } })
        return res.status(201).send({ message: "Order Placed Successfully" })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { createOrder }