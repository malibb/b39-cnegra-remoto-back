const { getAllPosts, getAllPostsFilter, getOnePost } = require('../../services/PostService');

const getPosts = async (_, {filter}) => {
    const posts = filter
        ? await getAllPostsFilter(filter)
        : await getAllPosts();
    console.log(posts);
    return posts;
};

const getPostById = async (_, {id}) => {
    const post = await getOnePost(id);
    return post;
};

module.exports = {
    getPosts,
    getPostById,
};