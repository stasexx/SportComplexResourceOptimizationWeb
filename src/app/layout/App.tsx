import { Fragment, useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import { SportComplex } from '../models/sportcomplex';
import SportComplexDashboard from '../../sportcomplexes/dashboard/SportComplex';

function App() {

  const [sportComplexes, setSportComplexes] = useState<SportComplex[]>([]);

  useEffect(() => 
  {
    axios.get<SportComplex[]>('http://localhost:5002/sportcomplexes?pageNumber=1&pageSize=10')
      .then(response => {
        console.log(response.data);
        setSportComplexes(response.data.items)
      })
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7cm'}}>
        <SportComplexDashboard sportComplexes = {sportComplexes}/>
      </Container>
    </Fragment>
  );
}

export default App
