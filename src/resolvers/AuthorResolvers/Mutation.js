const { createOneAuthor, updateById }= require('../../services/AuthorService');

// (root, params, context, info)
const createAuthor = async (_, { data }) => {
    const author = await createOneAuthor(data); // Servicio de base de datos
    return author;
};

const updateAuthor = async (_, { id, data }) => {
    const author = await updateById(id, data);
    return author;
};


module.exports = {
    createAuthor,
    updateAuthor,
};