import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

function Slider({ type }) {

  const infoQuery = useQuery(`room-${type}`, () => axios(`/api/types/${type}`));
  const [photos, setPhotos] = useState([]);

  let info;
  let relativePath;
  if (infoQuery.isSuccess) {
    info = infoQuery.data.data;
    relativePath = `/rooms/${info.images}`;
  }

  useEffect(() => {
    axios({
      url: '/api/photos/',
      method: 'GET',
      headers: {
        folder: relativePath,
      },
    })
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch(err => console.log(err));
  }, [relativePath]);

  return (
    <div className="flex rounded-lg myshadow h-96 w-full overflow-x-auto snap-x snap-mandatory before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw]">
      {
        photos.length ?
          photos.map(el => {
            return (
              relativePath
                ?
                <img key={el} alt="" className="shrink-0 snap-center h-full  w-full object-cover" src={`${relativePath}/${el}`} />
                : <img key={el} alt="" className="shrink-0 snap-center h-full  w-full object-cover" src="https://brilliant24.ru/files/cat/template_01.png" />)
          }
          )
          :
          <></>
      }
    </div>
  );
}

export default Slider;
