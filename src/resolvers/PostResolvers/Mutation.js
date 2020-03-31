const { createOnePost, updateOnePost, deleteOnePost } = require('../../services/PostService');

const createPost = async (_, {data}, {userAuth}) => {
    const post = await createOnePost(data);
    if(post) {
        userAuth.posts.push(post._id);
        userAuth.save();
        post.author = userAuth._id;
        post.save();
    } 
    return post;
};

const updatePost = async (_, {id, data}) => {
    const post = await updateOnePost(id, data);
    return post;
};

const deletePost = async (_, {id}) => {
    const post = await deleteOnePost(id);
    return post;
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
};