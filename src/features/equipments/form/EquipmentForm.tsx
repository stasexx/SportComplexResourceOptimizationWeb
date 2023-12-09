import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { ChangeEvent, useEffect, useState } from "react";


export default observer (function EquipmentForm()
{
    const {equipmentStore, userStore} = useStore();
    const {selectedEquipment, createEquipment, loading,
        loadEquipment, loadingInitial} = equipmentStore;
    const {seviceId, equipmentId} = useParams();
    const navigate = useNavigate();

    const [equipment, setEquipment] = useState({
        id: '',
        name: ''
    });

    useEffect(() => {
        if (equipmentId) loadEquipment(seviceId).then(equipment => setEquipment(equipment!))
    }, [seviceId, loadEquipment, equipmentId])

    function handleSubmit()
    {
        if(!equipment.id){
            createEquipment(equipment, userStore.user?.id, seviceId).then(() => navigate(`/sportcomplexes`))
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setEquipment({...equipment, [name]: value})
    }

    if(loadingInitial) return <LoadingComponents content="Loading sportcomlex..."/>

    return (
        <Segment clearing>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                    <Form.Input placeholder='Name' value={equipment.name} name='name' onChange={handleChange}/>
                    <Button loading = {loading} floated="right" positive type = 'submit' content='Submit' />
                    <Button floated="right" color='blue' content='Cancel' />
                </Form>
        </Segment>
    )
})