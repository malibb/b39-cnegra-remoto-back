const { getAllAuthors }= require('../../services/AuthorService');

const getAuthors = async () => {
    const authors = await getAllAuthors();
    return authors;
};

module.exports = {
    getAuthors,
};