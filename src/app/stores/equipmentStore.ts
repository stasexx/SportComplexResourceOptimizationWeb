import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { Equipment } from '../models/equipment';

export default class EquipmentStore
{
    equipments: Equipment[] = [];
    equipmentRegistry = new Map<string, Equipment>()
    selectedEquipment:  Equipment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    equipmentStatus: boolean | undefined = undefined;

    constructor()
    {
        makeAutoObservable(this)
    }

    loadEquipmentStatus = async (id: string) => {
        try {
          const status = await agent.EquipmentsRequests.status(id);
          runInAction(() => {
            // Встановлюйте статус для конкретного обладнання
            const equipment = this.equipments.find(e => e.id === id);
            if (equipment) {
              equipment.equipmentStatus = status;
            }
          });
          console.log(status);
        } catch (error) {
          console.log(error);
        }
    };
    

    loadEquipment = async (id: string) => {
        this.setLoadingInitial(true);
        try{
            const sportComplexes = await agent.EquipmentsRequests.list(id);
            runInAction(()=>{
                this.equipments = sportComplexes;
            })
            console.log(sportComplexes)
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
