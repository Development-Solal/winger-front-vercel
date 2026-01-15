import { apiUrl } from "@/utils/api";
import axios from "@/utils/axios";
import { AxiosResponse } from "axios";

export const CreateAideService = async (formData: FormData) => {
  const response: AxiosResponse = await axios.post(apiUrl.createAide, formData);
  return response.data;
};

export const GetAllAideService = async (userId: string) => {
  const response: AxiosResponse = await axios.get(apiUrl.getAllAide.replace("{:userId}", userId));
  return response.data;
};

export const DeactivateAideService = async (aideId: number, userId: string) => {
  const response: AxiosResponse = await axios.delete(
    apiUrl.deactivateAide.replace("{:aideId}", aideId.toString()),
    {
      data: { userId } 
    }
  );
  return response.data;
};

export const SuspendAideService = async (aideId: number) => {
  const response: AxiosResponse = await axios.put(apiUrl.suspendAide.replace("{:aideId}", aideId.toString()));
  return response.data;
};

export const GetAideByIdService = async (aideId: string) => {
  const response: AxiosResponse = await axios.get(apiUrl.getAideById.replace("{:aideId}", aideId));
  return response.data;
};

export const GetFutureMoitieByIdService = async (aideId: string) => {
  const response: AxiosResponse = await axios.get(apiUrl.getFutureMoitieById.replace("{:aideId}", aideId));
  return response.data;
};

export const UpdateAideService = async (aideId: string, formData: FormData) => {
  const response: AxiosResponse = await axios.put(apiUrl.updateAide.replace("{:aideId}", aideId), formData);
  return response.data;
};

export const UpdateFutureMoitieService = async (aideId: string, formData: FormData) => {
  const response: AxiosResponse = await axios.put(apiUrl.updateFutureMoitie.replace("{:aideId}", aideId), formData);
  return response.data;
};

export const GetAidesWithConsentService = async () => {
  const response: AxiosResponse = await axios.get(apiUrl.getAidesWithConsent);
  return response.data.data;
};
