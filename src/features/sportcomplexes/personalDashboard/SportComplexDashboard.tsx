import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import SportComplexList from "./SportComplexList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";


export default observer (function PersonalSportComplexDashboard(){

    const {sportComplexStore} = useStore();

    useEffect(() => 
    {
        sportComplexStore.loadSportComplexes();
    }, [sportComplexStore])

    if (sportComplexStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <SportComplexList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})