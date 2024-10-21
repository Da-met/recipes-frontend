import React from 'react';
import axios from '../../axios';

import { useState } from 'react';
import { Input } from 'antd';


const RecipeTitul = (props) => {
    const [titul, setTitul] = useState('');

    React.useEffect(() => {
        if (props.idEdit) {
            axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
                setTitul(data.description) 
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    if (titul !== '') {
        props.setTitulError(false)
    } 
    props.getTitul(titul);


    return (
        <div className='create-recipe-titul'>
            <h2>Название блюда</h2>
            <Input 
                maxlength="35"
                value={titul}
                status={props.titulError ? "error" : "" }
                onChange={e => setTitul(e.target.value)} 
                size="large" 
                placeholder="Введите название блюда" 
            />

        </div>
    )
}

export default RecipeTitul;