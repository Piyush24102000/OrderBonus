const mongoose = require('mongoose')
const customerSchema = mongoose.Schema({
    category:{
        type:String,
        default:"regular"
    },
    numberOfOrder : {
        type:Number,
        default:0
    }
})
module.exports = mongoose.model('customer',customerSchema)