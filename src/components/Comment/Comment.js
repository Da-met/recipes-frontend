import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { timeProcessing } from '../../functions/functions.js'

import { fetchComments, fetchRemoveComment } from '../../redux/slices/comment';
import './Comment.css'
import './Media-Comment.css'

export const Comment = (props) => {
    const dispatch = useDispatch();

    const onClickRemove = () => {
        if (window.confirm('Удалить комментарий ?')) {
          dispatch(fetchRemoveComment(props.idComment))
        }
        // navigate(`/`)
    };

     
    return (
        <div className=''>
            <div className='comment_wrapper'>
                <div className='comment'>
                    <div className='my-comment_avatar'>
                        {props.user.avatarUrl 
                            ? (<img src={props.user.avatarUrl} 
                                onError={(err) => {
                                    err.currentTarget.src="https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg";
                                }}
                            ></img>)    
                            : (<img src='https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg'></img>)
                        }
                        {/* <img src={props.user.avatarUrl}></img> */}
                    </div>
                    <div>
                        <div className='my-comment_name'>{props.user.fullName}</div>
                        <div className="my-comment_text">
                           {props.textComment}
                        </div>
                    </div>
                </div>

                {props.isEditable && (<Button onClick={onClickRemove} shape="circle" type="text" danger icon={<CloseOutlined />} />)}
            </div>  
            <div className='my-comment_time'>{timeProcessing(props.createTime)}</div>
        </div>
    );
}