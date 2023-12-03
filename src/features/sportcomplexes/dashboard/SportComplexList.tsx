import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function SportComplexList()
{
    const {sportComplexStore} = useStore();
    const {deleteSportComplex, sportComplexes, loading} = sportComplexStore;

    const [target, setTarget] = useState('');

    function handleSportComplexDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name)
        deleteSportComplex(id);
    }

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
                                <Button onClick={() => sportComplexStore.selectSportComplex(sportComplex.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name = {sportComplex.id}
                                    loading = {loading && target === sportComplex.id}
                                    onClick={(e) => handleSportComplexDelete(e, sportComplex.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content = {sportComplex.rating}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})