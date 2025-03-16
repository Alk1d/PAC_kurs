import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequestDto, LoginResponseDto} from "../types/apiTypes";
import { AsyncThunkOptions } from "../types/toolkitTypes";
import { AuthApi } from "../api";

const NAMESPACE = 'user';

export const signIn = createAsyncThunk<LoginResponseDto, LoginRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signIn`,
    async(loginData, { rejectWithValue }) => {
        try {
            return await AuthApi.signIn(loginData);
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);