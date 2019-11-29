const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    id: String,
    title: String,
    message: String,
    status:Number,
    startAt: Date,
    endAt: Date,
})
 
module.exports = mongoose.model('task',taskSchema,'tasks')

