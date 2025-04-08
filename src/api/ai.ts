import { AccessTokenKey } from "../constants/commonConstants";
import { AiRequestDto, AiResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

const { axiosPost } = AxiosInstance();

export const AiApi = () => {
const token = sessionStorage.getItem(AccessTokenKey) ?? '';
const { axiosPost } = AxiosInstance(token);

const generateResponse = async(requstPrompt: AiRequestDto) => {
    const response: string = await axiosPost('/generate', requstPrompt);
    return response;
    };

    return {
        generateResponse
    };
}