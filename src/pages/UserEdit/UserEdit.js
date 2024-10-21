import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';

import { useForm } from "react-hook-form";

// import './Login.css';
import { fetchAuthMe, fetchAuthEdit, selectIsAuth } from '../../redux/slices/auth';
import RegisterAvatar2 from '../../components/RegisterAvatar/RegisterAvatar2';



export const UserEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.data);

    const [name, setName] = useState('');
    // const [ dataUser, setDataUser] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const saveImg = (url) => {
        setAvatarUrl(url);
    };

    React.useEffect(() => {
        axios.get(`/auth/me`).then(({data}) => {
            // setDataUser(data) 
            setName(data.fullName) 
            // idUser = data._id

        }).catch(err => {
            console.log(err)
        })
    }, [])
    
    const getInputs = async (ev) => {
        ev.preventDefault();

        try {
            const userEdit = {
                fullName: name,
                avatarUrl: avatarUrl,
                // password: '',
            }

            await axios.patch(`/my-profile/edit/${userData._id}`, userEdit)
            const {data} = await axios.get(`/auth/me`)

            navigate(`/my-profile`)
        } catch (err) {
          console.warn(err)
          alert('Ошибка при обновлении!')
        }
    }





    return (
        <div className="login-card">
            <h3>Редактирование аккаунта</h3>

            <form 
                // onSubmit={handleSubmit(onSubmit)} 
                className="login-form"
            >
                <RegisterAvatar2
                    idEdit={true}
                    onGetImg={saveImg}
                />

                <input
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    className='input-login' 
                    placeholder="Имя" 
                    label="Имя"
                    type="fullName"
                    size="large"
                    maxlength="15"
                    // {...register('fullName')}
                />

                <button 
                    onClick={getInputs} 
                    // disabled={isValid}
                    type="submit" 
                    className='login-btn'>
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
}