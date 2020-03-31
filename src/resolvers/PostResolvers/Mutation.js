const { createOnePost, updateOnePost, deleteOnePost } = require('../../services/PostService');
const { getOneAuthorById } = require('../../services/AuthorService');

const createPost = async (_, {idAuthor, data}) => {
    const post = await createOnePost(data);
    if(post) {
        const author = await getOneAuthorById(idAuthor);
        author.posts.push(post._id);
        author.save();
        post.liked_by.push(author._id);
        post.author = author._id;
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