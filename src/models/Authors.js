const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password:{
        type: String,
        required:true,
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

AuthorSchema.pre('save', function(next) {
    const author = this;
    const SALT_FACTOR = 13;
    if (!author.isModified('password')) { return next();}
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(author.password, salt, function(error, hash) {
            if(error) return next(error);
            author.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('authors', AuthorSchema);