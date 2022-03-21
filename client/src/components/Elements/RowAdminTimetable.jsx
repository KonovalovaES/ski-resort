import React from 'react';

import DayAdminTimetableButton from './DayAdminTimetableButton';

function RowAdminTimetable({ room, dates, isMarked, typeId }) {
  return (
    <li className="flex gap-2">
       <button disabled={true} className="w-10 h-10 p-2 text-white font-medium rounded-lg bg-custom-gray/70 myblur">{room.id}</button>
      {
        dates.map(date => <DayAdminTimetableButton key={`${room.id}-${date}`} id={room.id} typeId={typeId} date={date} isMarked={isMarked(room.id, date)}/>)
      }
    </li>
  );
}

export default RowAdminTimetable;
