import { Fragment, useEffect} from 'react'
import './styles.css'
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import SportComplexDashboard from '../../features/sportcomplexes/dashboard/SportComplexDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {sportComplexStore} = useStore();

  useEffect(() => 
  {
    sportComplexStore.loadSportComplexes();
  }, [sportComplexStore])

  if (sportComplexStore.loadingInitial) return <LoadingComponents content='Loading app'/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7cm'}}>
        <SportComplexDashboard />
      </Container>
    </Fragment>
  );
}

export default observer (App);
