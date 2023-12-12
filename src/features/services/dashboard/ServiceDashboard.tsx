import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ServiceList from "./ServiceList";
import { Link, useParams } from "react-router-dom";
import userStore from "../../../app/stores/userStore";
import { useTranslation } from "react-i18next";


export default observer (function ServiceDashboard(){
    const {sportComplexStore, userStore} = useStore()
    const {serviceStore} = useStore();
    const { id } = useParams();
    const { t } = useTranslation();

    useEffect(() => 
    {
        serviceStore.loadServices(id);
    }, [id, serviceStore])

    if (serviceStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='13'>
            <h1> {t('serviceList.services')} </h1>
                {userStore.isLoggedIn && userStore.user?.roles.includes('Owner') && (
                    <Button as={Link} to={`/sportcomplexes/${id}/services/newEquipment`} color='green' content='Edit' selectedService>
                    {t('serviceList.createService')}
                </Button>
                )}
                <ServiceList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})