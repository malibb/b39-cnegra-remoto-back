const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: { // author: 21345652431343123
        type: Schema.Types.ObjectId,
        ref:'authors'
    },
    cover: String,
    liked_by: {  // liked_by: ['1212311','1212312','1212313']
        type: [Schema.Types.ObjectId],
        ref:'authors'
    },
    is_active: {
        type: Boolean,
        default: true,
    }
},{timestamps: true});

module.exports = mongoose.model('posts', PostSchema);