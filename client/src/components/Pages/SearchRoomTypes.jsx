import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RoomTypeCard from '../Cards/RoomTypeCard';

function SearchRoomTypes(props) {

  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    axios({
      url: '/api/types',
      method: 'GET',
    })
      .then(res => {
        setAllTypes(res.data.types);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <ul className="w-full flex flex-col-reverse gap-2 mb-2">
      {allTypes.map(el => <RoomTypeCard key={`${el.id}-room`} type={el}></RoomTypeCard>)}
    </ul>
  );
}

export default SearchRoomTypes;
