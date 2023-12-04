import axios, { AxiosResponse } from 'axios';
import { SportComplex } from '../models/sportcomplex';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5002';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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

const Account = {
    current: () => requests.get('/users/get'),
    login: (user: UserFormValues) => requests.post<User>('/users/login', user),
    register: (user: UserFormValues) => requests.post('users/login', user),
}

const agent = 
{
    SportComplexesRequests,
    Account
}

export default agent;