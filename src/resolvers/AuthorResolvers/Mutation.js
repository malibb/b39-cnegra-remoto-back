const { createOneAuthor, updateById, deleteOneAuthor }= require('../../services/AuthorService');
const authenticate = require('../../utils/authenticate');
// (root, params, context, info)
const createAuthor = async (_, { data }) => {
    const author = await createOneAuthor(data); // Servicio de base de datos
    return author;
};

const updateAuthor = async (_, { id, data }) => {
    const author = await updateById(id, data);
    return author;
};

const deleteAuthor = async (_, { id }) => {
    const author = await deleteOneAuthor(id);
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