import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './src/schema';
import resolvers from './src/resolvers';

import { connect } from './src/database';

connect();
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost: 4000'))