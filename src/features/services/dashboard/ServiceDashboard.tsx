import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ServiceList from "./ServiceList";
import { useParams } from "react-router-dom";


export default observer (function ServiceDashboard(){
    const {sportComplexStore} = useStore()
    const {serviceStore} = useStore();
    const { id } = useParams();

    useEffect(() => 
    {
        serviceStore.loadServices(id);
    }, [id, serviceStore])

    if (serviceStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ServiceList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})