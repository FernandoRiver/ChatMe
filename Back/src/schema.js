import {fileLoader} from 'merge-graphql-schemas';
import path from 'path';

const typeDefs = fileLoader(path.join(__dirname, "./schema"))

export default typeDefs