import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import {makeAutoObservable, runInAction} from 'mobx'
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) =>{
        // eslint-disable-next-line no-useless-catch
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>{
                this.user = user;
            })
            router.navigate('/sportcomplexes')
            console.log(user);
        } catch (error) {
            throw error;
        }

    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user)
        }catch (error){
            console.log(error);
        }
    }
}