import { Button, Container, Menu, Image, DropdownMenu, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { exportToCsv } from '../../app/api/agent';
import { useEffect } from 'react';

export default observer(function NavBar()
{
    const {userStore: {user, logout,isLoggedIn, getUser}} = useStore();
    const { t } = useTranslation();

    useEffect(() => {
        // Ensure user data is loaded after a refresh
        if (isLoggedIn && !user) {
            getUser();
        }
      }, [isLoggedIn, user, getUser]);

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src = "/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    OptiGym
                </Menu.Item>
                <Menu.Item as={NavLink} to='/sportcomplexes' name='navbar.sportsComplexes'>
                    {t('navbar.sportsComplexes')}
                </Menu.Item>
                {isLoggedIn ? (
                user?.roles.includes('Owner') ? (
                    <Menu.Item>
                        <Button as={NavLink} to='/create/sportcomplexes' color='pink' content={t('navbar.newSportComplex')} style={{ marginRight: '40px' }} />
                    </Menu.Item>
                ) : (
                    user?.roles.includes('User') ? (
                        <Menu.Item>
                            <Button as={NavLink} to={`statistic/userUsages/${user.id}`} color='blue' content={t('navbar.myStatistic')} />
                        </Menu.Item>
                        ) : null
                    )
                ) : (
                    <Menu.Item position='right'>
                        
                    </Menu.Item>
                )}
                {isLoggedIn && user?.roles.includes('Admin') && (
                    <Menu.Item>
                        <Button as={NavLink} to={'/users'} color='orange' style={{ marginRight: '40px' }} content={t('navbar.users')} />
                        <Dropdown text={t('navbar.export')} pointing='top left'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => exportToCsv('Users')}>Users</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportToCsv('SportComplexes')}>SportComplexes</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportToCsv('Services')}>Services</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportToCsv('Equipments')}>Services</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportToCsv('Reservations')}>Services</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
                <Menu.Item>
                    <LanguageSelector/>
                </Menu.Item>
                {isLoggedIn ? (
        <Menu.Item position='right'>
          <Image src={'/assets/user.jpg'} avatar spaced='right' />
          <Dropdown pointing='top left' position='right' text={user?.firstName}>
            <DropdownMenu>
              <Dropdown.Item as={Link} to={`/profile/${user?.id}`} text={t('navbar.myProfile')} icon='user' />
              <Dropdown.Item as={Link} to={`/reservation/${user?.id}`} text={t('navbar.reservation')} />
              <Dropdown.Item onClick={logout} text={t('navbar.logout')} />
            </DropdownMenu>
          </Dropdown>
        </Menu.Item>
      ) : (
        <Menu.Item position='right'>
          <Button as={NavLink} to='/login' positive content={t('navbar.login')} style={{ marginRight: '40px' }} />
          <Button as={NavLink} to='/register' positive content={t('navbar.signUp')} />
        </Menu.Item>
      )}
            </Container>
        </Menu>
    )
})