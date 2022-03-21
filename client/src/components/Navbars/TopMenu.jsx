import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function TopMenu() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { isLoading, isSuccess, data } = useQuery('weatherQuery', () => axios('/data/2.5/weather?lat=60.521970&lon=29.764107&appid=f42b2f779a9734d9aa2d43a8aef21bf8'));

  let temperature
  if (isSuccess) {
    const number = Math.round(data.data.main.temp - 273)
    temperature = (number > 0) ? `+${number}°C` : `${number} °C`
    if (number === 0) temperature = '0 °C'
  }

  return (
    <>
      <nav className="absolute right-2 top-2 myblur h-16 flex items-center p-4 z-10">
        <div className="">
          {temperature && `${temperature}`}
        </div>
        <button onClick={toggle} type="button" className="ml-2" aria-controls="mobile-menu-2" aria-expanded="false">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
      </nav>
      {isOpen &&
        <section className="absolute top-0 left-0 w-full h-full flex backdrop-blur-md z-10">
          <div onClick={() => toggle()} className="flex w-1/4 justify-center pt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <aside className="w-3/4 h-full p-6 text-custom-navy  bg-white/70 flex items-center" >
            <ul className="flex flex-col gap-6">
              <li>
                <Link to="/map" onClick={() => toggle()} className="nav-link">Карта склонов</Link>
              </li>
              <li>
                <Link to="/" onClick={() => toggle()} className="nav-link">Корпоративный отдых</Link>
              </li>
              <li>
                <Link to="/" onClick={() => toggle()} className="nav-link">Рестораны</Link>
              </li>
            </ul>
          </aside>
        </section>
      }
    </>
  );
}

export default TopMenu;
