import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import UserList from "./UserReservationsList";
import LoadingComponents from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import { useParams } from "react-router-dom";
import UserReservationsList from "./UserReservationsList";


export default observer (function UserReservations(){

    const {reservationStore} = useStore();
    const { id } = useParams();

    useEffect(() => 
    {
        reservationStore.loadUserReservation(id);
        console.log(reservationStore.userReservations)
    }, [reservationStore, id])

    if (reservationStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <UserReservationsList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})