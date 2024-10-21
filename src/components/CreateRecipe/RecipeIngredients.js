import React from 'react';
import axios from '../../axios';

import { useState } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';

import './RecipeIngredients.css';


const RecipeIngredients = (props) => {
    const [inputFields, setInputFields] = useState(['']);

    if( props.idEdit !== '' ) { 
        props.getIngredients(inputFields);
    }
    
    const addInputField = () => {
        setInputFields([...inputFields, ''])
    }

    const removeInputFields = (index) =>{
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
        props.getIngredients(rows)
    }

    
    const handleChange = (index, evnt)=> {
        const { value } = evnt.target;
        const list = [...inputFields];
        list[index] = value;

        setInputFields(list);
        
        let products
        products = inputFields
        if (inputFields.join('').length !== 0) {
            props.setProductsError(false)
        }
        props.getIngredients(products);
        // console.log(list)
    }



    React.useEffect(() => {
        if (props.idEdit) {
            axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
                setInputFields(data.products) 
                
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    return (
        <div className='create-recipe-ingredients'>
            <h2>Ингредиенты</h2>

            <div className='recipe-ingredients-ul'>
                {inputFields.map((data, index)=>{
                    const {fullName} = data;
                    return(
                        <li className="recipe-ingredients-li" key={index}>
                            <Input onChange={(evnt) =>
                                handleChange(index, evnt)}
                                value={inputFields[index]} 
                                // status="error"
                                // className='error-img'
                                status={props.productsError ? "error" : "" }
                                size="large" 
                                placeholder="Введите ингредиент" /> 
                                

                            {(inputFields.length!==1) ? <Button type="dashed" className='btn-x' 
                            onClick={() => removeInputFields(index)}>Х</Button> : ''}
                        </li>
                        )
                    })
                }
            </div>

            <Button className='btn-blue-add' type="primary" onClick={addInputField}>
                Добавить новый ингредиент
            </Button>
        </div>   
    )
}

export default RecipeIngredients;