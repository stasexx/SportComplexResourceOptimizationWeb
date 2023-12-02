import React from "react";
import { Grid, List } from "semantic-ui-react";
import { SportComplex } from "../../app/models/sportcomplex";

interface Props 
{
    sportComplexes: SportComplex[];
}

export default function SportComplexDashboard({sportComplexes}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <List>
                {sportComplexes.map(sportComplex => (
                    <List.Item key = {sportComplex.id}>
                {sportComplex.name}
                    </List.Item>
                ))}
            </List>
            </Grid.Column>
        </Grid>
    )
}