import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { Service } from '../models/service';

export default class ServiceStore
{
    services: Service[] = [];
    serviceRegistry = new Map<string, Service>()
    selectedService: Service | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false

    constructor()
    {
        makeAutoObservable(this)
    }

    loadServices = async (id: string) => {
        this.setLoadingInitial(true);
        try{
            const sportComplexes = await agent.ServicesRequests.list(id);
            runInAction(()=>{
                this.services = sportComplexes;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}
