import React, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useParams } from 'react-router-dom';

const UserUsageStatisticPage: React.FC = () => {
  const { statisticStore } = useStore();
  const { userUsageStatistic, loadUserUsageStatistic, loadingInitial } = statisticStore;
  const { userId } = useParams<{ userId: string }>(); // Отримання userId з URL

  useEffect(() => {
    const fetchData = async () => {
      await loadUserUsageStatistic(userId);
    };

    fetchData();
  }, [loadUserUsageStatistic, userId]);

  useEffect(() => {
    // Вивід у консоль тільки після завершення завантаження даних
    console.log(userUsageStatistic);
  }, [userUsageStatistic]);

  if (loadingInitial) return <LoadingComponents content="Loading statistics..." />;

  // Перетворення часу в секунди
  const data = userUsageStatistic.map(item => ({
    equipmentName: item.equipmentName,
    totalUsageTime: convertTimeToMinutes(item.totalUsageTime),
  }));

  return (
    <div>
      <h2>User Usage Statistic</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="equipmentName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalUsageTime" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Функція для перетворення часу в секунди
const convertTimeToSeconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const convertTimeToHours = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours + minutes / 60 + seconds / 3600;
};

const convertTimeToMinutes = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
};

export default observer(UserUsageStatisticPage);