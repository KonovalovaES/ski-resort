import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { prettyCost } from '../../helpers/pretty';

function RoomTypeCard({ type }) {

  const relativePath = `/rooms/${type.images}`;
  const [photos, setPhotos] = useState([]);

  const { role } = useSelector(state => state.userReducer);

  useEffect(() => {
    axios({
      url: '/api/photos/',
      method: 'GET',
      headers: {
        folder: relativePath,
      },
    })
      .then((res) => setPhotos(res.data.photos))
      .catch(err => console.log(err));
  }, []);

  return (
    <li className="relative">
      <Link to={`/search/${type.id}`} className="w-full">
        <div className="card gap-4">
          <div className="card-avatar">
            {
              photos[0]
                ? <img className="w-full h-full object-cover rounded-lg" src={`${relativePath}/${photos[0]}`}></img>
                : <img className="w-full h-full object-cover rounded-lg" src="https://brilliant24.ru/files/cat/template_01.png"></img>
            }
          </div>
          <div className="flex flex-col grow justify-around">
            <span className="card-name">{type.title}</span>
            <div className="flex gap-2 items-center">
              <span className="material-icons font-light w-fit ">groups</span>
              <span className="">{type.guestCount}</span>
            </div>
            <span className="">от {prettyCost(type.weekdayCost)}₽ / ночь</span>
          </div>
          {
            role === 'admin'
              ? <Link to={`/edit/${type.id}`} className="absolute h-10 w-10 right-3 bottom-3 z-40 flex justify-center">
                <span className="material-icons text-2xl text-custom-navy">edit</span>
              </Link>
              : <></>
          }
        </div>
      </Link>
    </li>
  );
}

export default RoomTypeCard;
