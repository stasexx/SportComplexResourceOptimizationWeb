import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, Input } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import moment from 'moment';

export default observer(function ReservationModal({
  open,
  onClose,
  onConfirm,
  equipmentId,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (startTime: string, endTime: string, duration: number) => void;
  equipmentId: string | null;
}) {
  const { reservationStore, userStore } = useStore();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [resultStartTime, setResultStartTime] = useState<string>("");
  const [resultEndTime, setResultEndTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);


  const handleConfirm = async () => {
    if (startTime && endTime && selectedDuration && equipmentId) {
      const userId = userStore.getCurrentUserId();
  
      if (!userId) {
        // Handling the case when userId is not available (the user is not logged in)
        console.error("UserId is not available. User may not be logged in.");
        return;
      }
  
      const reservation = {
        userId,
        equipmentId,
        startReservation: resultStartTime,
        endReservation: resultEndTime,
        duration: selectedDuration,
      };

      console.log(reservation);
  
      await reservationStore.createReservation(reservation);
      onClose();
    }
  };


  const handleLoadSlots = async () => {
    if (startTime && endTime && selectedDuration) {
      const currentDate = new Date();
  
      const [startHours, startMinutes] = startTime.split(":");
      currentDate.setHours(Number(startHours), Number(startMinutes), 0);
      const startFormattedDateTime = currentDate.toISOString();
  
      const [endHours, endMinutes] = endTime.split(":");
      currentDate.setHours(Number(endHours), Number(endMinutes), 0);
      const endFormattedDateTime = currentDate.toISOString();
      console.log(equipmentId);

      await reservationStore.loadReservationSlots(equipmentId, startFormattedDateTime, endFormattedDateTime, selectedDuration);
      console.log(reservationStore.reservationSlots);
    }
  };

  const handleSlotChange = (e, data) => {
    const slotValue = data.value as string;
  
    if (slotValue) {
      const [startStr, endStr] = slotValue.split('-');
  
      // Розбити та встановити початковий час
      const [startHours, startMinutes] = startStr.split(':');
      const startDate = moment().set({
        hours: Number(startHours),
        minutes: Number(startMinutes),
        seconds: 0,
        milliseconds: 0,
      });
  
      // Розбити та встановити кінцевий час
      const [endHours, endMinutes] = endStr.split(':');
      const endDate = moment().set({
        hours: Number(endHours),
        minutes: Number(endMinutes),
        seconds: 0,
        milliseconds: 0,
      });
  
      // Форматування в строку "YYYY-MM-DDTHH:mm:ss"
      const formattedStartDate = startDate.format('YYYY-MM-DDTHH:mm:ss');
      const formattedEndDate = endDate.format('YYYY-MM-DDTHH:mm:ss');
  
      // Встановити в state
      setResultStartTime(formattedStartDate);
      setResultEndTime(formattedEndDate);
    }
  };
  
  
  useEffect(() => {
    console.log(reservationStore.reservationSlots);
  }, [reservationStore.reservationSlots]);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Select Reservation Time</Modal.Header>
      <Modal.Content>
        <Input
          type="time"
          label="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Input
          type="time"
          label="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        {/* Drop-down list for choosing the duration of the reservation */}
        <Dropdown
          placeholder="Select Duration"
          fluid
          selection
          options={[5, 10, 15].map((duration) => ({
            key: duration,
            text: `${duration} minutes`,
            value: duration,
          }))}
          onChange={(_, data) => setSelectedDuration(data.value as number)}
        />

        {/* Button to upload slots */}
        <Button onClick={handleLoadSlots} disabled={!startTime || !endTime}>
          Load Reservation Slots
        </Button>

        {/* Drop down list to display slots */}
        <Dropdown
          placeholder="Select Reservation Slot"
          fluid
          selection
          options={reservationStore.reservationSlots.map((slot) => ({
          text: `${slot}`,
          value: slot,
          }))}
          onChange={handleSlotChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button positive onClick={handleConfirm} disabled={!selectedDuration}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
})
