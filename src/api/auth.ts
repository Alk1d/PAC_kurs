import { AccessTokenKey } from "../constants/commonConstants";
import { LoginRequestDto, LoginResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

const { axiosPost } = AxiosInstance();

const signIn = async(loginData: LoginRequestDto) => {
     const data = await axiosPost('/login', loginData) as LoginResponseDto;
    sessionStorage.setItem(AccessTokenKey, data.access_token);
    return data;
}


export const AuthApi = {
    signIn
}