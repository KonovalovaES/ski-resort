import React, { memo, useState } from 'react';


function DayCalendarTrainerButton({ date, changeDays, isMarked }) {

  const currentWeekDay = (new Date(date)).toString().split(' ')[0];
  const isWeekEnd = (currentWeekDay === 'Sat' || currentWeekDay === 'Sun');


  const [isClicked, setIsClicked] = useState(isMarked);

  const passiveStyle = "bg-white";
  const activeStyle = "bg-custom-blue/90 text-white/90";

  return (
    <button onClick={() => {
      changeDays(date)
      setIsClicked(!isClicked)
    }
    } className={`p-2 text-center myshadow text-sm rounded-lg ${isClicked ? activeStyle : passiveStyle} ${isWeekEnd && 'border-2 border-red-300'}`}>
      {date.split('-')[2]}
    </ button >
  );
}

export default memo(DayCalendarTrainerButton);
