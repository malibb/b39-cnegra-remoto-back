const { createOneAuthor, updateById, deleteOneAuthor }= require('../../services/AuthorService');
const authenticate = require('../../utils/authenticate');
// (root, params, context, info)
const createAuthor = async (_, { data }) => {
    const author = await createOneAuthor(data); // Servicio de base de datos
    return author;
};
// context: userAuth 
const updateAuthor = async (_, { data }, { userAuth } ) => {
    const author = await updateById(userAuth._id, data);
    return author;
};

const deleteAuthor = async (_, __, { userAuth } ) => {
    const author = await deleteOneAuthor(userAuth._id);
    if (!author) return 'Author not exist';
    return 'Author delete';
};

const login = async (_, params)=>{
    const token = authenticate(params)
        .catch(e => { throw e;});
    return {
        token: token,
        message: 'Login Sucessful'
    };
};

// Authorization

module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    login,
};