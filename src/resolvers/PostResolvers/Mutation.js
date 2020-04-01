const { createOnePost, updateOnePost, deleteOnePost, getOnePost } = require('../../services/PostService');

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

const deletePost = async (_, {id}, { userAuth }) => {
    const post = await deleteOnePost(id);
    if (!post) return 'Post not exist';
    const index = userAuth.posts.findIndex(p => p._id == id);
    userAuth.posts.splice(index,1);
    userAuth.save();
    return 'Post deleted';
};

const likePost = async (_, {id}, {userAuth}) => {
    const post = await getOnePost(id);
    post.liked_by(userAuth._id);
    post.save();
    return post;
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
};