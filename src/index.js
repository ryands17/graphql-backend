require('dotenv').config()

const path = require('path')
const { GraphQLServer } = require('graphql-yoga')
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas')
const db = require('./db')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, 'typedefs')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, 'resolvers')))

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: payload => ({
    db,
    token: payload.request.get('token'),
  }),
})

server.use(require('helmet')())
server.use(require('cors')())

server.start(() => console.log(`Server is running on http://localhost:4000`))
