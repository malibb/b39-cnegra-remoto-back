const Posts = require('../models/Posts');

const getAllPosts = () => Posts.find({is_active: true});

const getOnePost = (id) => Posts.findById({ 
    _id: id, is_active: true
});

const createOnePost = (data) => Posts.create(data);

const updateOnePost = (id, data) => Posts
    .findByIdAndUpdate({ 
        _id: id, is_active: true
    },{...data}, {new: true});

const deleteOnePost = (id) => Posts
    .findByIdAndUpdate({ 
        _id: id, is_active: true
    },{ is_active: true });

module.exports = {
    getAllPosts,
    getOnePost,
    createOnePost,
    updateOnePost,
    deleteOnePost
};