import React, { useState, useRef, useCallback } from 'react';
import { Disclosure, Switch } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { updateUser } from '../../redux/sagaCreators/userSagaCreators';
import { updateAvatar, deleteUser } from '../../redux/actionCreators/userAC';

import { isValidPassword, isValidName, isValidEmail, isValidPhone, isValidAboutMe } from '../../helpers/isValid';

function EditTrainerProfile(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    name: nameCurrent,
    surname: surnameCurrent,
    aboutMe: aboutMeCurrent,
    email: emailCurrent,
    phone: phoneCurrent,
    ski: skiCurrent,
    snowboard: snowboardCurrent } = useSelector(state => state.userReducer);

  const [snowboard, setSnowboard] = useState(snowboardCurrent);
  const [ski, setSki] = useState(skiCurrent);

  const newPass = useRef();

  newPass.current = false;

  const { id, photo } = useSelector(state => state.userReducer);
  const [avatar, setAvatar] = useState();

  const name = useRef();
  const surname = useRef();
  const phone = useRef();
  const email = useRef();
  const aboutMe = useRef();
  const passwordOld = useRef();
  const password = useRef();
  const passwordRepeat = useRef();

  const newPhoto = useRef();
  const [areSamePasswords, setAreSamePasswords] = useState(false);
  const [isCorrectName, setIsCorrectName] = useState(true);
  const [isCorrectSurname, setIsCorrectSurname] = useState(true);
  const [isCorrectPhone, setIsCorrectPhone] = useState(true);
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [isCorrectAboutMe, setIsCorrectAboutMe] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [isCorrectPasswordOld, setIsCorrectPasswordOld] = useState(false);

  const checkName = () => setIsCorrectName(isValidName(name.current.value));
  const checkSurname = () => setIsCorrectSurname(isValidName(surname.current.value));
  const checkPhone = () => setIsCorrectPhone(isValidPhone(phone.current.value));
  const checkEmail = () => setIsCorrectEmail(isValidEmail(email.current.value));
  const checkAboutMe = () => setIsCorrectAboutMe(isValidAboutMe(aboutMe.current.value));
  const checkPasswordOld = () => setIsCorrectPasswordOld(isValidPassword(passwordOld.current.value));
  const checkPassword = () => setIsCorrectPassword(isValidPassword(password.current.value));
  const checkPasswords = () => (password.current.value && password.current.value === passwordRepeat.current.value)
    ? setAreSamePasswords(true)
    : setAreSamePasswords(false);

  const updatePhoto = useCallback(() => {
    const data = new FormData();
    data.append('photo', avatar);

    axios({
      url: `/api/trainers/${id}`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        setAvatar(res.data.photo);
        dispatch(updateAvatar(res.data.photo));
      });
  }, [avatar]);

  const applyChanges = (event) => {
    event.preventDefault();

    let data;
    if (!password.current) {
      if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && isCorrectAboutMe) {
        data = {
          name: name.current.value,
          surname: surname.current.value,
          phone: phone.current.value,
          email: email.current.value,
          aboutMe: aboutMe.current.value,
          snowboard,
          ski,
        };
      }
    }

    if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && isCorrectAboutMe && areSamePasswords && isCorrectPassword && isCorrectPasswordOld) {
      data = {
        name: name.current.value,
        surname: surname.current.value,
        phone: phone.current.value,
        email: email.current.value,
        aboutMe: aboutMe.current.value,
        snowboard,
        ski,
        passwordOld: passwordOld.current.value,
        password: password.current.value,
      };
    }

    if (newPhoto.current) {
      updatePhoto();
    }

    return dispatch(updateUser(data));
  }

  const logout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('auth_token');
    dispatch(deleteUser());
    return navigate('/');
  }

  return (
    <form className="flex justify-between flex-col mt-2 self-stretch rounded-lg overflow-y-auto">
      <div className="myblur rounded-lg mx-2 mb-2">
        <div className="my-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="name" className="basis-1/4 edit-label text-center">Имя</label>
            <input name="name" type="text" id="name" className={`myshadow basis-3/4 edit-input border-[1px] ${isCorrectName ? "border-white/0" : "border-red-600"}`} defaultValue={nameCurrent} ref={name} onChange={checkName} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 20 букв</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="surname" className="basis-1/4 edit-label text-center">Фамилия</label>
            <input name="surname" type="text" id="surname" className={`myshadow basis-3/4 edit-input border-[1px] ${isCorrectSurname ? "border-white/0" : "border-red-600"}`} defaultValue={surnameCurrent} ref={surname} onChange={checkSurname} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 20 букв</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="phone" className="basis-1/4 edit-label text-center">Телефон</label>
            <input name="phone" type="tel" id="phone" className={`myshadow basis-3/4 edit-input border-[1px] ${isCorrectPhone ? "border-white/0" : "border-red-600"}`} defaultValue={phoneCurrent} ref={phone} onChange={checkPhone} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>+79*********</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="email" className="basis-1/4 edit-label text-center">Email</label>
            <input name="email" type="email" id="email" className={`myshadow basis-3/4 edit-input border-[1px] ${isCorrectEmail ? "border-white/0" : "border-red-600"}`} defaultValue={emailCurrent} ref={email} onChange={checkEmail} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>***@***.**</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="skiPass" className="basis-1/4 edit-label text-center">О себе</label>
            <input name="skiPass" type="text" id="skiPass" className={`myshadow basis-3/4 edit-input border-[1px] ${isCorrectAboutMe ? "border-white/0" : "border-red-600"}`} defaultValue={aboutMeCurrent} ref={aboutMe} onChange={checkAboutMe} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 140 символов</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label className="edit-label basis-1/4 text-center">Сноуборд</label>
            <div className="basis-3/4">
              <Switch
                id="snowboard"
                name="snowboard"
                checked={snowboard}
                onChange={() => setSnowboard(!snowboard)}
                className={`${snowboard ? 'bg-custom-blue' : 'bg-custom-gray/70'}
          relative inline-flex flex-shrink-0 h-[24px] w-[48px] border-2 border-transparent rounded-lg cursor-pointer transition-colors ease-in-out duration-200`}
              >
                <span
                  aria-hidden="true"
                  className={`${snowboard ? 'translate-x-6' : 'translate-x-0'}
                pointer-events-none inline-block h-[20px] w-[20px] rounded-lg bg-white transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
            </div>
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label className="edit-label basis-1/4 text-center">Горные лыжи</label>
            <div className="basis-3/4">
              <Switch
                id="ski"
                name="ski"
                checked={ski}
                onChange={() => setSki(!ski)}
                className={`${ski ? 'bg-custom-blue' : 'bg-custom-gray/70'}
          relative inline-flex flex-shrink-0 h-[24px] w-[48px] border-2 border-transparent rounded-lg cursor-pointer transition-colors ease-in-out duration-200`}>
                <span
                  aria-hidden="true"
                  className={`${ski ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] rounded-lg bg-white transform ring-0 transition ease-in-out duration-200`} />
              </Switch>
            </div>
          </div>
        </div>
        <div className="mb-2 mx-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <div className="basis-1/4">
              <img className="w-24 h-24 border rounded-lg myshadow" src={`/photos/${photo}`}></img>
            </div>
            <div className="basis-3/4 flex flex-col justify-between ml-2">
              <input onChange={(event) => setAvatar(event.target.files[0])} name="filedata" ref={newPhoto} type="file" id="photo" className="myshadow rounded-lg block file-button text-sm"></input>
            </div>
          </div>
        </div>
      </div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Panel className="flex flex-col myblur rounded-lg mb-2 mx-2">
              <span className={`text-sm text-custom-navy m-2`}>*от 3 до 20 цифр и букв верхнего и нижнего регистра</span>
              <input autoComplete="" placeholder="Старый пароль" name="passwordOld" type="password" id="passwordOld" className={`myshadow edit-input placeholder:text-custom-gray text-custom-navy  mb-2 border-[1px] ${isCorrectPasswordOld ? "border-white/0" : "border-red-600"}`} ref={passwordOld} onChange={checkPasswordOld} />
              <input autoComplete="" placeholder="Новый пароль" name="password" type="password" id="password" className={`myshadow edit-input placeholder:text-custom-gray text-custom-navy  mb-2 border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} ref={password} onChange={() => { checkPasswords(); checkPassword() }} />
              <input autoComplete="" placeholder="Повторите новый пароль" name="passwordRepeat" type="password" id="passwordRepeat" className={`myshadow edit-input placeholder:text-custom-gray text-custom-navy mb-2 border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} ref={passwordRepeat} onChange={checkPasswords} />
            </Disclosure.Panel>
            <Disclosure.Button className="flex justify-center mx-2 mb-2 myshadow p-2 text-base font-medium text-white bg-custom-blue rounded-lg">
              <span>Изменить пароль </span>
              <ChevronUpIcon className={`${open && 'transform rotate-180'} w-6 h-6 text-white`} />
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
      <button type="submit" onClick={applyChanges} className="p-2 mx-2 mb-2 myshadow text-white bg-custom-blue font-medium rounded-lg text-base  text-center">Сохранить</button>
      <button type="click" onClick={logout} className="p-2 mx-2 mb-2 myshadow text-white bg-custom-gray font-medium rounded-lg text-base  text-center">Выйти</button>
    </form>)
}

export default EditTrainerProfile;
