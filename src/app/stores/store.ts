import { createContext, useContext } from "react";
import SportComplexStore from "./sportComplexesSrore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ServiceStore from "./servicesStore";
import EquipmentStore from "./equipmentStore";
import ReservationStore from "./reservationStore";
import StatisticStore from "./statisticStore";


interface Store{
    sportComplexStore: SportComplexStore
    userStore: UserStore
    commonStore: CommonStore
    serviceStore: ServiceStore
    equipmentStore: EquipmentStore
    reservationStore: ReservationStore
    statisticStore: StatisticStore
}

export const store: Store = {
   sportComplexStore: new SportComplexStore(),
   userStore: new UserStore(),
   commonStore: new CommonStore(),
   serviceStore: new ServiceStore(),
   equipmentStore: new EquipmentStore(),
   reservationStore: new ReservationStore(),
   statisticStore: new StatisticStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}