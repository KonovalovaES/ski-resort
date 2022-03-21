import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/sagaCreators/userSagaCreators';
import { isValidPassword, isValidEmail } from '../../helpers/isValid';


function AdminLogin(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  const [isCorrectEmail, setIsCorrectEmail] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  const login = (event) => {
    event.preventDefault();

    if (isCorrectEmail && isCorrectPassword) {
      const data = {
        role: 'admin',
        email: email.current.value,
        password: password.current.value
      };

      return dispatch(loginUser(data, navigate));
    }
  }

  const checkEmail = () => setIsCorrectEmail(isValidEmail(email.current.value));
  const checkPassword = () => setIsCorrectPassword(isValidPassword(password.current.value));

  return (
    <form onSubmit={login} className="flex justify-between self-stretch mx-2 flex-col rounded-lg mb-2 mt-8 overflow-y-auto backdrop-blur-sm bg-white/60">
      <div className="my-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="email" className="basis-2/6 edit-label text-center">Email</label>
          <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="basis-4/6 edit-input border-[1px] border-white/0" required />
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="password" className="basis-2/6 edit-label text-center">Пароль</label>
          <input ref={password} onChange={checkPassword} name="password" type="password" id="password" className={`basis-4/6 edit-input border-[1px] border-white/0`} required />
        </div>
      </div>
      <button type="submit" className="p-2 mx-2 mb-2 text-white bg-custom-blue font-medium rounded-lg text-base myshadow text-center">Войти</button>
    </form>
  );
}

export default AdminLogin;
