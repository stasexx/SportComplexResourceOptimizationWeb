import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useParams } from 'react-router-dom';

const EquipmentStatisticPage: React.FC = () => {
  const { statisticStore } = useStore();
  const { equipmentUsage, loadEquipmentUsageStatistic, loadingInitial } = statisticStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      await loadEquipmentUsageStatistic(id);
    };

    fetchData();
  }, [loadEquipmentUsageStatistic, id]);

  if (loadingInitial) return <LoadingComponents content="Loading statistics..." />;

  // Перетворення часу в секунди
  const data = equipmentUsage.map(item => ({
    hour: item.hour + ': 00',
    reservationCount: item.reservationCount,
  }));

  return (
    <div>
      <h2>Equipment Usage Statistic</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reservationCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default observer(EquipmentStatisticPage);