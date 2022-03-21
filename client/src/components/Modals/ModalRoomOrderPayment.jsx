import React from 'react';
import { prettyCost } from '../../helpers/pretty'

import spin from '../../css/svg/spin.svg';

function ModalRoomOrderPayment({ setModal, mutation, cost, query }) {

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center backdrop-blur-md bg-slate-400/70 ">
      <div className=" p-2 bg-white w-80 flex flex-col gap-2 rounded-lg">
        <div className=" border rounded-[15px] flex flex-col p-4 gap-4">
          <div className="bg-slate-100 p-2 text-custom-navy rounded-lg">
            **** **** **** ****
          </div>
          <div className="flex gap-2">
            <div className="bg-slate-100 p-2 text-custom-navy rounded-lg grow"> **/**</div>
            <div className="bg-slate-100 p-2 text-custom-navy rounded-lg grow">***</div>
          </div>
        </div>
        <div className="flex  gap-2">
          <button onClick={() => {
            mutation.reset()
            setModal(false)
          }} className="p-2 text-white  bg-custom-sand font-medium text-lg px-4 rounded-lg">Закрыть
          </button>
          {(mutation.isIdle) && <button onClick={() => mutation.mutate()} className='p-2 text-white  font-medium text-lg grow rounded-lg bg-custom-blue'>Оплатить {prettyCost(cost)}₽</button>}
          {(mutation.isLoading || query.isLoading) && <button className='relative  font-medium text-lg grow rounded-lg bg-custom-gray'><img src={spin} className="w-8 top-1/2 animate-spin mx-auto text-white " alt="" /></button>}
          {(mutation.isSuccess) && <button onClick={() => {
            mutation.reset()
            setModal(false)
          }} className='p-2 text-white  font-medium text-lg grow rounded-lg bg-custom-green'>Оплачено </button>}
        </div>
      </div>
    </div>
  );
}

export default ModalRoomOrderPayment;
