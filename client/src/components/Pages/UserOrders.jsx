import React from 'react';
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query';
import { Tab } from '@headlessui/react';

import axios from 'axios';

import RoomOrderList from './RoomOrderList';
import SchoolOrderCard from '../Cards/SchoolOrderCard';
import UnauthorizedCard from '../Cards/UnauthorizedCard';

function UserOrders(props) {

  const { role } = useSelector(state => state.userReducer);

  const ordersQuery = useQuery('allOrdersQuery', () => axios('/api/userSchedule'));

  let orders;
  if (ordersQuery.isSuccess) { orders = ordersQuery.data.data.orders }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  if (!role) return (<UnauthorizedCard />);

  return (
    <>
      <Tab.Group>
        <Tab.Panels className="mt-2 rounded-lg overflow-y-auto self-stretch">
          <Tab.Panel >
            {orders &&
              <ul className="flex flex-col gap-2 h-fit  ">
                {orders.length > 0 ?
                  orders.map(order => <SchoolOrderCard orders={orders} key={`${order.date}-${order.startTime}-${order['Trainer.id']}`} order={order}></SchoolOrderCard>)
                  :
                  <li className="mx-2 p-2 rounded-lg text-lg justify-self-center bg-white/80 text-center">Записи к инструктору отсутствуют</li>
                }
              </ul>
            }
          </Tab.Panel>
          <Tab.Panel >
            <RoomOrderList />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.List className="slider-list m-2 self-stretch">
          <Tab
            className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            } >
            Записи</Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            } >Бронирования</Tab>
        </Tab.List>
      </Tab.Group>
    </>
  );
}

export default UserOrders;
