import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { Reservation} from '../models/reservation';

export default class ReservationStore
{
    reservations: Reservation[] = [];
    reservationSlots: string[] = []
    reservationRegistry = new Map<string, Reservation>()
    selectedReservation:  Reservation | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false

    constructor()
    {
        makeAutoObservable(this)
    }

    loadReservations = async (id: string) => {
        this.setLoadingInitial(true);
        try{
            const reservation = await agent.EquipmentsRequests.list(id);
            runInAction(()=>{
                this.reservations = reservation;
            })
            console.log(reservation)
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadReservationSlots = async (id: string, dateTime1: string, dateTime2: string, interval: number ) => {
        this.setLoadingInitial(true);
        try{
            console.log(dateTime1)
            const reservation = await agent.ReservationRequests.slots(id, dateTime1, dateTime2, interval);
            runInAction(()=>{
                this.reservationSlots = reservation;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createReservation = async (reservation: Reservation) => {
        this.loading = true;
        try{
            await agent.ReservationRequests.create(reservation);
            runInAction(()=>{
                this.reservations.push(reservation);
                this.selectedReservation = reservation;
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
