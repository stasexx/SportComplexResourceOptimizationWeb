import { Button, Form, Segment } from "semantic-ui-react";
import { useState, ChangeEvent } from "react";
import { Formik } from "formik";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function SportComplexForm()
{
    const {sportComplexStore} = useStore();
    const {selectedSportComplex, closeForm, createSportComplex, updateSportComplex, loading} = sportComplexStore;

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
        sportComplex.id ? updateSportComplex(sportComplex) : createSportComplex(sportComplex)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setSportComplex({...sportComplex, [name]: value})
    }

    return (
        <Segment clearing>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                    <Form.Input placeholder='Name' value={sportComplex.name} name='name' onChange={handleChange}/>
                    <Form.Input placeholder='Email' value={sportComplex.email} name='email' onChange={handleChange}/>
                    <Form.Input placeholder='City' value={sportComplex.city} name='city' onChange={handleChange}/>
                    <Form.Input placeholder='Address' value={sportComplex.address} name='address' onChange={handleChange}/>
                    <Form.TextArea placeholder='Description' value={sportComplex.description} name='description' onChange={handleChange}/>
                    <Form.Input placeholder='Rating' value={sportComplex.rating} name='rating' onChange={handleChange}/>
                    <Form.Input placeholder='Operating hours' value={sportComplex.operatingHours} name='operatingHours' onChange={handleChange}/>
                    <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                    <Button onClick={closeForm} floated="right" positive type="button" content='Cancel'/>
                </Form>
        </Segment>
    )
})