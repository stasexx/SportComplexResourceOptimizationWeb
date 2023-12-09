import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { EquipmentUsage, ServiceUsage, UserUsageStatistic } from '../models/statistics';

export default class StatisticStore
{
    userUsageStatistic: UserUsageStatistic[] = [];
    equipmentUsage: EquipmentUsage[] = [];
    serviceUsage: ServiceUsage[] = [];
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

    loadServiceUsageStatistic = async (id: string, dateTime1: string, dateTime2: string) => {
        this.setLoadingInitial(true);
        try {
          const statistic = await agent.Statistic.serviceDataInervalStatistics(id, dateTime1, dateTime2);
          runInAction(() => {
            this.serviceUsage = statistic;
          });
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
