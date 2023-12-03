import { Button, Form, Segment } from "semantic-ui-react";
import { useState, ChangeEvent, useEffect } from "react";
import { Formik } from "formik";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SportComplex } from "../../../app/models/sportcomplex";
import LoadingComponents from "../../../app/layout/LoadingComponents";


export default observer (function SportComplexForm()
{
    const {sportComplexStore} = useStore();
    const {selectedSportComplex, createSportComplex, updateSportComplex, loading,
        loadSportComplex, loadingInitial} = sportComplexStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [sportComplex, setSportComplex] = useState({
        id: '',
        name: '',
        email: '',
        city: '',
        address: '',
        description: '',
        operatingHours: '',
        rating: 0
    });

    useEffect(() => {
        if (id) loadSportComplex(id).then(sportComplex => setSportComplex(sportComplex!))
    }, [id, loadSportComplex])

    function handleSubmit()
    {
        if(!sportComplex.id){
            createSportComplex(sportComplex).then(() => navigate(`/sportcomplexes/${sportComplex.id}`))
        } else {
            updateSportComplex(sportComplex).then(() => navigate(`/sportcomplexes/${sportComplex.id}`))
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setSportComplex({...sportComplex, [name]: value})
    }

    if(loadingInitial) return <LoadingComponents content="Loading sportcomlex..."/>

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
                    <Button loading = {loading} floated="right" positive type = 'submit' content='Submit' />
                    <Button floated="right" color='blue' content='Cancel' />
                </Form>
        </Segment>
    )
})