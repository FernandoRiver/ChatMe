import User from '../models/user'
import Chat from '../models/chat'
export const resolvers = {
    User:{
        fullName: (root, args) => {return (root.first+" "+root.last)},
        chats: async ({chats}, args) => {
            let chatsArray = [];
            for(let i = 0; i < chats.length; i++){
                const chatFinded = await Chat.findById(chats[i]._id);
                chatsArray.push(chatFinded);
            }
            return chatsArray}
    },
    Query: {
        Ping: (_,args, context)=>{
            return "Pong"}, 
        allUsers: async()=>{
            return await User.find().populate("chats")
        },
        user: async(_, {id, email})=>{
            let user = '';
            if(id) user = await User.find({_id: id}).populate("chats");
            else if(email) user = await User.find({email: email}).populate("chats");
            console.log(user.chats)
            return user
        }
    },
    Mutation: {
        createUser:async (_, input)=>{
            const user = await User.find({email: input.email})
            if(user.length > 0) throw new Error("Error-CUx001")
            const newUser = new User(input);
            await newUser.save();
            return newUser;
        },
        deleteUser: async (_, {id})=>{
            return await User.findByIdAndDelete(id);
        },
        updateUser: async (_, {id, input})=>{
            return await User.findByIdAndUpdate(id, input, {new:true});
        }
    }
}