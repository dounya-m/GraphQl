const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLScalarType, GraphQLEnumType, 
    GraphQLID, GraphQLSchema,
    GraphQLList, GraphQLNonNull, GraphQLInt} = require('graphql')

const Project = require('../models/Project')
const Client = require('../models/Client')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        phone: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.findById(parent.clientId)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        }
    },    
    fields: {
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        }
    },
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save()
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id)
            }
        },
        //Project
        addProject: {
            type: ProjectType,
            args: {
            name: { type: GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLNonNull(GraphQLString) },
            status: {
                type: new GraphQLEnumType({
                name: 'ProjectStatus',
                values: {
                    new: { value: 'Not Started' },
                    progress: { value: 'In Progress' },
                    completed: { value: 'Completed' },
                },
                }),
                defaultValue: 'Not Started',
            },
            clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
            const project = new Project({
                name: args.name,
                description: args.description,
                status: args.status,
                clientId: args.clientId,
            });
    
            return project.save();
            },
        },
        // Delete a project
        deleteProject: {
            type: ProjectType,
            args: {
            id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
            return Project.findByIdAndRemove(args.id);
            },
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

