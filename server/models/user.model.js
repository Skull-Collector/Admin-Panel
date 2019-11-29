const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    id: String,
    name: String,
    username: String,
    status:Number,
    password: String,
    joindate:Date
})
 
module.exports = mongoose.model('user',userSchema,'users')

