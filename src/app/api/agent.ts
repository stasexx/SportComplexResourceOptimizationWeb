import axios, { AxiosResponse } from 'axios';
import { SportComplex } from '../models/sportcomplex';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { Service } from '../models/service';
import { Equipment } from '../models/equipment';
import { Reservation, ReservationSlots } from '../models/reservation';
import { UserUsageStatistic } from '../models/statistics';

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
    list: () => requests.getMapping<Service[]>('/sportcomplexes?pageNumber=1&pageSize=20'),
    details: (id: string) => requests.get<SportComplex>(`/sportcomplexes/${id}`),
    create: (ownerId: string, sportComplex: SportComplex) => axios.post<void>(`sportcomplexes/create/${ownerId}`, sportComplex),
    update: (sportComplex: SportComplex) => axios.put<void>('/sportcomplexes/update', sportComplex),
    delete: (id: string) => axios.delete<void>(`/sportcomplexes/delete/${id}`)
}

const ServicesRequests = {
    list: (id: string) => requests.getMapping<SportComplex[]>(`/services/visible/${id}?pageNumber=1&pageSize=20`),
}

const EquipmentsRequests = {
    list: (id: string) => requests.getMapping<Equipment[]>(`/equipments/visible/${id}?pageNumber=1&pageSize=20`),
    status: (id: string) => requests.get(`/equipments/status/${id}`)
}

const ReservationRequests = {
    slots: (id: string, dateTime1: string, dateTime2: string, interval: number ) => 
    requests.get<ReservationSlots>(`/reservations/slots/${id}/${dateTime1}/to/${dateTime2}/${interval}`),
    list: (id: string) => requests.getMapping<ReservationSlots[]>(`/equipments/visible/${id}?pageNumber=1&pageSize=20`),
    create: (reservation: Reservation) => axios.post<void>('/reservations', reservation),
}

const Account = {
    current: () => requests.get('/users/get'),
    login: (user: UserFormValues) => requests.post<User>('/users/login', user),
    register: (user: UserFormValues) => requests.post<User>('users/register', user),
}

const Statistic = {
    userUsageStatistic: (id: string) => requests.get(`/statistics/usages/${id}`),
    equipmentReservationStatistic: (id: string) => requests.get(`/statistics/reservations/hours/${id}`)
}

const agent = 
{
    SportComplexesRequests,
    Account,
    ServicesRequests,
    EquipmentsRequests,
    ReservationRequests,
    Statistic
}

export default agent;