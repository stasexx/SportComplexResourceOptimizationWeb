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
            this.sportComplexes = sportComplexes;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectSportComplex = (id: string) => {
        this.selectedSportComplex = this.sportComplexes.find(a=>a.id == id)
    }

    cancelSelectedSportCompex = () => {
        this.selectedSportComplex = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectSportComplex(id) : this.cancelSelectedSportCompex();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createSportComplex = async (sportComplex: SportComplex) => {
        this.loading = true;
        try{
            await agent.SportComplexesRequests.create("6549006cb058a274ca012abc", sportComplex);
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
                if(this.selectedSportComplex?.id === id) this.cancelSelectedSportCompex;
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
