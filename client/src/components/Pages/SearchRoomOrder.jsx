import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios'

import { countGapValue } from '../../helpers/countGapValue';
import { countCost } from '../../helpers/countCost'
import { nextStringDate } from '../../helpers/nextStringDate';
import { toStringDate } from '../../helpers/toStringDate';
import { prettyCost } from '../../helpers/pretty'

import Slider from '../Elements/Slider';
import ModalRoomOrderPayment from '../Modals/ModalRoomOrderPayment';

function SearchRoomOrder(props) {

  const { type } = useParams();
  const gapRef = useRef();
  const startRef = useRef();
  const roomRef = useRef();
  const finishRef = useRef();
  const queryClient = useQueryClient();
  const { role } = useSelector(state => state.userReducer);

  const [startDate, setStartDate] = useState(nextStringDate(toStringDate(new Date()), 1));
  const [gap, setGap] = useState(1);
  const [finishDate, setFinishDate] = useState(nextStringDate(startDate, gap));

  const [modal, setModal] = useState(false);

  // назначаем заголовки вне useQuery, так как не нашел способа дождаться изменения стейта finishDate
  axios.defaults.headers.common['start'] = startDate;
  axios.defaults.headers.common['finish'] = finishDate;
  axios.defaults.headers.common['type'] = type;

  // подгружаем список свободных коттеджей/домов по выбранным датам
  const avaliableRooms = useQuery('avaliableRooms', () => axios('/api/avaliable'));
  // подгружаем описание данного типа
  const typeInfo = useQuery('typeInfo', () => axios(`/api/types/${type}`));

  const dookDays = useMutation(() => axios({
    url: '/api/avaliable',
    method: 'POST',
    data: {
      start: startDate,
      days: gap,
      roomId: Number(roomRef.current.value)
    },
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries('avaliableRooms');
    },
    onError: (error) => window.alert(error.response.data.error),
  });

  // когда подгружится запрос в avaliable ставим список всех доступных номеров/домов
  let avaliable;
  if (avaliableRooms.isSuccess) avaliable = avaliableRooms.data.data.sort((a, b) => a - b);

  let thisType;
  let cost;
  if (typeInfo.isSuccess) {
    // когда подгружится запрос по типу дома, заполняем данные
    thisType = typeInfo.data.data;
    // когда подгружится запрос по типу дома, пересчитываем стоимость
    cost = countCost(startDate, gap, thisType.weekdayCost, thisType.weekendCost);
  }

  // при изменении старта финиш тоже меняется, на основании выбранного количества дней
  useEffect(() => {
    setFinishDate(nextStringDate(startDate, gap));
    finishRef.current.value = nextStringDate(startDate, gap);
    gapRef.current.value = gap;
  }, [startDate, gap]);

  // когда финиш изменился мы можем на основании старта и финиша отпаравить новый запрос
  useEffect(() => {
    queryClient.invalidateQueries('avaliableRooms');
  }, [finishDate, queryClient]);

  return (
    <>
      <div className="grow m-2 rounded-lg overflow-y-auto myblur">
        <div className="w-full p-2 flex flex-col gap-2 justify-between rounded-lg mb-2 ">
          <Slider type={type} />
          <h1 className="w-full text-xl flex items-center">
            {thisType ? thisType.title : 'Загрузка...'}
            <span className="material-icons font-light w-fit ml-4 mr-2">groups</span>
            <span className="">{thisType ? thisType.guestCount : 'Загрузка...'}</span>
          </h1>
          <div className="flex items-center">
            <div className="grow flex flex-col">
              <span className="grow">пн-пт: {thisType ? prettyCost(thisType.weekdayCost) : 'Загрузка...'} ₽/день</span>
              <span className="grow">сб-вс: {thisType ? prettyCost(thisType.weekendCost) : 'Загрузка...'} ₽/день</span>
            </div>
          </div>
          <h2 className="w-full">{thisType ? thisType.description : 'Загрузка...'}</h2>
        </div>
      </div>
      <div className="w-full flex flex-col  gap-2 z-0">
        <div className="flex mx-2 gap-2 ">
          <input type="date" id="start" defaultValue={startDate} ref={startRef} min={toStringDate(new Date())} onChange={() => setStartDate(startRef.current.value)} className="date-input grow myblur" />
          <input type="date" id="finish" defaultValue={finishDate} min={nextStringDate(startDate, 1)} ref={finishRef} onChange={() => setGap(countGapValue(startDate, (finishRef.current.value)))} className="date-input grow myblur" />
        </div>
        <div className="flex mx-2 gap-2">
          <div className="rounded-lg font-medium p-2 flex grow myblur">
            <div className="text-center grow">Дней: </div><input className="w-16 bg-white/0 text-center" type="number" onChange={() => gapRef.current.value > 0 && setGap(gapRef.current.value)} ref={gapRef} defaultValue={gap} />
          </div>
          <div className="rounded-lg font-medium p-2 flex grow myblur">
            <div className="text-center grow">Стоимость: </div>
            <div className="w-20 text-center">{cost && prettyCost(cost)} ₽</div>
          </div>
        </div>
        <div className="flex mx-2 gap-2 mb-2">
          {!role ?
            <Link to='/profile' className="basic-btn bg-custom-sand grow shadow-custom-navy shadow-lg text-center">Войти в профиль</Link>
            :
            <>
              {(avaliableRooms.isSuccess && (avaliable.length > 0)) ?
                <button onClick={() => setModal(true)} className="basic-btn grow shadow-custom-navy shadow-lg">Забронировать</button>
                :
                <button className="basic-btn bg-custom-sand grow shadow-custom-navy shadow-lg" disabled>Свободных мест нет</button>}
            </>
          }
          {/* Пока грузится */}
          {(avaliableRooms.isSuccess && (avaliable.length > 0)) ?
            <select name="select" className="date-input w-20 myblur" ref={roomRef}>
              {avaliable.map(id => <option value={id} key={id}>{id}</option>)}
            </select>
            :
            <select name="select" className="date-input w-20" ref={roomRef} disabled>
              <option className="">-</option>
            </select>
          }

        </div>
      </div>
      {modal && <ModalRoomOrderPayment setModal={setModal} mutation={dookDays} query={avaliableRooms} cost={cost} />}
    </>
  );
}

export default SearchRoomOrder;
