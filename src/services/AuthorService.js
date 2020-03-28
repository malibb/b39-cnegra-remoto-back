const Authors = require('../models/Authors');

const getAllAuthors = () => Authors
    .find({is_active: true})
    .populate({
        path: 'posts',
        model: 'posts',
    });
    
const getOneAuthorById = (id) => Authors.findById({ 
    _id: id, is_active: true
});
const createOneAuthor = (data) => Authors.create(data);
const updateById = (id, data) => Authors.findByIdAndUpdate({ 
    _id: id, is_active: true
}, { ...data }, {new: true});

const deleteOneAuthor = (id) => Authors.findByIdAndUpdate({ 
    _id: id, is_active: true
}, { is_active:false });

module.exports = {
    getAllAuthors,
    createOneAuthor,
    updateById,
    deleteOneAuthor,
    getOneAuthorById,
};