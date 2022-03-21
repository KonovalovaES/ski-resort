import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { prettyPhone } from '../../helpers/pretty';

function ModalRoomOrderInfo({ setModal, id, date }) {

  const order = useQuery(`order${id}/${date}`, () => axios(
    `/api/orders/${id}/${date}`
  ));

  let info;
  if (order.isSuccess) info = order.data.data.order;

  if (order.isLoading) return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-slate-400/70"></div>
  )

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-slate-400/70">
      <div className=" p-2 bg-white w-96 flex flex-col gap-2 rounded-lg">
        <div className=" border rounded-[15px] flex flex-col p-4 gap-4">
          <div className="flex ">
            <div className="p-2 basis-1/4 text-custom-navy rounded-lg">
              Имя
            </div>
            <div className="bg-slate-100 grow p-2 text-custom-navy rounded-lg">
              {info['User.name']}
            </div>
          </div>
          <div className="flex ">
            <div className="p-2 basis-1/4  text-custom-navy rounded-lg">
              Фамилия
            </div>
            <div className="bg-slate-100 grow p-2 text-custom-navy rounded-lg">
              {info['User.surname']}
            </div>
          </div>
          <div className="flex ">
            <div className="p-2 basis-1/4 text-custom-navy rounded-lg">
              Телефон
            </div>
            <div className="bg-slate-100 grow p-2 text-custom-navy rounded-lg">
              {prettyPhone(info['User.phone'])}
            </div>
          </div>
          <div className="flex ">
            <div className="p-2 basis-1/4  text-custom-navy rounded-lg">
              Email
            </div>
            <div className="bg-slate-100 grow p-2 text-custom-navy rounded-lg">
              {info['User.email']}
            </div>
          </div>
        </div>
        <button onClick={() => setModal(false)} className="p-2 text-white  bg-custom-sand font-medium text-lg grow rounded-lg">Закрыть</button>
      </div>
    </div>
  );
}

export default ModalRoomOrderInfo;
