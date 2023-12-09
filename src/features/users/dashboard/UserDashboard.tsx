import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import SportComplexList from "./UserList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import UserList from "./UserList";


export default observer (function UserDashboard(){

    const {userStore} = useStore();

    useEffect(() => 
    {
        userStore.loadUsers();
        console.log(userStore.users)
    }, [userStore])

    if (userStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <UserList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})