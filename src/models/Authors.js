const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birth_date: Date,
    posts: {  // posts: ['1212311','1212312','1212313']
        type: [Schema.Types.ObjectId],
        ref:'posts'
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O']
    },
    profile_pic: String,
    is_active: {
        type: Boolean,
        default: true,
    }
},{ timestamps: true });

module.exports = mongoose.model('authors', AuthorSchema);