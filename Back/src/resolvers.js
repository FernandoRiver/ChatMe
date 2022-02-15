import path from 'path';
import {fileLoader} from 'merge-graphql-schemas';


export default fileLoader(path.join(__dirname,'./resolver/**/*.js'));;