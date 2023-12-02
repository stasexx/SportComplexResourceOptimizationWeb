import React from "react";
import { SportComplex } from "../../../app/models/sportcomplex";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props 
{
    sportComplexes: SportComplex[];
    selectSportComplex: (id: string) => void;
}

export default function SportComplexList({sportComplexes, selectSportComplex}: Props)
{
    return (
        <Segment>
            <Item.Group divided>
                {sportComplexes.map(sportComplex => (
                    <Item key={sportComplex.id}>
                        <Item.Content>
                            <Item.Header as='a'>{sportComplex.name}</Item.Header>
                            <Item.Meta>{sportComplex.email}</Item.Meta>
                            <Item.Description>
                                <div>{sportComplex.description}</div>
                                <div>{sportComplex.city}, {sportComplex.address}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectSportComplex(sportComplex.id)} floated='right' content='View' color='blue' />
                                <Label basic content = {sportComplex.rating}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}