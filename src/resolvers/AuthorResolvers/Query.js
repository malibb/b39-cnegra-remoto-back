const { getAllAuthors, getAllAuthorsFilter, getOneAuthorById }= require('../../services/AuthorService');

// (root, params, context, info)
const getAuthors = async (_, { filter }) => {
    const authors = filter 
        ? await getAllAuthorsFilter(filter)
        : await getAllAuthors();
    return authors;
};

const getAuthorById = async ( _, {id}) => {
    const author = await getOneAuthorById(id);
    return author;
};

const me = async ( _, __, { userAuth }) => {
    const author = await getOneAuthorById(userAuth._id);
    return author;
};

module.exports = {
    getAuthors,
    getAuthorById,
    me,
};