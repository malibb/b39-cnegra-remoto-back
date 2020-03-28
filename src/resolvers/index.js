const AuthorResolver = require('./AuthorResolvers');
const PostsResolver = require('./PostResolvers');

module.exports = {
    Query: {
        ...AuthorResolver.Query,
        ...PostsResolver.Query,
    },
    Mutation:{
        ...AuthorResolver.Mutation,
        ...PostsResolver.Mutation,
    },
};