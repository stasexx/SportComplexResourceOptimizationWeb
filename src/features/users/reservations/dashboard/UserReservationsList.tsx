import React, { useState } from "react";
import { Button, Table, Segment, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useStore } from "../../../../app/stores/store";

export default observer(function UserReservationsList() {
  const { reservationStore } = useStore();
  const { t } = useTranslation();

  const [timeFormat, setTimeFormat] = useState("24h"); // Додано стан для відстеження формату часу

  // Функція для конвертації часу з UTC у локальний час з урахуванням формату часу
  const convertUtcToLocal = (utcDateTime) => {
    const format = timeFormat === "24h" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD h:mm:ss A";
    return moment.utc(utcDateTime).local().format(format);
  };

  const activeReservations = reservationStore.userReservations.filter(
    (reservation) => new Date(reservation.endReservation) > new Date()
  );

  const inactiveReservations = reservationStore.userReservations.filter(
    (reservation) => new Date(reservation.endReservation) <= new Date()
  );

  return (
    <Segment>
      <h1> My Reservatons </h1>
      <Button.Group>
        <Button
          active={timeFormat === "24h"}
          onClick={() => setTimeFormat("24h")}
        >
          24h
        </Button>
        <Button.Or />
        <Button
          active={timeFormat === "am_pm"}
          onClick={() => setTimeFormat("am_pm")}
        >
          AM/PM
        </Button>
      </Button.Group>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Start Reservation</Table.HeaderCell>
            <Table.HeaderCell>End Reservation</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Equipment</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="4">
              <b>Active Reservations</b>
            </Table.Cell>
          </Table.Row>
          {activeReservations.map((reservation) => (
            <Table.Row key={reservation.duration}>
              <Table.Cell>{convertUtcToLocal(reservation.startReservation)}</Table.Cell>
              <Table.Cell>{convertUtcToLocal(reservation.endReservation)}</Table.Cell>
              <Table.Cell>{reservation.duration}</Table.Cell>
              <Table.Cell>{reservation.equipmentName}</Table.Cell>
            </Table.Row>
          ))}

          <Table.Row>
            <Table.Cell colSpan="5">
              <b>Inactive Reservations</b>
            </Table.Cell>
          </Table.Row>
          {inactiveReservations.map((reservation) => (
            <Table.Row key={reservation.duration} style={{ color: 'gray' }}>
              <Table.Cell>{convertUtcToLocal(reservation.startReservation)}</Table.Cell>
              <Table.Cell>{convertUtcToLocal(reservation.endReservation)}</Table.Cell>
              <Table.Cell>{reservation.duration}</Table.Cell>
              <Table.Cell>{reservation.equipmentName}</Table.Cell>
              <Table.Cell>
                {/* Додайте кнопки або інші дії */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
});
