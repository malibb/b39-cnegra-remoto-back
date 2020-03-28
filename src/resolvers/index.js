const AuthorResolver = require('./AuthorResolvers');

module.exports = {
    Query: {
        ...AuthorResolver.Query,
    },
    Mutation:{
        ...AuthorResolver.Mutation,
    },
};