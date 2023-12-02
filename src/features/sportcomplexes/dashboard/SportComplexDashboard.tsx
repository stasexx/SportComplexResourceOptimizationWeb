import React from "react";
import { Grid} from "semantic-ui-react";
import { SportComplex } from "../../../app/models/sportcomplex";
import SportComplexList from "./SportComplexList";
import SportComplexDetails from "../details/SportComplexDetails";
import SportComplexForm from "../form/SportComplexForm";

interface Props 
{
    sportComplexes: SportComplex[];
    selectedSportComplex: SportComplex | undefined;
    selectSportComplex: (id: string) => void;
    cancelSelectSportCompex: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    submitting: boolean;
    createOrEdit: (sportComplex: SportComplex) => void;
}

export default function SportComplexDashboard({sportComplexes, selectedSportComplex,
     selectSportComplex, cancelSelectSportCompex, editMode, openForm, closeForm, submitting, createOrEdit}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <SportComplexList sportComplexes={sportComplexes} selectSportComplex = {selectSportComplex} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedSportComplex && !editMode &&
                <SportComplexDetails 
                    sportComplex={selectedSportComplex} 
                    cancelSelectSportCompex={cancelSelectSportCompex}
                    openForm={openForm}
                />}
                {editMode &&
                <SportComplexForm closeForm={closeForm} 
                sportComplex={selectedSportComplex}
                createOrEdit = {createOrEdit}
                submitting = {submitting}
                 />}
            </Grid.Column>
        </Grid>
    )
}