import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchRemoveRecipes  } from '../../redux/slices/recipe';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Space } from 'antd';
import { INITIAL_recipes as recipes } from "../../App";
import DataAndActiveBtn from "../../components/DataAndActiveBtn/DataAndActiveBtn";
import axios from "../../axios";
import { Comments } from "../../components/Comments/Comments";
import { fetchComments } from "../../redux/slices/comment";
import './CardRecipe.css';
import './Media-CardRecipe.css';
import zaglyshka from '../../icons/zaglyshka12.png';




function CardRecipe () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.data);
    const allSavedRecipes = useSelector(state => state.saveRecipes);
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);


    const {id} = useParams();

    const deleteRecipe = (id) => {
        if (window.confirm('Вы дейтвительно хотите удалить статью?')) {
          dispatch(fetchRemoveRecipes(id))
        }

        if (window.location.href.includes(`/recipes/${id}`)) {
            navigate(`/`)
        }
        let isEdit = false
        // setRecipesList(recipesList.filter((it) => it._id !== id))
        // deleteListOfSavedRecipes(id, isEdit)
    };

    
    React.useEffect(() => {
        axios
            .get(`/recipes/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
                // console.log(res)
        }).catch(err => {
            console.warn(err)
            alert('Oшибка при получении статьи')
        })
    }, []);


    if (isLoading) {
        return <li />
    }


    


    return (
        <>
            <li>
                <div className="recipe">
                    <div className="recipe-data_active-btn">
                        <DataAndActiveBtn 
                            isSave={window.location.href.includes('my-saved-recipes') ? 
                            true : Boolean(allSavedRecipes.saveRecipes.items.find(item => item._id === id))}

                            user={data.user}
                            time={data.updatedAt}
                            isEditable={userData?._id === data.user._id}
                            id={data._id}
                            deleteRecipe={deleteRecipe}

                        />
                    </div>
                    <div className="recipe-top">
                        
                        <img src={data.img}
                            onError={(err) => {
                                err.currentTarget.src=`${zaglyshka}`;
                        }}/>
                        <div className='recipe-card_description'>
                            <h2>{data.description}</h2>

                            {data.products.map((product) => (
                            <div className='product'>{product}</div>
                            ))}


                            <div className='brief-center'>
                                {data.keyWords.map((word) => (
                                <div>{word}</div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    {(data.href!=='') 
                    ? <div className="btn-recipe-href">
                        <Button className="btn-recipe" type="primary" danger><a href={data.href}>Ссылка на рецепт</a></Button>
                        </div> : ''}
                                
                    
                    {( data.steps.length !== 0 ) ? <div className="steps">
                        {data.steps.map((step) => (
                            <div className="step">
                                <img src={step.photo}/>
                                <div className="step-text">{step.step}</div>
                            </div>
                        ))}
                    </div> : ''}
                </div>
            </li>
            <Comments idRecipe={id}/>
        </>
    )
}

export default CardRecipe;