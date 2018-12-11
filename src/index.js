const path = require('path')
const { GraphQLServer } = require('graphql-yoga')
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, 'typedefs')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, 'resolvers')))

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
