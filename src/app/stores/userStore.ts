import agent from "../api/agent";
import { User, UserFormValues, UserList } from "../models/user";
import {makeAutoObservable, runInAction} from 'mobx'
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;
    users: UserList[] = [];
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !! this.user;
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

    
    register = async (creds: UserFormValues) =>{
        // eslint-disable-next-line no-useless-catch
        try{
            const user = await agent.Account.register(creds);
            runInAction(()=>{
                this.user = user;
                user.roles = user.roles || [];
                user.roles.push("User")
            })
            router.navigate('/')
            console.log(user);
        } catch (error) {
            throw error;
        }

    }

    loadUsers = async () => {
        this.setLoadingInitial(true);
        try{
            const usersLocal = await agent.Users.list();
            runInAction(()=>{
                this.users = usersLocal;
            })
            console.log("ARR:", this.users);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    ban = async (id: string) => {
        try {
          await agent.Account.ban(id);
          runInAction(() => {
            const updatedUsers = this.users.map((user) =>
              user.id === id ? { ...user, isDeleted: true } : user
            );
            this.users = updatedUsers;
          });
        } catch (error) {
          console.error("Error banning user", error);
        }
      };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
    }

    getCurrentUserId = (): string | null => {
        return this.user?.id ?? null;
      };

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user)
        }catch (error){
            console.log(error);
        }
    }
}