import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const GetStats = async() => {
    const response: AxiosResponse = await axios.get(apiUrl.getStats);
    return response.data;
}

export const AddListItem = async(title: string, listType: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.addListItem.replace("{:listType}", listType), {title: title});
    return response.data;
}

export const UpdateListItem = async(id:string | number , title: string, listType: string) => {
    const response: AxiosResponse = await axios.put(apiUrl.updateListItem.replace("{:listType}", listType).replace("{:id}", id.toString()), {title: title});
    return response.data;
}

export const GetAllUsers = async() => {
    const response: AxiosResponse = await axios.get(apiUrl.getAllUsers);
    return response.data;
}

export const DeactivateUsers = async(id:string | number) => {
    const response: AxiosResponse = await axios.put(apiUrl.deactivateUsers.replace("{:id}", id.toString()));
    return response.data;
}

export const updateProContractSignature = async(id:string | number) => {
    const response: AxiosResponse = await axios.put(apiUrl.updateContractProSignature.replace("{:id}", id.toString()));
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UpdateUser = async(id:string | number, data: any) => {
    const response: AxiosResponse = await axios.post(apiUrl.updateUser.replace("{:id}", id.toString()), data);
    return response.data;
}

export const GetAllAides = async() => {
    const response: AxiosResponse = await axios.get(apiUrl.getAllAides);
    return response.data;
}

export const DeactivateAides = async(id:string | number) => {
    const response: AxiosResponse = await axios.put(apiUrl.deactivateAides.replace("{:id}", id.toString()));
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UpdateAideAidant = async(data: any) => {
    const response: AxiosResponse = await axios.post(apiUrl.updateAideAidant,data);
    return response.data;
}

export const DownloadInvoicesZip = async (data: string[]): Promise<Blob> => {
    const response: AxiosResponse<Blob> = await axios.post(
      apiUrl.downloadInvoicesZip,
      { ids: data },
      {
        responseType: "blob", // 👈 tell axios to treat the response as binary
      }
    );
    return response.data; // this will now be a Blob
  };