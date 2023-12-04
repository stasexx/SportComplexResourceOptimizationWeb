import { Button, Container, Menu, Image, DropdownMenu, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from "mobx-react-lite";

export default observer(function NavBar()
{
    const {userStore: {user, logout,isLoggedIn}} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src = "/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    OptiGym
                </Menu.Item>
                <Menu.Item as={NavLink} to='/sportcomplexes' name = 'Sports complexes'/>
                {isLoggedIn ? (
                user?.roles.includes('Owner') ? (
                    <Menu.Item>
                        <Button as={NavLink} to='/create/sportcomplexes' color='pink' content='New Sport Comlex' />
                    </Menu.Item>
                ) : (
                    user?.roles.includes('User') ? (
                        <Menu.Item>
                        </Menu.Item>
                        ) : null
                    )
                ) : (
                    <Menu.Item position='right'>
                        
                    </Menu.Item>
                )}

                {isLoggedIn ? (
                    <Menu.Item position='right'>
                        <Image src ={'/assets/user.jpg'} avatar spaced = 'right' />
                        <Dropdown pointing='top left' position='right' text={user?.firstName}>
                                <DropdownMenu>
                                    <Dropdown.Item as={Link} to={`/profile/${user?.id}`}
                                        text='My Profile' icon='user'/> 
                                    <Dropdown.Item onClick={logout} text = 'Logout'/>
                                </DropdownMenu>
                            </Dropdown>    
                    </Menu.Item>
                ) : (
                        <Menu.Item position='right'>
                        <Button as={NavLink} to='/login' positive content='Login' />
                        <Button as={NavLink} to='/register' positive content='Sign Up' />
                        </Menu.Item>
                )}
            </Container>
        </Menu>
    )
})