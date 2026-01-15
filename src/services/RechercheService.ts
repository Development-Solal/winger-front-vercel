import { FilterModel } from "@/models/RechercheModel";
import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const searchAll = async(userId?: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.searchAll, {userId});
    return response.data;
}

export const searchByProfileNumber = async(refNumber: string, userId?: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.searchByProfileNumber, {refNumber, userId});
    return response.data;
}

export const searchByFilter = async(filters: FilterModel, userId?: string, aideId?: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.searchByFilter, {filters, userId, aideId});
    return response.data;
}

export const searchAideByFM = async(aideId: string, userId?: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.searchAideByFM.replace("{:aideId}", aideId), {userId});
    return response.data;
}

export const searchFMbyAide = async(aideId: string, userId?: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.searchFMbyAide.replace("{:aideId}", aideId), {userId});
    return response.data;
}

export const getFiche = async(encodedAideId: string, encodedUserId: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.getFiche.replace("{:encodedAideId}", encodedAideId),  {encodedUserId});
    return response.data;
}

export const getFicheFutureMoitie = async(encodedAideId: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.getFicheFutureMoitie.replace("{:encodedAideId}", encodedAideId));
    return response.data;
}

export const getAllAideByAidant = async(encodedAidantId: string, encodedUserId: string, encodedAideId: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.getAllAideByAidant.replace("{:encodedAidantId}", encodedAidantId),  {encodedUserId, encodedAideId});
    return response.data;
}