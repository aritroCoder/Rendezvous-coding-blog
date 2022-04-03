// mongoDB database model for posts
const mongoose = require('mongoose');
const { Schema }= mongoose;


const PostSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    like:[
        {
            username: String
        }
    ],
    date:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);