import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const AddFavorite = async(aidant_id: string, aide_id: string, fav_aide_id: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.addFavorite, {aidant_id, aide_id, fav_aide_id});
    return response.data;
}

export const GetFavorites = async(aidantId: string, aideId:string) => {
    const response: AxiosResponse = await axios.post(apiUrl.getFavorites, {aidantId, aideId});
    return response.data;
}