import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const GetUserByIdService = async(userId: string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getUserById.replace("{:userId}", userId));
    return response.data;
}

export const GetAidantByUserService = async(userId: string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getAidantByUser.replace("{:userId}", userId));
    return response.data;
}

export const GetAidantProByUserService = async(userId: string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getAidantProByUser.replace("{:userId}", userId));
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SendContactForm = async(formData: any) => {
    const response: AxiosResponse = await axios.post(apiUrl.sendContactForm, formData);
    return response.data;
}