import {StreamChat} from "stream-chat"
import "dotenv/config.js"


const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_KEY_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream API or SECRET missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) =>{
    try {
        await streamClient.upsertUsers([userData])
    } catch (error) {
        console.error("Error in upserting stream user", error);
    }
};

export const generateStreamToken = (userId) => {
    try {
        const UserIdStr = userId.toString();
        return streamClient.createToken(UserIdStr);

    } catch (error) {
        console.error("Error in generating stream token", error);
    }
};