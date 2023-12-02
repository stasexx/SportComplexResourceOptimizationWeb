import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar()
{
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src = "/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    OptiGym
                </Menu.Item>
                <Menu.Item name = 'Sports complexes'/>
                <Menu.Item>
                    <Button positive content = 'Registration'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}