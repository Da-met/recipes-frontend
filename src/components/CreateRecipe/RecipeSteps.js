import React from 'react';
import axios from '../../axios';
import { useState } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import BtnAddImg2 from './BtnAddImg2';

// import './RecipeSteps.css';
import { v1 } from 'uuid';



const RecipeSteps = (props) => {
    const [inputSteps, setInputSteps] = useState(['']);
    const [photos, setPhoto] = useState(['']);

    const [steps, setSteps] = useState([{
        id: v1(),
    },]);

    React.useEffect(() => {
        if (props.idEdit) {
            axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
                 console.log(data)
                let editPhotos = []
                let editSteps = []

                if (data.steps.length !== 0 
                    // && data.steps[0].photo !== '' 
                    && data.steps[0].step !== '') {
                    data.steps.map((step) => {
                        editPhotos.push(step.photo)
                        editSteps.push(step.step)
                        setInputSteps(editSteps)
                        setPhoto(editPhotos)
                    })
                } else {
                    setInputSteps([''])
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])



    const addInputField = () => {
        // console.log('что-то тут происходит?????', [...inputSteps, ''])
        setInputSteps([...inputSteps, ''])
        setPhoto([...photos, ''])
        // console.log(inputSteps, photos)
    }

    const removeInputSteps = (index) => {
        // const rows = [...steps];
        // rows.splice(index, 1);
        // setSteps(rows);

        const rowImgs = [...photos];
        rowImgs.splice(index, 1);
        setPhoto(rowImgs);

        const rowSteps = [...inputSteps];
        rowSteps.splice(index, 1);
        setInputSteps(rowSteps);
    }
    
    const handleChange = (index, evnt)=> {
        const { value } = evnt.target;
        const list = [...inputSteps];
        list[index] = value;
        setInputSteps(list);
    }

    const saveImgStep = (img, index) => {
        console.log('в RecipeSteps (img, index)', img, index);
        

        if (photos[index] == undefined) {
            setPhoto(photos => [
            ...photos, img
        ])} else {
            const newPhotos = [...photos];
            newPhotos[index] = img;
            setPhoto(newPhotos)
        }
    };

    
    if (inputSteps.length > 0){
        let stepsArray = inputSteps.map(function(_, i) {
            return {
                photo: photos[i],
                step: inputSteps[i]
            };
        });
        // console.log('stepsArray', stepsArray)
        props.getSteps(stepsArray)
    }
    


    const { TextArea } = Input;

    return (
        <div className='create-recipe-steps'>
            <h2>Рецепт по шагам</h2>

            <form  className='steps-list'>
                {inputSteps.map((data, index) => {
                    return (
                        <div className="add-step" key={index}>
                            
                            <BtnAddImg2 
                                idEdit={props.idEdit}
                                onGetImg={saveImgStep}
                                newUrl={photos[index]}
                                ind={index}
                            />

                            <TextArea onChange={(evnt) =>
                                handleChange(index, evnt)}
                                value={inputSteps[index]} 
                                rows={5}
                                size="large" 
                            /> 
                                
                            {(inputSteps.length!==1) ? <Button type="dashed" className='btn-x' 
                            onClick={() => removeInputSteps(index)}>Х</Button> : ''}
                        </div>
                        )
                    })
                }
            </form>

            <Button className='btn-blue-add' type="primary" onClick={addInputField}>
                Добавить новый шаг
            </Button>
        </div>   
    )
    
}

export default RecipeSteps;