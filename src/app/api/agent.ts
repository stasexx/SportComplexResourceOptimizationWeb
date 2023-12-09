import axios, { AxiosResponse } from 'axios';
import { SportComplex } from '../models/sportcomplex';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { Service } from '../models/service';
import { Equipment, EquipmentWithouStatus } from '../models/equipment';
import { Reservation} from '../models/reservation';

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
    postUrl: <T> (url: string) => axios.post<T>(url).then(responseBody),
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
    status: (id: string) => requests.get(`/equipments/status/${id}`),
    create: (equipment: EquipmentWithouStatus, userId: string, serviceId: string) => requests.post(`/equipments/create/${serviceId}/${userId}`, equipment)
}

const ReservationRequests = {
    slots: (id: string, dateTime1: string, dateTime2: string, interval: number ) => 
    requests.get<Reservation>(`/reservations/slots/${id}/${dateTime1}/to/${dateTime2}/${interval}`),
    list: (id: string) => requests.getMapping<Reservation[]>(`/equipments/visible/${id}?pageNumber=1&pageSize=20`),
    create: (reservation: Reservation) => axios.post<void>('/reservations', reservation),
    userReservations: (id: string) => requests.get(`/reservations/${id}`),
}

const Users = {
    list: () => requests.getMapping<User[]>("/users?pageNumber=1&pageSize=20"),
}

const Account = {
    current: () => requests.get('/users/get'),
    login: (user: UserFormValues) => requests.post<User>('/users/login', user),
    register: (user: UserFormValues) => requests.post<User>('users/register', user),
    ban: (id: string) => requests.delete(`/users/ban/${id}`)
}

const Statistic = {
    userUsageStatistic: (id: string) => requests.get(`/statistics/usages/${id}`),
    equipmentReservationStatistic: (id: string) => requests.get(`/statistics/reservations/hours/${id}`),
    serviceDataInervalStatistics: (id: string, dateTime1: string, dateTime2: string) => requests.get(`/statistics/equipment/${dateTime1}/${dateTime2}/${id}`)
}

export const exportToCsv = async (collectionName) => {
    try {
        const response = await axios.get(`/export/exportCVS/${collectionName}`);
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${collectionName}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting to CSV', error);
    }
};

const agent = 
{
    SportComplexesRequests,
    Account,
    ServicesRequests,
    EquipmentsRequests,
    ReservationRequests,
    Statistic,
    exportToCsv,
    Users
}

export default agent;