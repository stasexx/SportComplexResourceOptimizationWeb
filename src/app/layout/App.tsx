import { Fragment, useEffect, useState } from 'react'
import './styles.css'
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import { SportComplex } from '../models/sportcomplex';
import SportComplexDashboard from '../../features/sportcomplexes/dashboard/SportComplexDashboard';
import agent from '../api/agent';
import {v4 as uuid} from 'uuid';
import LoadingComponents from './LoadingComponents';

function App() {

  const [sportComplexes, setSportComplexes] = useState<SportComplex[]>([]);
  const [selectedSportComplex, setSelectedSportComplex] = useState <SportComplex | undefined>(undefined);
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState (true)
  const [submitting, setSubmitting] = useState(false)

  function handleSelectSportComplex(id: string) {
    setSelectedSportComplex(sportComplexes.find(x=>x.id == id))
  }

  function handleCancelSelectSportComplex() {
    setSelectedSportComplex(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectSportComplex(id) : handleCancelSelectSportComplex();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditSportComplex(sportComplex: SportComplex)
  {
    setSubmitting(true)
    console.log(sportComplex.id+"FAFAFAFAF")
    if(sportComplex.id)
    {
      agent.SportComplexesRequests.update(sportComplex).then(()=> {
      setSportComplexes([...sportComplexes.filter(x => x.id !== sportComplex.id), sportComplex])
      setSelectedSportComplex(sportComplex);
      console.log("Я ТУТ В АПДЕЙТІ");
      setEditMode(false);
      setSubmitting(false);
    })
    } else {
      sportComplex.id = uuid();
      agent.SportComplexesRequests.create('6549006cb058a274ca012abc', sportComplex).then(()=>{
        setSportComplexes([...sportComplexes, sportComplex])
        setSelectedSportComplex(sportComplex);
        console.log("Я ТУТ В СТВОРЕННІ");
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  useEffect(() => 
  {
    agent.SportComplexesRequests.list().then(response => {
        setSportComplexes(response)
      })
      setLoading(false)
  }, [])

  if (loading) return <LoadingComponents content='Loading app'/>

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7cm'}}>
        <SportComplexDashboard 
        sportComplexes = {sportComplexes}
        selectedSportComplex = {selectedSportComplex}
        selectSportComplex = {handleSelectSportComplex}
        cancelSelectSportCompex = {handleCancelSelectSportComplex}
        editMode = {editMode}
        openForm = {handleFormOpen}
        closeForm = {handleFormClose}
        submitting = {submitting}
        createOrEdit = {handleCreateOrEditSportComplex}
        />
      </Container>
    </Fragment>
  );
}

export default App
