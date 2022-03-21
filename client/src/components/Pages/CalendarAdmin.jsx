import React, { useRef, useState, useLayoutEffect } from 'react';
import { Tab } from '@headlessui/react';

import AdminTimetable from '../Elements/AdminTimetable';

import { nextStringDate } from '../../helpers/nextStringDate';
import { toStringDate } from '../../helpers/toStringDate';
import { countGapValue } from '../../helpers/countGapValue';

function CalendarAdmin(props) {

  const startRef = useRef();
  const finishRef = useRef();
  const arrayDate = useRef();

  const [type, setType] = useState(0);
  const [grade, setGrade] = useState(0);

  const [startDate, setStartDate] = useState(toStringDate(new Date()));
  //TODO: сохранить GAP  в locals.storage
  const [gap, setGap] = useState(7);

  arrayDate.current = [];
  for (let i = 0; i < gap; i += 1) {
    arrayDate.current.push(nextStringDate(startDate, i));
  }

  // TODO: возможно стоит заменить не переменную
  const [finishDate, setFinishDate] = useState(nextStringDate(startDate, gap));

  useLayoutEffect(() => {
    setFinishDate(nextStringDate(startDate, gap))
    finishRef.current.value = nextStringDate(startDate, gap)
  }, [startDate, gap]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <AdminTimetable dates={arrayDate.current} gap={gap} type={type} grade={grade} />
      <div className="self-stretch myblur mx-2 mb-2 rounded-lg bg-white/60">
        {type !== 2 &&
          <Tab.Group onChange={setGrade} defaultIndex={grade}>
            <Tab.List className="flex gap-2 p-[3px]  mb-0">
              <Tab className={({ selected }) =>
                classNames(
                  'slider-tab',
                  selected
                    ? 'slider-active'
                    : 'slider-passive'
                )
              } >Стандарт
              </Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'slider-tab',
                  selected
                    ? 'slider-active'
                    : 'slider-passive'
                )
              }>Комфорт</Tab>
            </Tab.List>
          </Tab.Group>
        }
        <Tab.Group onChange={setType} defaultIndex={type}>
          <Tab.List className="flex gap-2 p-[3px]  mt-0">
            <Tab className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            } >Номера
            </Tab>
            <Tab className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            }>Коттеджи</Tab>
            <Tab className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            }>Гостиницa</Tab>
          </Tab.List>
        </Tab.Group>
      </div>

      <div className="flex self-stretch mx-2 gap-2 mb-2">
        <input type="date" id="start" defaultValue={startDate} ref={startRef} min={toStringDate(new Date())} onChange={() => setStartDate(startRef.current.value)} className="date-input grow myblur" />
        <input type="date" id="finish" defaultValue={finishDate} min={nextStringDate(startDate, 1)} ref={finishRef} onChange={() => setGap(countGapValue(startDate, (finishRef.current.value)))} className="date-input grow myblur" />
      </div>

    </>
  );
}

export default CalendarAdmin;
