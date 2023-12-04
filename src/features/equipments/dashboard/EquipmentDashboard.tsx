import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ServiceList from "./EquipmentList";
import { useParams } from "react-router-dom";


export default observer (function EquipmentDashboard(){

    const {equipmentStore} = useStore();
    const { id } = useParams();

    useEffect(() => 
    {
        equipmentStore.loadEquipment(id);
        console.log(equipmentStore.equipments);
    }, [id, equipmentStore])

    if (equipmentStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <h1> Equipments </h1>
                <ServiceList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})