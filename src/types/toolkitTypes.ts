import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export interface AsyncThunkOptions {
    rejectValue: string;
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>;
}