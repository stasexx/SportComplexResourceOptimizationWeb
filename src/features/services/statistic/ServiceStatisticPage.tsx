import React, { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useParams } from 'react-router-dom';
import { DatePicker, Space, Button } from 'antd';
import moment, { Moment, MomentInput } from 'moment';

const { RangePicker } = DatePicker;

const ServiceStatisticPage: React.FC = () => {
  const { statisticStore } = useStore();
  const { serviceUsage, loadServiceUsageStatistic, loadingInitial } = statisticStore;
  const { id } = useParams<{ id: string }>();
  const [dateRange, setDateRange] = useState<[Moment, MomentInput] | null>(null);

  useEffect(() => {
    // Відразу при завантаженні компонента не завантажуємо статистику
  }, []);

  const fetchData = async () => {
    if (dateRange) {
      const [start, end] = dateRange;
      await loadServiceUsageStatistic(id, start.toISOString(), end.toISOString());
    }
  };

  const handleLoadStatistics = () => {
    fetchData();
  };

  if (loadingInitial) return <LoadingComponents content="Loading statistics..." />;

  // Перетворення часу в секунди
  const data = serviceUsage.map(item => ({
    equipmentName: item.equipmentName,
    reservationCount: item.reservationCount,
  }));

  return (
    <div>
      <h2>Service Usage Statistic</h2>
      
      <Space direction="vertical" style={{ marginBottom: 16 }}>
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={['Start Time', 'End Time']}
        />
        <Button type="primary" onClick={handleLoadStatistics}>
          Load Statistics
        </Button>
      </Space>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="equipmentName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reservationCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default observer(ServiceStatisticPage);
