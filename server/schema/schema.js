const {projects, clients} = require('../simpleData');
const Client = require('../models/Client');
const Project = require('../models/Project')

const {GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLString,
    GraphQLList
} = require('graphql') 


//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return clients.findById(parent.clientId)
            }
        }
    })
})


//Client Type
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
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return projects.findById(args.id)
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return project.find((project) => project.id === args.id); 
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients.find()
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return client.findById(args.id); 
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})