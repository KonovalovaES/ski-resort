
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

import ListboxMonth from '../Listbox/ListboxMonth';
import DayCalendarTrainerButton from '../Elements/DayCalendarTrainerButton';

import { addZero } from '../../helpers/addZero';
import { getDates } from '../../helpers/getDates';

import spin from '../../css/svg/spin.svg';


function CalendarTrainer(props) {

  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;

  const season = {
    prevYear: (curMonth < 6) ? curYear - 1 : curYear,
    nextYear: (curMonth < 6) ? curYear : curYear + 1,
  };

  const months = [
    { id: 9, name: 'Сентябрь', days: 30 },
    { id: 10, name: 'Октябрь', days: 31 },
    { id: 11, name: 'Ноябрь', days: 30 },
    { id: 12, name: 'Декабрь', days: 31 },
    { id: 1, name: 'Январь', days: 31 },
    { id: 2, name: 'Февраль', days: (season.nextYear % 4 === 0) ? 29 : 28 },
    { id: 3, name: 'Март', days: 31 },
    { id: 4, name: 'Апрель', days: 30 },
  ];

  const savedDay = useRef();
  const { id } = useSelector(state => state.userReducer);
  const [month, setMonth] = useState(months.find(month => month.id === curMonth));

  const daysArray = [];
  for (let day = 1; day <= month.days; day += 1) {
    daysArray.push(addZero(
      (month > 6) ? season.prevYear : season.nextYear,
      month.id,
      day
    ));
  }

  useEffect(() => {
    console.log('month refresh');
    saveRecords.reset();
  }, [month]);

  const shiftDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const firstWeekDay = (new Date(daysArray[0])).toString().split(' ')[0];
  const shiftAmount = shiftDays.indexOf(firstWeekDay);
  const pseudoArr = [];
  for (let i = 0; i < shiftAmount; i += 1)  pseudoArr.push(1);

  const queryClient = useQueryClient();
  const allRecords = useQuery(`allRecords-id${id}-month${month.id}`, () => axios({ url: '/api/trainerSchedule' }));

  const saveRecords = useMutation(() => axios({
    url: '/api/trainerSchedule',
    method: 'PUT',
    data: { days: workingDays },
  }),
  { onSuccess: () => queryClient.invalidateQueries(`allRecords-id${id}-month${month.id}`) });

  let workingDays;
  if (allRecords.isSuccess) {
    workingDays = getDates(allRecords.data.data.schedule);
  }

  const changeDays = (day) => {
    savedDay.current = (day)
    if (saveRecords.isSuccess) { saveRecords.reset() }

    (workingDays.includes(day))
      ?
      workingDays = workingDays.filter(el => el !== day)
      :
      workingDays.push(day);
  }

  // когда сбрасываем цвет кнопки по нажатию еще одного дня, меняется стейт
  // поэтому первая кнопка которую нажали теряется из масссива
  // фиксим это
  if (savedDay.current && (saveRecords.isIdle)) { changeDays(savedDay.current) }

  if (allRecords.isLoading) return "";

  return (
    <div className="flex flex-col gap-2 self-stretch ">
      <div className="grid grid-cols-7 gap-2 mx-2 myblur p-2 rounded-lg">
        {pseudoArr.map((el, ind) => <div key={`pseudo-${ind}`} className=""></div>)}
        {allRecords.isSuccess && daysArray.map((date) => <DayCalendarTrainerButton key={`${date}-btn`} date={date} changeDays={changeDays} isMarked={workingDays.includes(date)} />)}
      </div>

      <div className="mx-2 flex gap-2">
        <div className="p-2 text-center rounded-lg text-custom-navy myblur">
          {`${season.prevYear}/${season.nextYear}`}
        </div>
        <ListboxMonth key={`month-${month.id}`} setMonth={setMonth} month={month} months={months} />
      </div>
      {(saveRecords.isIdle) && <button onClick={() => saveRecords.mutate()} className='basic-btn  h-12 mx-2 mb-2 myshadow bg-custom-blue'>Сохранить расписание</button>}
      {(saveRecords.isLoading || allRecords.isLoading) && <button className='mx-2 mb-2 myshadow h-12  font-medium text-lg grow rounded-lg bg-custom-gray p-2 flex'>
        <img src={spin} className="w-8 top-1/2 animate-spin mx-auto text-white " alt="" /></button>}
      {(saveRecords.isSuccess) && <button className="basic-btn bg-custom-green h-12 mx-2 mb-2 myshadow">Расписание сохранено</button>}
    </div>
  );
}

export default CalendarTrainer;
