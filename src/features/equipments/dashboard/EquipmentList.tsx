import React, { useEffect, useState } from "react";
import { Button, Item, Label, Loader, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ReservationModal from "../modal/ReservationModal";
import { NavLink } from "react-router-dom";

export default observer(function ServiceList() {
  const { equipmentStore } = useStore();
  const {
    equipments,
    loading,
    loadingStatus,
    equipmentStatus,
    loadEquipmentStatus,
  } = equipmentStore;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );

  const handleReservationClick = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    console.log("Selected Time:", equipmentId);
    setModalOpen(true);
  };

  const handleConfirmReservation = (selectedTime: Date) => {
    // Обробка підтвердження резервації
    console.log("Selected Time:", selectedTime);
  };

  const handleModalClose = () => {
    setSelectedEquipmentId(null);
    setModalOpen(false);
  };

  const loadStatusSequentially = async () => {
    for (const equipment of equipments) {
      await loadEquipmentStatus(equipment.id);
    }
  };

  useEffect(() => {
    // Викликати функцію при першому відкритті сторінки
    loadStatusSequentially();

    // Запустити перевірку кожні 30 секунд
    const intervalId = setInterval(() => {
      loadStatusSequentially();
    }, 30000);

    // Очистити інтервал при виході з компоненту
    return () => clearInterval(intervalId);
  }, [equipments, loadEquipmentStatus]);

  return (
    <Segment>
      <Item.Group divided>
        {equipments.map((equipment) => (
          <Item key={equipment.id}>
            <Item.Content>
              <Item.Header as="a">{equipment.name}</Item.Header>
              {equipment.equipmentStatus === undefined ? (
                <Loader active inline="centered" />
              ) : (
                <Label style={{ marginLeft: "10px" }} color={equipment.equipmentStatus ? "green" : "red"}>
                  {equipment.equipmentStatus ? "Online" : "Offline"}
                </Label>
              )}
              <Button
                floated="right"
                content="Create Reservation"
                color="pink"
                onClick={() => handleReservationClick(equipment.id)}
              />
              <Button
                as={NavLink} 
                to={`statistic/equipmentUsages/${equipment.id}`}
                floated="right"
                content="Statistic"
                color="blue"
              />

            </Item.Content>
          </Item>
        ))}
      </Item.Group>

      <ReservationModal
        open={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmReservation}
        equipmentId={selectedEquipmentId}
      />
    </Segment>
  );
});