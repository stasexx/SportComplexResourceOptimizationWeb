import React, { useState } from "react";
import { Button, Item, Label, Segment, Input } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default observer(function UserList() {
  const { userStore: { user, users, isLoggedIn, ban, unban } } = useStore();

  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');

  const { t } = useTranslation();

  const filteredUsers = users.filter((user) =>
    (searchName === '' || user.email.toLowerCase().includes(searchName.toLowerCase())) &&
    (searchId === '' || user.id.toLowerCase().includes(searchId.toLowerCase()))
  );

  const handleBanClick = (userId: string) => {
    ban(userId);
  };

  const handleUnbanClick = (userId: string) => {
    unban(userId);
  };

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
        placeholder='Search by email...'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <Item.Group divided>
        {filteredUsers.map((user) => (
          <Item key={user.id}>
            <Item.Content>
              <Item.Header as='a'>Email: {user.email}</Item.Header>
              <Item.Meta>ID: {user.id}</Item.Meta>
              <Item.Description>
                <div>Phone: {user.phone}</div>
                <div>Status: {user.isDeleted.toString()}</div>
              </Item.Description>
              <Item.Extra>
                {user.isDeleted ? (
                  <Button
                    floated='right'
                    content={t('userList.unban')}
                    color='green'
                    onClick={() => handleUnbanClick(user.id)}
                  />
                ) : (
                  <Button
                    floated='right'
                    content={t('userList.ban')}
                    color='red'
                    onClick={() => handleBanClick(user.id)}
                  />
                )}
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
