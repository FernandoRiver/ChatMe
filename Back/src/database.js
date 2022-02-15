import mongoose  from "mongoose";

export async function connect(){
    try{
        await mongoose.connect('mongodb://localhost/chatmeDB'), {
            useNewUrlParser: true
        };

        console.log(">>> Database is conected");
    }
    catch(e){
        console.log(e);
    }
}