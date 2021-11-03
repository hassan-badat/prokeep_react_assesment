import { useState } from 'react';
import './form.css';

import { message } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { login } from '../../../redux/login/LoginSlice';

import { BiLogIn } from 'react-icons/bi';

const Form = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.LoginReducer);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  /**
   * Handle form input
   */
  const _onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Form Validation
   */

  // Email
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const emailValid = formData.email.match(emailRegex);

  // Password
  const passwordValid = formData.password.length > 0;

  // Form
  const formValid = passwordValid && emailValid;

  /**
   * Clear Form
   */
  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  /**
   * Handle Submit
   */
  const _onSubmit = () => {
    if (formValid) {
      dispatch(login(formData));

      clearForm();
    } else {
      message.warn('Please enter valid credentials.', 3);
    }
  };

  return (
    <div className='login__form__root'>
      <div className='login__form__header'>
        <BiLogIn className='login__form__icon' />
        <h1>Login</h1>
      </div>
      <div className='login__form__input'>
        <p>Email</p>
        <input
          type='email'
          placeholder='example@gmail.com'
          name='email'
          value={formData.email}
          onChange={(e) => _onChange(e)}
        />
      </div>
      {!emailValid && !loginState.loading && (
        <p className='login__form__error__message'>
          Please enter a valid email.
        </p>
      )}
      <div className='login__form__input'>
        <p>Password</p>
        <input
          type='password'
          placeholder='Enter your password'
          name='password'
          value={formData.password}
          onChange={(e) => _onChange(e)}
        />
      </div>
      {!passwordValid && !loginState.loading && (
        <p className='login__form__error__message'>
          Password must be atleast one character long.
        </p>
      )}
      <button
        className='login__form__submit'
        onClick={_onSubmit}
        disabled={loginState.loading}
      >
        {loginState.loading ? <ClipLoader color='white' size={16} /> : 'Login'}
      </button>
    </div>
  );
};

export default Form;
