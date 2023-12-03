import React from "react";
import { Grid} from "semantic-ui-react";
import SportComplexList from "./SportComplexList";
import SportComplexDetails from "../details/SportComplexDetails";
import SportComplexForm from "../form/SportComplexForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function SportComplexDashboard(){

    const {sportComplexStore} = useStore();
    const {selectedSportComplex, editMode} = sportComplexStore;

    return(
        <Grid>
            <Grid.Column width='10'>
                <SportComplexList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedSportComplex && !editMode &&
                <SportComplexDetails />}
                {editMode &&
                <SportComplexForm />}
            </Grid.Column>
        </Grid>
    )
})