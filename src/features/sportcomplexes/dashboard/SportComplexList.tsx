import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment, Input } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default observer(function SportComplexList() {
  const { userStore: { user, logout, isLoggedIn } } = useStore();
  const { sportComplexStore } = useStore();
  const { deleteSportComplex, sportComplexes, loading } = sportComplexStore;

  const [target, setTarget] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');

  function handleSportComplexDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteSportComplex(id);
  }

  const { t } = useTranslation();

  // Фільтрація спортивних комплексів за іменем та ID
  const filteredSportComplexes = sportComplexes.filter((sportComplex) =>
    (searchName === '' || sportComplex.name.toLowerCase().includes(searchName.toLowerCase())) &&
    (searchId === '' || sportComplex.id.toLowerCase().includes(searchId.toLowerCase()))
  );

    return (
        <Segment>
            {isLoggedIn && user?.roles.includes('Admin') && (
                <Input
                    icon='search'
                    placeholder='Search by ID...'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                )}
            <Input
                icon='search'
                placeholder='Search by name...'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <Item.Group divided>
            {filteredSportComplexes.map((sportComplex) => (
          <Item key={sportComplex.id}>
                        <Item.Content>
                            <Item.Header as='a'>{sportComplex.name}</Item.Header>
                            <Item.Meta>{sportComplex.email}</Item.Meta>
                            <Item.Description>
                                <div>{sportComplex.description}</div>
                                <div>{sportComplex.city}, {sportComplex.address}</div>
                            </Item.Description>
                            {isLoggedIn ? (
                                user?.roles.includes('Admin') ? (
                                    <Item.Extra>
                                <Button as={Link} to={`/sportcomplexes/${sportComplex.id}`} floated='right' content={t('sportComplexList.view')} color='blue' />
                                <Button 
                                    name = {sportComplex.id}
                                    loading = {loading && target === sportComplex.id}
                                    onClick={(e) => handleSportComplexDelete(e, sportComplex.id)} 
                                    floated='right' 
                                    content={t('sportComplexList.delete')} 
                                    color='red' 
                                />
                                <Label basic content = {sportComplex.rating}/>
                            </Item.Extra>
                            ) : (
                                user?.roles.includes('User') || user?.roles.includes('Owner') ? (
                                    <Item.Extra>
                                <Button as={Link} to={`/sportcomplexes/${sportComplex.id}`} floated='right' content={t('sportComplexList.view')} color='blue'/>
                            </Item.Extra>
                                ) : null
                                    )
                            ) : (
                                <Item.Extra>
                                <Button as={Link} to={`/sportcomplexes/${sportComplex.id}`} floated='right' content={t('sportComplexList.view')} color='blue' />
                                <Label basic content = {sportComplex.rating}/>
                            </Item.Extra>
                                )}
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})