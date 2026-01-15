import {LoginModel} from "@/models/AuthModel";
import {apiUrl} from "@/utils/api"
import axios from "@/utils/axios";
import {AxiosResponse} from "axios"

export const verifyEmailService = async(token: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.verifyEmail, {token: token});
    return response.data;
}

export const loginService = async(data: LoginModel) => {
    const response: AxiosResponse = await axios.post(apiUrl.login, data);
    return response.data;
}

export const logoutService = async() => {
    const response: AxiosResponse = await axios.get(apiUrl.logout);
    return response.data;
}

export const ForgotPasswordService = async(data: {email: string}) => {
    const response: AxiosResponse = await axios.post(apiUrl.forgotPassword, data);
    return response.data;
}

export const ChangePasswordService = async(data: {userId: string, oldPassword: string, newPassword:string , requiresOldPassword: boolean}) => {
    const response: AxiosResponse = await axios.post(apiUrl.changePassword, data);
    return response.data;
}

export const ResetPasswordService = async(token:string, newPassword: string) => {
    const response: AxiosResponse = await axios.post(apiUrl.resetPassword, { token, newPassword });
    return response.data;
}

export const RefreshTokenService = async() => {
    const response: AxiosResponse = await axios.get(apiUrl.refreshToken);
    return response.data;
}