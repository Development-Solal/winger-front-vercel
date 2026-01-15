import { MessageData } from "@/models/Chat";
import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const CreateConversation = async(userId: string, aidantId: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.createConversation, {userId, aidantId});
    return response.data;
}

export const GetUserConversations = async(userId: string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getUserConversations.replace("{:userId}", userId));
    return response.data;
}

export const SendMessage = async(messageData: MessageData) => {
    const response: AxiosResponse = await axios.post(apiUrl.sendMessage, {messageData});
    return response.data;
}

export const GetMessages = async(conversationId: string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getMessages.replace("{:conversationId}", conversationId));
    return response.data;
}

export const BlockUser = async(blocker_id: string, blocked_id: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.blockUser, {blocker_id, blocked_id});
    return response.data;
}

export const UnblockUser = async(blocker_id: string, blocked_id: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.unblockUser, {blocker_id, blocked_id});
    return response.data;
}

export const GetBlockedUsers = async(userId: string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getBlockedUsers.replace("{:userId}", userId));
    return response.data;
}

export const ReactivateChat = async(id: string, userId: string) => {
    const response: AxiosResponse = await axios.put(apiUrl.reactivateChat.replace("{:id}", id), {userId});
    return response.data;
}

export const DeactivateChat = async(id: string, aidant_id:string) => {
    const response: AxiosResponse = await axios.put(apiUrl.deactivateChat.replace("{:conversationId}", id), {aidant_id});
    return response.data;
}

export const DeactivateChatMonCompte = async(user_id: string, aidant_id: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.deactivateChatMonCompte, {user_id, aidant_id});
    return response.data;
}
