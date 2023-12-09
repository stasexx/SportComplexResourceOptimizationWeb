import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { Equipment, EquipmentWithouStatus } from '../models/equipment';

export default class EquipmentStore
{
    equipments: Equipment[] = [];
    equipmentRegistry = new Map<string, Equipment>()
    selectedEquipment:  EquipmentWithouStatus | undefined = undefined;
    equipmentWithouStatus: EquipmentWithouStatus[] = [];
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

    createEquipment = async (equipment: EquipmentWithouStatus, userId: string, serviceId: string) => {
      this.loading = true;
      try{
          await agent.EquipmentsRequests.create(equipment, userId, serviceId);
          runInAction(()=>{
              this.equipmentWithouStatus.push(equipment);
              this.selectedEquipment = equipment;
              this.editMode = false;
              this.loading = false;
          })
      } catch (error) {
          console.log(error);
          runInAction(() => {
              this.loading = false;
          })
      }
  }
}
