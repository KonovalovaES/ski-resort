import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalRoomOrderInfo from '../Modals/ModalRoomOrderInfo';

function DayAdminTimetableButton({ id, date, isMarked, typeId }) {

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isMarked ?
        <button onClick={() => setModal(true)} className="w-10 h-10 rounded-lg p-2 bg-custom-blue myblur"></button>
        :
        <button className="w-10 h-10 rounded-lg p-2 myblur bg-white/60" onClick={() => navigate(`/search/${typeId}`)}></button>
      }
      {modal && <ModalRoomOrderInfo date={date} id={id} setModal={setModal} />}
    </>
  );
}

export default DayAdminTimetableButton;
