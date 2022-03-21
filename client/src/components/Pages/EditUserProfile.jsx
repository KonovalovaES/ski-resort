import React, { useState, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateUser } from '../../redux/sagaCreators/userSagaCreators';
import { deleteUser } from '../../redux/actionCreators/userAC';

import { isValidPassword, isValidName, isValidEmail, isValidPhone, isValidSkiPass } from '../../helpers/isValid';

import UnauthorizedCard from '../Cards/UnauthorizedCard';

function EditUserProfile(props) {

  const { role } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef();
  const surname = useRef();
  const phone = useRef();
  const skiPass = useRef();
  const email = useRef();
  const passwordOld = useRef();
  const password = useRef();
  const passwordRepeat = useRef();

  const [areSamePasswords, setAreSamePasswords] = useState(false);
  const [isCorrectName, setIsCorrectName] = useState(true);
  const [isCorrectSurname, setIsCorrectSurname] = useState(true);
  const [isCorrectSkiPass, setIsCorrectSkiPass] = useState(true);
  const [isCorrectPhone, setIsCorrectPhone] = useState(true);
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [isCorrectPasswordOld, setIsCorrectPasswordOld] = useState(false);

  const checkName = () => setIsCorrectName(isValidName(name.current.value));
  const checkSurname = () => setIsCorrectSurname(isValidName(surname.current.value))
  const checkPhone = () => setIsCorrectPhone(isValidPhone(phone.current.value));
  const checkEmail = () => setIsCorrectEmail(isValidEmail(email.current.value));
  const checkPasswordOld = () => setIsCorrectPasswordOld(isValidPassword(passwordOld.current.value));
  const checkPassword = () => setIsCorrectPassword(isValidPassword(password.current.value));
  const checkSkiPass = () => setIsCorrectSkiPass(isValidSkiPass(skiPass.current.value));
  const checkPasswords = () => (password.current.value && password.current.value === passwordRepeat.current.value)
    ? setAreSamePasswords(true)
    : setAreSamePasswords(false);

  const {
    name: nameCurrent,
    surname: surnameCurrent,
    email: emailCurrent,
    phone: phoneCurrent,
    skiPass: skiPassCurrent,
  } = useSelector(state => state.userReducer);

  const applyChanges = (event) => {
    event.preventDefault();

    const data = {
      name: name.current.value,
      surname: surname.current.value,
      phone: phone.current.value,
      email: email.current.value,
      skiPass: (skiPass.current.value ? skiPass.current.value : null),
    };
    if (!password.current) {
      if (isCorrectName && isCorrectSurname && isCorrectPhone && isCorrectEmail && isCorrectSkiPass) {
        return dispatch(updateUser(data));
      }
    }

    if (isCorrectName && isCorrectSurname && isCorrectPhone && isCorrectEmail && isCorrectSkiPass && areSamePasswords && isCorrectPassword && isCorrectPasswordOld) {
      data.passwordOld = passwordOld.current.value;
      data.password = password.current.value;
      return dispatch(updateUser(data));
    };
  }

  const logout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('auth_token');
    dispatch(deleteUser());
    return navigate('/');
  }

  if (!role) return (<UnauthorizedCard />)

  return (
    <form className="flex justify-between w-full flex-col rounded-lg overflow-y-auto">
      <div className="myblur mx-2 rounded-lg my-2">
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="name" className="basis-1/4 edit-label text-center">Имя</label>
            <input name="name" type="text" id="name" className={`shadow-current-gray shadow-xl basis-3/4 edit-input border-[1px] mt-2 ${isCorrectName ? "border-white/0" : "border-red-600"}`} defaultValue={nameCurrent} ref={name} onChange={checkName} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 20 букв</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="surname" className="basis-1/4 edit-label text-center">Фамилия</label>
            <input name="surname" type="text" id="surname" className={`shadow-current-gray shadow-xl basis-3/4 edit-input border-[1px] ${isCorrectSurname ? "border-white/0" : "border-red-600"}`} defaultValue={surnameCurrent} ref={surname} onChange={checkSurname} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 20 букв</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="skiPass" className="basis-1/4 edit-label text-center">Ski-pass</label>
            <input name="skiPass" type="text" id="skiPass" className={`shadow-current-gray shadow-xl basis-3/4 edit-input border-[1px] ${isCorrectSkiPass ? "border-white/0" : "border-red-600"}`} defaultValue={skiPassCurrent} ref={skiPass} onChange={checkSkiPass} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>*5 цифр</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="phone" className="basis-1/4 edit-label text-center">Телефон</label>
            <input name="phone" type="tel" id="phone" className={`shadow-current-gray shadow-xl basis-3/4 edit-input border-[1px] ${isCorrectPhone ? "border-white/0" : "border-red-600"}`} defaultValue={phoneCurrent} ref={phone} onChange={checkPhone} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>+79*********</span>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-row justify-around justify-items-center items-center">
            <label htmlFor="email" className="basis-1/4 edit-label text-center">Email</label>
            <input name="email" type="email" id="email" className={`shadow-current-gray shadow-xl basis-3/4 edit-input border-[1px] ${isCorrectEmail ? "border-white/0" : "border-red-600"}`} defaultValue={emailCurrent} ref={email} onChange={checkEmail} />
          </div>
          <div className="flex flex-row justify-around justify-items-center items-center">
            <span className="basis-1/4"></span>
            <span className={`basis-3/4 block text-sm text-custom-gray`}>***@***.**</span>
          </div>
        </div>
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Panel className="flex flex-col myblur mx-2 mb-2">
              <span className={`text-sm text-custom-navy m-2`}>*от 3 до 20 цифр и букв верхнего и нижнего регистра</span>
              <input autoComplete="" placeholder="Старый пароль" name="passwordOld" type="password" id="passwordOld" className={` edit-input placeholder:text-custom-gray text-custom-navy  mb-2 border-[1px] ${isCorrectPasswordOld ? "border-white/0" : "border-red-600"}`} ref={passwordOld} onChange={checkPasswordOld} />
              <input autoComplete="" placeholder="Новый пароль" name="password" type="password" id="password" className={`  edit-input placeholder:text-custom-gray text-custom-navy  mb-2 border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} ref={password} onChange={() => { checkPasswords(); checkPassword() }} />
              <input autoComplete="" placeholder="Повторите новый пароль" name="passwordRepeat" type="password" id="passwordRepeat" className={`edit-input placeholder:text-custom-gray text-custom-navy mb-2 border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} ref={passwordRepeat} onChange={checkPasswords} />
            </Disclosure.Panel>
            <Disclosure.Button className="flex justify-center px-4 py-2 mx-2 mb-2 text-base font-medium text-white bg-custom-blue rounded-lg myshadow">
              <span>Изменить пароль </span>
              <ChevronUpIcon className={`${open && 'transform rotate-180'} w-6 h-6 text-white`} />
            </Disclosure.Button>

          </>
        )}
      </Disclosure>
      <button type="submit" onClick={applyChanges} className="px-4 py-2 mx-2 mb-2 text-white bg-custom-blue font-medium rounded-lg text-base text-center myshadow">Сохранить</button>
      <button type="click" onClick={logout} className="px-4 py-2 mx-2 mb-2 text-white bg-custom-gray font-medium rounded-lg text-base text-center myshadow">Выйти</button>
    </form>
  );
}

export default EditUserProfile;
