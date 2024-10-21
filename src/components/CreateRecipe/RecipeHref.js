import React from 'react';
import axios from '../../axios';
import { useState } from 'react';
import { Input } from 'antd';

const RecipeHref = (props) => {
    const [href, setHref] = useState('');

    React.useEffect(() => {
        if (props.idEdit) {
            axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
                setHref(data.href) 
            }).catch(err => {
                // console.log(err)
            })
        }
    }, [])

    props.getHref(href);

    return (
        <div className='create-recipe-href'>
            <h3>Ссылка на рецепт</h3>
            <Input 
                value={href}
                onChange={e => setHref(e.target.value)}
                placeholder="Вставьте ссылку на рецепт" 
            />
        </div>
    )

};


export default RecipeHref;