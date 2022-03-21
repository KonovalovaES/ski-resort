import React, { useState, useRef } from 'react';

import { useQuery } from 'react-query'
import axios from 'axios'
import { addZero } from '../../helpers/addZero';

import TrainerCustomerCard from '../Cards/TrainerCustomerCard';

function TrainerOrders(props) {

  const dateRef = useRef();

  const allRecords = useQuery('allRecords', () => axios({ url: '/api/trainerSchedule' }));

  let workingHours;
  if (allRecords.isSuccess) {
    workingHours = allRecords.data.data.schedule.filter(record => record['User.name']);
  }

  const currentDate = new Date();
  const todayStringDay = addZero(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  const [chosenDate, setChosenDate] = useState(todayStringDay);

  return (
    <>
      {allRecords.isLoading && <>Загрузка</>}
      {allRecords.isSuccess &&
        <>
          <ul className="flex flex-col h-full self-stretch mb-2 rounded-lg mt-2 grow gap-2 overflow-y-auto">
            {workingHours.filter(order => order.date === chosenDate).map(info => <TrainerCustomerCard key={`${info.date}-${info.startTime}`} info={info} />)}
          </ul>
          <input type="date" className="date-input p-2 mx-2 mb-2 myshadow" ref={dateRef} onChange={() => setChosenDate(dateRef.current.value)} defaultValue={todayStringDay} />
        </>}
    </>
  );
}

export default TrainerOrders;
