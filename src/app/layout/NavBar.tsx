import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar()
{
    const {sportComplexStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src = "/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    OptiGym
                </Menu.Item>
                <Menu.Item name = 'Sports complexes'/>
                <Menu.Item>
                    <Button onClick={()=>sportComplexStore.openForm()} positive content = 'New Sport Comlex'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}