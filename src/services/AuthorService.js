const Authors = require('../models/Authors');

const getAllAuthors = () => Authors.find({is_active: true});
const createOneAuthor = (data) => Authors.create(data);
const updateById = (id, data) => Authors.findByIdAndUpdate({ 
    _id: id, is_active: true
}, { ...data }, {new: true});


module.exports = {
    getAllAuthors,
    createOneAuthor,
    updateById,
};