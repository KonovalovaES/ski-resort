import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import RowAdminTimetable from './RowAdminTimetable';
import { useQuery } from 'react-query';

function AdminTimetable({ dates, type, grade }) {

  const formArray = ['room', 'cottage', 'hotel'];
  const typeArray = ['standart', 'comfort'];
  const rooms = useRef();
  const orders = useRef();

  const { isLoading, isSuccess, data } = useQuery(`adminTableQuery-${type}-${grade}`, () => axios({
    url: '/api/orders',
    method: 'GET',
    headers: {
      form: formArray[type],
      type: typeArray[grade]
    },
  }));

  if (isLoading) return (
    <>
      Загрузка
    </>
  );

  rooms.current = data.data.rooms;
  orders.current = data.data.orders;

  const isMarked = (id, date) => {
    return !!orders.current.find(el => el.start === date && el['Room.id'] === id);
  }

  return (
    <div className="flex flex-col self-stretch rounded-lg overflow-auto mx-2 mb-2 bg-white/70">
      <div className="w-fit h-fit p-2 flex flex-col items-stretch gap-2">
        {
          rooms.current.map(el => <RowAdminTimetable key={el.id} room={el} isMarked={isMarked} dates={dates} typeId={el['Type.id']} />)
        }
        <li className="flex gap-2">
          <button disabled={true} className="p-2 w-10 h-10 text-white font-medium rounded-lg bg-custom-gray/70 myblur"></button>
          {
            dates.map(el => <button disabled={true} key={el} className="p-2 w-10 h-10 text-white font-medium rounded-lg bg-custom-gray/60 myblur">{el.split('-').reverse()[0]}</button>)
          }
        </li>
      </div>
    </div>
  );
}

export default AdminTimetable;
