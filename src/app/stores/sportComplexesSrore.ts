import {makeAutoObservable, runInAction} from 'mobx'
import { SportComplex } from '../models/sportcomplex'
import agent from '../api/agent';

export default class SportComplexStore
{
    sportComplexes: SportComplex[] = [];
    sportComplexRegistry = new Map<string, SportComplex>()
    selectedSportComplex: SportComplex | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false

    constructor()
    {
        makeAutoObservable(this)
    }

    loadSportComplexes = async () => {
        this.setLoadingInitial(true);
        try{
            const sportComplexes = await agent.SportComplexesRequests.list();
            runInAction(()=>{
                this.sportComplexes = sportComplexes;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadSportComplex = async (id: string) => {
        let sportComplex = this.getSportComplex(id);
        if(sportComplex) {
            this.selectedSportComplex = sportComplex;
            return sportComplex;
        }
        else {
            this.setLoadingInitial(true);
            try {
                sportComplex = await agent.SportComplexesRequests.details(id);
                runInAction(()=>{
                    this.selectedSportComplex = sportComplex
                })
                this.sportComplexRegistry.set(sportComplex.id, sportComplex);
                this.setLoadingInitial(false);
                return sportComplex;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false)
            }
        }
    }


    private getSportComplex = (id: string) => {
        return this.sportComplexRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createSportComplex = async (sportComplex: SportComplex, ownerId: string) => {
        this.loading = true;
        try{
            await agent.SportComplexesRequests.create(ownerId, sportComplex);
            runInAction(()=>{
                this.sportComplexes.push(sportComplex);
                this.selectedSportComplex = sportComplex;
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

    updateSportComplex = async (sportComplex: SportComplex) => {
        this.loading = true;
        try {
            await agent.SportComplexesRequests.update(sportComplex);
            runInAction(() => {
                this.sportComplexes = [...this.sportComplexes.filter(a => a.id !== sportComplex.id), sportComplex]
                this.selectedSportComplex = sportComplex;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    deleteSportComplex = async (id: string) => {
        this.loading = true;
        try {
            await agent.SportComplexesRequests.delete(id);
            runInAction(() => {
                this.sportComplexes = [...this.sportComplexes.filter(a => a.id !== id)];
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=> {
                this.loading = false;
            })
        }
    }
}
