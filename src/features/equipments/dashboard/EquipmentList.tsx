import React, { useEffect, useState } from "react";
import { Button, Item, Label, Loader, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ReservationModal from "../modal/ReservationModal";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default observer(function ServiceList() {
  const { t } = useTranslation();
  const { equipmentStore, userStore } = useStore();
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
    setModalOpen(true);
  };

  const handleConfirmReservation = (selectedTime: Date) => {
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
    loadStatusSequentially();

    const intervalId = setInterval(() => {
      loadStatusSequentially();
    }, 30000);

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
                <Label style={{ marginLeft: "10px" }} color={equipment.equipmentStatus ? "red" : "green"}>
                  {equipment.equipmentStatus ? t('equipmentList.busy') : t('equipmentList.free')}
                </Label>
              )}
              <Button
                floated="right"
                content={t('equipmentList.createReservation')}
                color="pink"
                onClick={() => handleReservationClick(equipment.id)}
              />
              {userStore.isLoggedIn && userStore.user?.roles.includes('Owner') && (
                              <Button
                              as={NavLink} 
                              to={`statistic/equipmentUsages/${equipment.id}`}
                              floated="right"
                              content={t('equipmentList.statistic')}
                              color="blue"
                            />
              )}
              {/* Умовний рендерінг кнопки "Update" для ролі "Owner" */}
              {userStore.isLoggedIn && userStore.user?.roles.includes('Owner') && (
                <Button
                  floated="right"
                  content={t('equipmentList.update')}
                  color="orange"
                  onClick={() => handleReservationClick(equipment.id)}
                />
              )}
              {userStore.isLoggedIn && (userStore.user?.roles.includes('Owner') || userStore.user?.roles.includes('Admin')) && (
                <Button
                  floated="right"
                  content={t('equipmentList.delete')}
                  color="red"
                  onClick={() => handleReservationClick(equipment.id)}
                />
              )}
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
