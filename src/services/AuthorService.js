const Authors = require('../models/Authors');

const getAllAuthors = () => Authors.find({is_active: true});
const createAuthor = (data) => Authors.create(data);

module.exports = {
    getAllAuthors,
    createAuthor
};