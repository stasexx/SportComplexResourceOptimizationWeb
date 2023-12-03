import { Fragment, useEffect } from 'react'
import './styles.css'
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { useStore } from '../stores/store';
import LoadingComponents from './LoadingComponents';

function App() {
  const {commonStore, userStore} = useStore();

  useEffect(()=>{
    if (commonStore.token) {
      userStore.getUser().finally(()=> commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponents content='App loading...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Outlet />
      </Container>
    </Fragment>
  );
}

export default observer (App);
