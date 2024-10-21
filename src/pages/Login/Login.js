import React from 'react';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from "react-hook-form";

import './Login.css';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';



export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors, isValid }, 
      } = useForm({
        defaultValues: {
          email: '',
          password: '',
        },
        mode: 'onChange',
      });

      const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
          return alert('Не удалось авторизоваться! :(')
        }
    
        if ('token' in data.payload) {
          window.localStorage.setItem('token', data.payload.token)
        } 
      };

    if (isAuth) {
        return <Navigate to="/"></Navigate>
    }

  
    return (
        <div className="login-card">
            <h3>Вход в аккаунт</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">

                <input 
                    className='input-login'
                    placeholder="E-Mail" 
                    name="email"
                    label="E-Mail"
                    type="email"
                    size="large"
                    {...register('email')}

                />
                <input 
                    className='input-login'
                    placeholder="Пароль" 
                    name="password"
                    label="Пароль" 
                    type="password"
                    size="large"
                    {...register('password')}
                />
                <div>
                  <button  
                    // disabled={isValid}
                    type="submit" 
                    className='login-btn'>
                      Войти
                  </button>

                </div>
                
            </form>
        </div>
    );
}