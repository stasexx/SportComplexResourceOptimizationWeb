import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ServiceList from "./EquipmentList";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default observer (function EquipmentDashboard(){
    const { t } = useTranslation();
    const {equipmentStore, userStore} = useStore();
    const { seviceId, id } = useParams();

    useEffect(() => 
    {
        equipmentStore.loadEquipment(seviceId);
        console.log(equipmentStore.equipments);
    }, [seviceId, equipmentStore])

    if (equipmentStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='13'>
                <h1> {t('equipmentList.equipment')} </h1>
                {userStore.isLoggedIn && userStore.user?.roles.includes('Owner') && (
                    <Button as={Link} to={`/sportcomplexes/${id}/services/${seviceId}/newEquipment`} color='green' content='Edit' selectedService>
                    Create Equipment
                </Button>
                )}
                <ServiceList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})