import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

export default observer(function ServiceList() {
  const { serviceStore, userStore } = useStore();
  const { services, loading } = serviceStore;
  const { id } = useParams();

  return (
    <Segment>
      <Item.Group divided>
        {services.map((service) => (
          <Item key={service.id}>
            <Item.Content>
              <Item.Header as="a">{service.name}</Item.Header>

              {!userStore.isLoggedIn && (
                <Button as={Link} to={`/sportcomplexes/${id}/services/${service.id}`} floated="right" content="View Equipments" color="blue" />
              )}

            {userStore.isLoggedIn  && (
                <Button as={Link} to={`/sportcomplexes/${id}/services/${service.id}`} floated="right" content="View Equipments" color="blue" />
              )}

              {userStore.isLoggedIn && userStore.user?.roles.includes('Owner') && (
                <>
                <Button as={Link} to={`/sportcomplexes/${id}/services/${service.id}`} floated="right" content="View Equipments" color="blue" />
                  <Button as={Link} to={`/sportcomplexes/${id}/services/${service.id}/serviceUsage/${service.id}`} floated="right" content="Statistic" color="pink" />
                  <Button as={Link} to={`/sportcomplexes/${id}/services/${service.id}/update`} floated="right" content="Update" color="orange" />
                </>
              )}

            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});