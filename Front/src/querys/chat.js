const { gql } = require("@apollo/client")

const allUsers = gql`
    query{
        allUsers{
            id
            first
            last
            fullName
            email
            password
        }
    }
`;
const user = gql`
    query user($id: ID, $email: String){
        user(id: $id, email: $email){
            id
            first
            last
            email
            password
        }
    }
`;

const createUser = gql`
    mutation createUser($first: String, $last: String, $email: String, $password: String){
        createUser(first: $first, last: $last, email: $email, password: $password){
            id
            fullName
        }
    }
    
    
`;

module.exports = {
    allUsers
}