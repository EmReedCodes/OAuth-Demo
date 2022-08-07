// const { default: mongoose } = require('mongoose')
const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //trim whitespace
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    //either public or private so set default to public
    status: {
        type: String,
        default: 'public',
        //list of possible values 
        enum: ['public', 'private'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
                                      //can try UserSchema or this.schema
module.exports = mongoose.model('Story', StorySchema)