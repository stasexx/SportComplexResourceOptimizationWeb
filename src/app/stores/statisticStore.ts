import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { EquipmentUsage, UserUsageStatistic } from '../models/statistics';

export default class StatisticStore
{
    userUsageStatistic: UserUsageStatistic[] = [];
    equipmentUsage: EquipmentUsage[] = []
    loading = false;
    loadingInitial = false

    constructor()
    {
        makeAutoObservable(this)
    }

    loadUserUsageStatistic = async (id: string) => {
        this.setLoadingInitial(true);
        try{
            const statistic = await agent.Statistic.userUsageStatistic(id);
            runInAction(()=>{
                this.userUsageStatistic = statistic;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadEquipmentUsageStatistic = async (id: string) => {
        this.setLoadingInitial(true);
        try{
            const statistic = await agent.Statistic.equipmentReservationStatistic(id);
            runInAction(()=>{
                this.equipmentUsage = statistic;
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
