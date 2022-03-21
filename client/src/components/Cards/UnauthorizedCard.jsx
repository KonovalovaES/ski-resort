import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

import Login from '../Pages/Login';
import Registration from '../Pages/Registration';

function UnauthorizedCard(props) {
  return (
    <div className="flex flex-col self-stretch">
      <Disclosure >
        {({ open }) => (
          <>
            <Disclosure.Panel className="flex flex-col">
              <Login />
            </Disclosure.Panel>
            <Disclosure.Button className="flex justify-center p-2 mx-2 mb-2 myshadow text-base font-medium text-white bg-custom-gray rounded-lg">
              <span>Войти</span>
              <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-white`} />
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Panel className="flex flex-col">
              <Registration />
            </Disclosure.Panel>
            <Disclosure.Button className="flex justify-center p-2 mx-2 mb-2 myshadow text-base font-medium text-white bg-custom-gray rounded-lg">
              <span>Зарегистрироваться</span>
              <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-white`} />
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default UnauthorizedCard;
