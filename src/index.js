const { GraphQLServer } = require('graphql-yoga')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: require('./resolvers'),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
