import axios, { AxiosResponse } from 'axios';
import { SportComplex } from '../models/sportcomplex';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5002';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;
const responseBodyItems = <T> (response: AxiosResponse<T>) => response.data.items;

const requests = 
{
    getMapping: <T> (url: string) => axios.get<T>(url).then(responseBodyItems),
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}


const SportComplexesRequests = {
    list: () => requests.getMapping<SportComplex[]>('/sportcomplexes?pageNumber=1&pageSize=20'),
    details: (id: string) => requests.get<SportComplex>(`/sportcomplexes/${id}`),
    create: (ownerId: string, sportComplex: SportComplex) => axios.post<void>(`sportcomplexes/create/${ownerId}`, sportComplex),
    update: (sportComplex: SportComplex) => axios.put<void>('/sportcomplexes/update', sportComplex),
    delete: (id: string) => axios.delete<void>(`/sportcomplexes/delete/${id}`)
}

const agent = 
{
    SportComplexesRequests
}

export default agent;