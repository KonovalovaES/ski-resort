import { Fragment, } from 'react';
import { Listbox, Transition } from '@headlessui/react';


export default function ListboxMonth({ setMonth, month, months }) {
  return (
    <div className="grow">

      <Listbox value={month} onChange={setMonth}>
        <div className="relative">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bottom-10 bg-white myshadow w-full py-1 mt-1 overflow-auto rounded-lg max-h-60">
              {months.map((month, ind) => (
                <Listbox.Option
                  key={ind}
                  className='p-2' value={month} >
                  <>
                    <span
                      className='block truncate'>
                      {month.name}
                    </span>
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          <Listbox.Button className="relative p-2 rounded-lg w-full text-left myblur">
            <span className="">{month.name}</span>
          </Listbox.Button>
        </div>
      </Listbox>
    </div >
  )
}
