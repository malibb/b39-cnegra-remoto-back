const { GraphQLServer } = require('graphql-yoga'); 


const typeDefs = `
    type Query{
        hello(name: String!): String!
        getUsers:[User]!
        getUser(id: ID!): User!
    }

    type Mutation{
        createUser(name:String!,age:Int!): User!
        
    }

    type User{
        id:Int!
        name:String!
        age:Int!
    }
`;

const users = [];

const resolvers = {
    Query:{
        hello: (root, params, context, info) => `Hola ${params.name}`,
        getUsers: (root, params, context, info) => users,
        getUser: (root, {id}, context, info) => users.find(u => u.id == id),
    },
    Mutation:{
        createUser: (root, { name,  age}, context, info) => {
            const user = {
                id: users.length + 123214,
                name,
                age,
            };
            users.push(user);
            return user;
        }
    },
};

/**
 * 
 * root: Información del server de gql
 * params: datos que envia el cliente y se definen en el type defs
 * context: objeto por el cual se comunican los resolvers
 * info: el query que se ejecutó por el cliente
 * 
 */
const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log('Servidor arriba en puerto 4000!'));