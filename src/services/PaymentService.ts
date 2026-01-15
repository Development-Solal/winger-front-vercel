import { IframeModel } from "@/models/PaymentModel";
import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"

export const ProcessPayment = async(aidant_id:string, amount: string, subscription_type: string, credits?: string, iframe_behavior?: IframeModel) => {
    const response: AxiosResponse = await axios.post(apiUrl.processPayment, {aidant_id, amount, subscription_type, credits, iframe_behavior});
    return response.data;
}
export const GetPricingOptions = async () => {
    const response: AxiosResponse = await axios.get(apiUrl.pricing);
    return response.data;
}
export const ProcessPaymentPaypal = async(aidant_id: string,amount: string, subscriptionId: string, subscription_type: string, plan_id?:string, credits?: string   ) => {
    const response: AxiosResponse = await axios.post(apiUrl.processPaymentPaypal, {aidant_id,amount, subscriptionId, subscription_type, plan_id, credits });
    return response.data;
}

export const ConfirmSubscription = async(aidant_id: string, subscriptionId: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.confirmSubscription, {aidant_id, subscriptionId });
    return response.data;
}

export const GetCreditSummary = async(userId: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.getCreditSummary, {userId });
    return response.data;
}

export const GetPurchaseHistory = async(userId: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.getPurchaseHistory, {userId });
    return response.data;
}

export const GetCreditUsageHistory = async(userId: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.getCreditUsageHistory, {userId });
    return response.data;
}

export const GetLiveSubscription = async(aidantId: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.getLiveSubscription, {aidantId });
    return response.data;
}

export const GetSubscriptionHistory = async(userId: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.getSubscriptionHistory, {userId });
    return response.data;
}

export const CancelLiveSubscription = async(subscriptionId:string ,aidant_id: string ) => {
    const response: AxiosResponse = await axios.post(apiUrl.cancelLiveSubscription, {subscriptionId, aidant_id });
    return response.data;
}