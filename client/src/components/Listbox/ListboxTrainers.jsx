import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';


export default function ListboxTrainers({ freeTrainers }) {

  const [selected, setSelected] = useState(freeTrainers[0]);

  return (
    <div className="grow">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative ">

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bottom-10 bg-white/60 w-full py-1 mt-1 overflow-auto rounded-lg max-h-60">
              {freeTrainers.map((trainer) => (
                <Listbox.Option
                  key={trainer['Trainer.id']}
                  className='p-2' value={trainer} >
                  <>
                    <span
                      className='block truncate'>
                      {`${trainer['Trainer.name']} ${trainer['Trainer.surname']}`}
                    </span>
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          <Listbox.Button className="relative p-2 rounded-lg w-full text-left bg-white/60">
            <span className="">{`${selected['Trainer.name']} ${selected['Trainer.surname']}`}</span>
          </Listbox.Button>
        </div>
      </Listbox>
    </div >
  )
}
