const { createOnePost, updateOnePost, deleteOnePost, getOnePost } = require('../../services/PostService');
const storage = require('../../utils/storage');

const createPost = async (_, {data}, {userAuth}) => {
    // data.cover = 'data:img;dwe23e2'; https://cloudinary.com/dseffr
    // console.log(data.cover);
    if (data.cover) {
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const storageInfo = await storage({stream});
        console.log(storageInfo);
        data = {
            ...data,
            cover: storageInfo.url, //url image
        };
    }
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
    if (data.cover) {
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const storageInfo = await storage({stream});
        console.log(storageInfo);
        data = {
            ...data,
            cover: storageInfo.url, //url image
        };
    }
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