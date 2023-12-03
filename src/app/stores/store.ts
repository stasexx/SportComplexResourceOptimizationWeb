import { createContext, useContext } from "react";
import SportComplexStore from "./sportComplexesSrore";


interface Store{
    sportComplexStore: SportComplexStore
}

export const store: Store = {
   sportComplexStore: new SportComplexStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}