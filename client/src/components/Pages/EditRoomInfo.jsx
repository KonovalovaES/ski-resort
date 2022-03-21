import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { deleteUser } from '../../redux/actionCreators/userAC';

function EditRoomInfo(props) {

  const titleRef = useRef();
  const weekdayCostRef = useRef();
  const weekendCostRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState([]);

  const { type } = useParams();

  const queryClient = useQueryClient();

  const infoQuery = useQuery(`room-${type}`, () => axios(`/api/types/${type}`))
  const save = useMutation(() => axios({
    url: `/api/types/edit/${type}`,
    method: 'PUT',
    data: {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      weekdayCost: weekdayCostRef.current.value,
      weekendCost: weekdayCostRef.current.value,
    }
  }), {
    onSuccess: () => queryClient.invalidateQueries(`room-${type}`),
    onError: (err) => {
      const { response } = err;
      switch (response.status) {
        case 403:
          window.alert('Доступ запрещен!');
          localStorage.removeItem('auth_token');
          dispatch(deleteUser());
          break;
        default:
          console.log(response.data);
          break;
      }
    }
  })

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

  const uploadImage = useCallback((event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);

    axios({
      url: `/api/photos/${type}`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        setPhotos(() => [...photos, res.data.image]);
      });
  }, [image]);

  const deleteImage = (image) => {
    axios({
      url: `/api/photos/${type}`,
      method: 'DELETE',
      data: {
        image,
      },
    })
      .then(res => {
        res.data.isDelete ? setPhotos(photos.filter(el => el !== image)) : console.log(res.data.error);
      });
  };

  return (
    <div className="myblur self-stretch mx-2 mb-2 overflow-y-auto">
      {
        info &&
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row mb-2 mt-2">
            <label htmlFor="name" className="basis-1/4 edit-label text-center">Заголовок</label>
            <input name="name" type="text" id="name" className="basis-3/4 edit-input text-sm" defaultValue={info.title} ref={titleRef} required />
          </div>
          <div className="w-full flex flex-row mb-2">
            <label htmlFor="description" className="basis-1/4 edit-label text-center">Описание</label>
            <textarea name="description" type="text" id="description" className="basis-3/4 edit-input text-sm h-24" defaultValue={info.description} ref={descriptionRef} required />
          </div>
          <div className="w-full flex flex-row mb-2">
            <label htmlFor="weekdayCost" className="basis-1/4 edit-label text-center">Будни</label>
            <input name="weekdayCost" type="number" id="weekdayCost" className="basis-3/4 edit-input text-sm" defaultValue={info.weekdayCost} ref={weekdayCostRef} required />
          </div>
          <div className="w-full flex flex-row mb-2">
            <label htmlFor="weekendCost" className="basis-1/4 edit-label text-center">Выходные</label>
            <input name="weekendCost" type="number" id="weekendCost" className="basis-3/4 edit-input text-sm" defaultValue={info.weekendCost} ref={weekendCostRef} required />
          </div>
          <div className="w-full flex flex-row ">
            <label htmlFor="photo" className="basis-1/4 edit-label text-center">Фото</label>
            <div className="basis-3/4 edit-input text-sm rounded-lg w-full flex flex-col">
              <div className="grid grid-cols-2 gap-2">
                {
                  photos.length ?
                    photos.map(el =>
                      <div key={el} className="relative flex flex-col">
                        {
                          relativePath
                            ? <img className="row m-0 p-0 w-auto h-[80px] rounded-lg object-cover" src={`${relativePath}/${el}`} />
                            : <img className="row m-0 p-0 w-auto h-[80px] rounded-lg object-cover" src="https://brilliant24.ru/files/cat/template_01.png" />
                        }
                        <button onClick={
                          (event) => {
                            event.preventDefault();
                            deleteImage(el);
                          }
                        } className="row m-0 p-0 absolute right-0 bottom-0 w-10 h-10 bg-custom-navy/60 rounded-lg">
                          <span className="material-icons text-xl text-white">
                            delete
                          </span>
                        </button>
                      </div>)
                    :
                    <></>
                }
              </div>
              <input onChange={(event) => setImage(event.target.files[0])} name="image" type="file" id="image" className="col file-button text-sm"></input>
              <button className="py-2  text-white bg-custom-blue font-medium rounded-lg w-full text-center" onClick={uploadImage}>Добавить</button>
            </div>
          </div>
          <button onClick={() => save.mutate()} className="p-2 m-2  myshadow text-white text-sm bg-custom-blue font-medium rounded-lg text-center">Сохранить изменения</button>
        </div>
      }
    </div>
  );
}

export default EditRoomInfo;
