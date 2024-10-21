import React from 'react';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useState } from 'react';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Comment } from "../Comment/Comment";

import { SkeletonComment } from '../Comment/SkeletonComment';
import { fetchComments } from '../../redux/slices/comment';
import { selectIsAuth } from '../../redux/slices/auth';
import './Comments.css';
import '../Comment/Media-Comment.css';




export const Comments = ({idRecipe}) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);


    const [commentText, setCommentText] = useState('');
    const {id} = useParams();
    const userData = useSelector(state => state.auth.data) ;
    const {comments} = useSelector(state => state.comments);
    const isCommentLoading = comments.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchComments(id))
    }, [])

    const [value, setValue] = useState("");
    const onInput = (e) => setValue(e.target.value);
    const onClear = () => {
        setValue("");
    };


    const sendComment = async () => {
        try {
            let comment = {
                idReciper: id,
                textComment: value,
            }
            // console.log(comment)
            await axios.post(`/comments`, comment)
            onClear()
            dispatch(fetchComments(id))

        } catch (err) {
            console.warn(err)
            alert('Ошибка при обновлении!')
        }
    }


  
    return (
        <div className='comments_wrapper'>
            {isAuth ? (
                <div className='my-comment_wrapper'>
                    <div className='my-comment'>
                        <div className='my-comment_avatar'>
                            {userData.avatarUrl 
                                ? (<img src={userData.avatarUrl} 
                                    onError={(err) => {
                                        err.currentTarget.src="https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg";
                                    }}
                                ></img>)    
                                : (<img src='https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg'></img>)
                            }
                            {/* <img src={userData.avatarUrl}></img> */}
                        </div>
                        <input
                            value={value}
                            className='input-comment' 
                            placeholder="Написать комментарий..." 
                            // onChange={e => setCommentText(e.target.value)} 
                            onInput={onInput}

                        />
                    </div>

                    <Button className='btn-send'  onClick={sendComment} shape="circle" icon={<RightOutlined />} />
                </div>
            ) : ('') }


            <div className='comments_all'>

                {(isCommentLoading ? [...Array(2)] : comments.items).map((obj) => 
                    isCommentLoading ? ( <SkeletonComment /> ) : ( 
                        <Comment 
                            idReciper={id}
                            idComment={obj._id}
                            textComment={obj.textComment}
                            user={obj.user}
                            isEditable={userData?._id === obj.user._id} 
                            createTime={obj.createdAt}
                        /> 
                    ),
                )}
            </div>

        </div>
    );
}