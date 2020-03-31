const AuthorResolver = require('./AuthorResolvers');
const PostsResolver = require('./PostResolvers');
const {EmailAddressResolver, URLResolver} = require('graphql-scalars');
module.exports = {
    EmailAdd: EmailAddressResolver,
    URL: URLResolver,
    Query: {
        ...AuthorResolver.Query,
        ...PostsResolver.Query,
    },
    Mutation:{
        ...AuthorResolver.Mutation,
        ...PostsResolver.Mutation,
    },
};