const {projects, clients} = require('../server/simpleData')

const {GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLString
} = require('graphql')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return clients.find(client => client.id === args.id); 
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})