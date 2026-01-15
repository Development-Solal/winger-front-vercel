import {AxiosResponse} from "axios";
import axios from "@/utils/axios.ts";
import {apiUrl} from "@/utils/api.ts";

export const sendAidantProVerifiedEmailToAdmin = async (user: any): Promise<any> => {
    console.log(user);
    const response: AxiosResponse = await axios.post(apiUrl.sendAidantProVerifiedEmailToAdmin, user);
    return response.data;
};


export const sendAidantProContractSignedEmailToAidant = async (user: any): Promise<any> => {
    console.log(user);
    const response: AxiosResponse = await axios.post(apiUrl.sendAidantProContractSignedEmailToAidant, user);
    return response.data;
};
