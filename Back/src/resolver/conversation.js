import User from '../models/user'
import Chat from '../models/chat';
import Message from '../models/message';

export const resolvers = {
    Query: { 
        allChat: async()=>{
            return await Chat.find().populate('users').populate("messages");
        },
        findChat: async (_, {id, users})=>{
            if(!users && !id) throw new Error("Error-OCx001");

            let chat = null;
            if(id){
                chat = await Chat.findById(id).populate('users').populate("messages");
            }
            else{
                const usersArray = [];
                for(let i = 0; i < users.length; i++){
                    const user = await User.findById(users[i]);
                    usersArray.push(user);
                }
                chat = await Chat.find({users: users}).populate('users').populate("messages");
                chat = chat[0];
            }
            
            if(!chat) throw new Error("Error-OCx002")
            return chat;
        }
    },
    Mutation: {
        newChat: async (_, {name, users})=>{
            const newConver = new Chat({name})
            let usersData = []
            for(let i = 0; i < users.length; i++){
                const user = await User.findById(users[i])
                user.chats = await user.chats.concat(newConver);
                user.save()
                usersData.push(user)
            }
            // console.log(usersData)
            newConver.users = await newConver.users.concat(usersData)
            newConver.save();
            return newConver
        },
        newMessage: async (_, {id, user, data})=>{
            const chat = await Chat.findById(id);
            const from = await User.findById(user);
            const message = new Message({from, data});
            chat.messages = await chat.messages.concat(message);
            message.save();
            chat.save();
            return chat
        },
        deleteChat: async (_, {id})=>{
            const {_id,users} = await Chat.findById(id);
            for(let i = 0; i < users.length; i++){
                const user = await User.findById(users[i]);
                const chats = [];
                
                user.chats.map((item) => {
                    if(item != id) chats.push(item);
                })
                user.chats = chats;
                user.save();
            }
            const chatDeleted = await Chat.findByIdAndDelete(id)
            return chatDeleted;
        }
    },
    Chat:{
        users: async ({users}, args) => {
            let usersData = []
            for(let i = 0; i < users.length; i++){
                const user = await User.findById(users[i]._id)
                usersData.push(user)
            }
            return usersData
        }
    }
}