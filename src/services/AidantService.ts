import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const CreateAidantService = async(formData: FormData) => {
    const response: AxiosResponse = await axios.post(apiUrl.createAidant, formData);
    return response.data;
}

export const CreateAidantProService = async(formData: FormData) => {
    const response: AxiosResponse = await axios.post(apiUrl.createAidantPro, formData);
    return response.data;
}
    
export const UpdateAidantService = async(userId: string, formData: FormData) => {
    const response: AxiosResponse = await axios.put(apiUrl.updateAidant.replace("{:userId}", userId), formData);
    return response.data;
}

export const UpdateAidantProService = async(userId: string, formData: FormData) => {
    const response: AxiosResponse = await axios.put(apiUrl.updateAidantPro.replace("{:userId}", userId), formData);
    return response.data;
}

export const DeactivateAidantService = async(userId: string) => {
    const response: AxiosResponse = await axios.put(apiUrl.deactivateAidant.replace("{:userId}", userId));
    return response.data;
}

export const AidantDeactivatesAccountService = async(userId: string) => {
    const response: AxiosResponse = await axios.put(apiUrl.aidantDeactivatesAidantAccount.replace("{:userId}", userId));
    return response.data;
}