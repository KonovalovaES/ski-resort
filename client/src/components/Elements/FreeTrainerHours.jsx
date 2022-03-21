import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Listbox, Transition } from '@headlessui/react';

import PeriodButton from './PeriodButton';
import UnauthorizedCard from '../Cards/UnauthorizedCard';

function FreeTrainerHours({ allTrainers, setHours, selectedTrainer, setSelectedTrainer }) {

  const [currentTrainers, setCurrentTrainer] = useState([]);
  const { role } = useSelector(state => state.userReducer);

  useEffect(() => { getTrainersName() }, []);

  const getTrainersName = (period) => {
    const uniqueNames = [];
    const uniqueTrainers = [];

    if (!period) {
      allTrainers.forEach(trainer => {
        if (!uniqueNames.includes(`${trainer.name} ${trainer.surname}`)) {
          uniqueNames.push(`${trainer.name} ${trainer.surname}`);
          uniqueTrainers.push({ ...trainer });
        }
      });
    } else {
      allTrainers
        .filter(trainer => trainer['Schedules.startTime'] === period)
        .forEach(trainer => {
          if (!uniqueNames.includes(`${trainer.name} ${trainer.surname}`)) {
            uniqueNames.push(`${trainer.name} ${trainer.surname}`);
            uniqueTrainers.push({ ...trainer });
          }
        });
    };
    setCurrentTrainer(uniqueTrainers)
  }

  if (!role) return (<UnauthorizedCard />)

  return (
    <div className="">
      {selectedTrainer.name &&
        (allTrainers
        .filter(el => el.id === selectedTrainer.id && !el['Schedules.userId'])
          .sort((a, b) => +a['Schedules.startTime'] - +b['Schedules.startTime'])
          .length > 0 ?
          <div className="w-full grid grid-cols-4 gap-2 p-2 myblur mb-2">
            {
              allTrainers
                .filter(el => el.id === selectedTrainer.id && !el['Schedules.userId'])
                .sort((a, b) => +a['Schedules.startTime'] - +b['Schedules.startTime'])
                .map(el => <PeriodButton key={`${el.id}${el['Schedules.startTime']}`} time={el['Schedules.startTime']} changeHours={setHours} getTrainersName={getTrainersName}></PeriodButton>)
            }

          </div>
          :
          <div className="myblur p-2 mb-2">Свободных часов нет</div>
        )
      }

      <Listbox defaultValue={selectedTrainer} onChange={setSelectedTrainer}>
        <div className="relative myblur">
          <Listbox.Button className="relative p-2 rounded-lg w-full text-left">
            <span className="block truncate">{`${selectedTrainer.name || 'Выберите инструктора:'} ${selectedTrainer.surname || ''}`}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bottom-10 w-full bg-white myshadow  overflow-auto rounded-lg max-h-60">
              {
                currentTrainers.length ?
                  currentTrainers.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `cursor-default select-none relative p-2`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {`${person.name} ${person.surname}`}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                  :
                  <Listbox.Option
                    key={null}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                      }`
                    }
                  >
                    Нет свободных инструкторов
                  </Listbox.Option>
              }
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default FreeTrainerHours;
