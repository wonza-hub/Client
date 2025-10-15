import axios, { AxiosError } from 'axios';
import { IServerErrorResponse } from '../_types/type';

export default function isServerError(error: unknown): error is AxiosError<IServerErrorResponse> {
    return axios.isAxiosError(error);
}
