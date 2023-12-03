import { createContext, useContext } from "react";
import SportComplexStore from "./sportComplexesSrore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";


interface Store{
    sportComplexStore: SportComplexStore
    userStore: UserStore
    commonStore: CommonStore
}

export const store: Store = {
   sportComplexStore: new SportComplexStore(),
   userStore: new UserStore(),
   commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}