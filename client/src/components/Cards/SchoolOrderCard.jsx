import React from 'react';
import { prettyPhone } from '../../helpers/pretty';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

function SchoolOrderCard({ order }) {
  const queryClient = useQueryClient();

  const deleteOrder = useMutation(() => axios({
    url: '/api/userSchedule',
    method: 'DELETE',
    data: {
      date: order.date,
      startTime: order.startTime,
      trainerId: order['Trainer.id'],
    },
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries('allOrdersQuery')
    }
  });

  return (
    <li>
      <div className="card">
        <div className="absolute  w-0 h-0">
        <span className="material-icons text-3xl">{order.sport === 'Сноуборд' ? 'snowboarding' : 'downhill_skiing'}</span>
        </div>
        {
          order['Trainer.photo']
            ? <img className="card-avatar" src={`/photos/${order['Trainer.photo']}`}></img>
            : <img className="card-avatar" src="https://brilliant24.ru/files/cat/template_01.png"></img>
        }
        <div className="card-content">
          <div className="card-name">
            {`${order['Trainer.name']} ${order['Trainer.surname']}`}
          </div>
          <div className="card-info">
            {prettyPhone(order['Trainer.phone'])}
          </div>
          <div className="card-info">
            {`${order.date.split('-')[2]}.${order.date.split('-')[1]} ${order.startTime}:00-${Number(order.startTime) + 1}:00`}
          </div>
        </div>
        <div className="card-delete">
          {deleteOrder.isIdle &&
            <button onClick={() => deleteOrder.mutate()} className="delete-btn">
              <span className="material-icons">delete</span>
            </button>}

          {(deleteOrder.isLoading) &&
            <button className="delete-btn animate-ping">
              <span className="material-icons">delete</span>
            </button>}

          {deleteOrder.isSuccess &&
            <button className="delete-btn ">
              <span className="material-icons">delete</span>
            </button>}
        </div>
      </div>
    </li>
  )
}

export default SchoolOrderCard;
