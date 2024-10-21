import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from "react-hook-form";
import axios from '../../axios';
import './Registration.css';
import RegisterAvatar2 from '../../components/RegisterAvatar/RegisterAvatar2';



export const Registration = () => {

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const [avatarUrl, setAvatarUrl] = useState('');

    const saveImg = (url) => {
        console.log(url)
        setAvatarUrl(url);
    };


    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors, isValid }, 
      } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            avatarUrl: '',
        },
        mode: 'onChange',
      });



    const onSubmit = async (values) => {
        const addAvatar = {...values, avatarUrl: avatarUrl }
        // const data = await dispatch(fetchRegister({...values, avatarUrl: avatarUrl }));
        const data = await dispatch(fetchRegister(addAvatar));

        //_______________________________
        axios.post(`/add-saved-recipes/${data.payload._id}`)
        axios.post(`/add-list-sbscr/${data.payload._id}`)
        //_______________________________

        if (!data.payload) {
            return alert('Не удалось зарегистрироваться! :(')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        } 
    };

    if (isAuth) {
        return <Navigate to="/"></Navigate>
    }
  
    return (
        <div className="register-card">
            <h3>Создание аккаунта</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">

                <RegisterAvatar2
                    onGetImg={saveImg}
                    {...register('avatarUrl')}
                />

                <input
                    className='input-login' 
                    placeholder="Имя" 
                    label="Имя"
                    type="fullName"
                    size="large"
                    {...register('fullName')}
                />
                <input 
                    className='input-login'
                    placeholder="E-Mail" 
                    label="E-Mail"
                    type="email"
                    size="large"
                    {...register('email')}
                />
                <input 
                    className='input-login'
                    placeholder="Пароль" 
                    label="Пароль" 
                    type="password"
                    size="large"
                    {...register('password')}
                />
                <button 
                    // disabled={!isValid}
                    type="submit" 
                    className='login-btn'>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
  };