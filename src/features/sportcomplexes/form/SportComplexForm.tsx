import { Button, Form, Segment } from "semantic-ui-react";
import { SportComplex } from "../../../app/models/sportcomplex";
import { useState, ChangeEvent } from "react";

interface Props
{
    sportComplex: SportComplex | undefined;
    closeForm: () => void;
    createOrEdit: (sportComplex: SportComplex) => void;
    submitting: boolean;
}

export default function SportComplexForm({sportComplex: selectedSportComplex, closeForm, createOrEdit, submitting}: Props)
{
    const initialState = selectedSportComplex ?? {
        id: '',
        name: '',
        email: '',
        city: '',
        address: '',
        description: '',
        operatingHours: '',
        rating: 0
    }

    const [sportComplex, setSportComplex] = useState(initialState)

    function handleSubmit()
    {
        createOrEdit(sportComplex)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setSportComplex({...sportComplex, [name]: value})
    }

    return (
        <Segment>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Name' value={sportComplex.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder='Email' value={sportComplex.email} name='email' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={sportComplex.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Address' value={sportComplex.address} name='address' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={sportComplex.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Rating' value={sportComplex.rating} name='rating' onChange={handleInputChange}/>
                <Form.Input placeholder='Operating hours' value={sportComplex.operatingHours} name='operatingHours' onChange={handleInputChange}/>
                <Button onClick={()=>submitting} floated="right" positive type="submit" content='Submit'/>
                <Button onClick={closeForm} floated="right" positive type="button" content='Cancel'/>
            </Form>
        </Segment>
    )
}