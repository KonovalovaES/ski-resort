import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react';

import { trainerKey } from '../../helpers/trainerKey'
import { registrationUser } from '../../redux/sagaCreators/userSagaCreators';
import { isValidPassword, isValidName, isValidEmail, isValidPhone } from '../../helpers/isValid'


function Registration(props) {

  // индикатор поля ввода для инструктора
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef();
  const surname = useRef();
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const passwordRepeat = useRef();
  const secret = useRef();

  const [areSamePasswords, setAreSamePasswords] = useState(true);
  const [isCorrectName, setIsCorrectName] = useState(true);
  const [isCorrectSurname, setIsCorrectSurname] = useState(true);
  const [isCorrectPhone, setIsCorrectPhone] = useState(true);
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  const checkName = () => setIsCorrectName(isValidName(name.current.value));
  const checkSurname = () => setIsCorrectSurname(isValidName(surname.current.value));
  const checkPhone = () => setIsCorrectPhone(isValidPhone(phone.current.value));
  const checkEmail = () => setIsCorrectEmail(isValidEmail(email.current.value));
  const checkPassword = () => setIsCorrectPassword(isValidPassword(password.current.value));
  const checkPasswords = () => (password.current.value && password.current.value === passwordRepeat.current.value)
    ? setAreSamePasswords(true)
    : setAreSamePasswords(false);

  const registration = async (event) => {
    event.preventDefault();

    if (enabled) {
      if (secret.current.value !== trainerKey) return window.alert(`Некорректный ключ инструктора\nВведите верный, либо закройте поле ввода`);
    }

    if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && isCorrectPassword && areSamePasswords) {
      const data = {
        name: name.current.value,
        surname: surname.current.value,
        phone: phone.current.value,
        email: email.current.value,
        password: password.current.value,
        secret: secret.current ? secret.current.value : undefined,
      };
      return dispatch(registrationUser(data, navigate));
    }
  }

  return (
    <form onSubmit={registration} className="flex justify-between flex-col rounded-lg mx-2 mb-2 overflow-y-auto backdrop-blur-sm bg-white/60">
      <div className="my-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="name" className="basis-1/3 edit-label text-center">Имя</label>
          <input name="name" type="text" id="name" className={`basis-2/3 edit-input border-[1px] ${isCorrectName ? "border-white/0" : "border-red-600"}`} ref={name} onChange={checkName} required />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/3"></span>
          <span className={`basis-2/3 block text-sm text-custom-gray`}>*до 20 букв</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="surname" className="basis-1/3 edit-label text-center">Фамилия</label>
          <input name="surname" type="text" id="surname" className={`basis-2/3 edit-input border-[1px] ${isCorrectSurname ? "border-white/0" : "border-red-600"}`} ref={surname} onChange={checkSurname} required />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/3"></span>
          <span className={`basis-2/3 block text-sm text-custom-gray`}>*до 20 букв</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="phone" className="basis-1/3 edit-label text-center">Телефон</label>
          <input name="phone" type="tel" id="phone" className={`basis-2/3 edit-input border-[1px] ${isCorrectPhone ? "border-white/0" : "border-red-600"}`} ref={phone} onChange={checkPhone} required />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/3"></span>
          <span className={`basis-2/3 block text-sm text-custom-gray`}>+79*********</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="email" className="basis-1/3 edit-label text-center">Email</label>
          <input name="email" type="email" id="email" className={`basis-2/3 edit-input border-[1px] ${isCorrectEmail ? "border-white/0" : "border-red-600"}`} ref={email} onChange={checkEmail} required />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/3"></span>
          <span className={`basis-2/3 block text-sm text-custom-gray`}>***@***.**</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="password" className="basis-1/3 edit-label text-center">Пароль</label>
          <input name="password" ref={password} onChange={() => { checkPasswords(); checkPassword() }} type="password" id="password" className={`basis-2/3 edit-input border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} required />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/3"></span>
          <span className={`basis-2/3 block text-sm text-custom-gray`}>*от 3 до 20 цифр и букв верхнего и нижнего регистра</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="passwordRepeat" className="basis-1/3 edit-label text-center">Повторите пароль</label>
          <input name="passwordRepeat" ref={passwordRepeat} onChange={checkPasswords} type="password" id="passwordRepeat" className={`basis-2/3 edit-input border-[1px] ${areSamePasswords ? "border-white/0" : "border-red-600"}`} required />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/3"></span>
          <span className={`basis-2/3 block text-sm text-red-600 ${areSamePasswords ? "hidden" : "visible"}`}>Пароли не совпадают</span>
        </div>
      </div>
      <div className="flex flex-row justify-around justify-items-center items-center">
        <label className="edit-label basis-5/6 text-center">Зарегистрироваться как инструктор</label>
        <div className="basis-1/6">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-custom-blue' : 'bg-custom-gray/70'}
          relative inline-flex flex-shrink-0 h-[24px] w-[48px] border-2 border-transparent rounded-lg cursor-pointer transition-colors ease-in-out duration-200 outline-none`}>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] rounded-lg bg-white transform ring-0 transition ease-in-out duration-200`} />
          </Switch>
        </div>
      </div>
      {
        enabled
          ? <div className="mb-2 flex flex-col">
            <div className="flex flex-row justify-around justify-items-center items-center">
              <label htmlFor="secretKey" className="basis-1/3 edit-label text-center">Cекретное слово</label>
              <input name="secretKey" ref={secret} type="password" id="secretKey" className="basis-2/3 edit-input border-[1px]" />
            </div>
          </div>
          : <></>
      }
      <button type="submit" className="p-2 mx-2 mb-2 myshadow text-white bg-custom-blue font-medium rounded-lg text-base text-center">Зарегистрироваться</button>
    </form>
  );
}

export default Registration;
