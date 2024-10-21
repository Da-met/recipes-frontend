import React from 'react';
import { useState } from 'react';
import axios from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsAuth } from '../../redux/slices/auth';
import {  fetchAllSubscribers  } from '../../redux/slices/subscriptions';

// import { NavLink } from 'react-router-dom';
// import { fetchUserBlock } from '../../redux/slices/userBlock';
// import { fetchMyRecipes } from '../../redux/slices/recipe';
// import {useLocation} from 'react-router-dom'

import { SkeletonMyProfile } from '../MyProfile/SkeletonMyProfile';

import { Button } from 'antd';
import './UserBlock.css';
import './Media-UserBlock.css';
import MiniCardsList from '../../components/MiniCardsList/MiniCardsList';


function UserBlock () {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {id} = useParams();
    const userBlock = useSelector(state => state.userBlock);
    const userData = useSelector(state => state.auth.data);

    // dispatch(fetchAllSubscribers(userData._id))
    

    let subscrUsers = useSelector(state => state.subscriptions.subscriptions.items);

    const isUserLoading = userBlock.status === 'loading';
    const [isSubscriptionCompleted, setIsSubscriptionCompleted] = useState(false);
    

    const subscribeToUser = () => {
        setIsSubscriptionCompleted(true)
        let scription = {
            subscriptions: userBlock.data._id,
        }
        axios.patch(`/add-list-sbscr/${userData._id}`, scription)
    }

    const cancelYourSubscription = () => {
        setIsSubscriptionCompleted(false)
        let scription = {
            subscriptions: userBlock.data._id,
        }
        axios.patch(`/delete-list-sbscr/${userData._id}`, scription)
    }


    React.useEffect(() => {
        if (isUserLoading !== true) {
            let ans =  subscrUsers.find(it => 
                it._id == userBlock.data._id
            )
            if (ans !== undefined) {
                setIsSubscriptionCompleted(true)
            }
        } else {
            return
        }
    }, [isUserLoading]);

    

    return (
        <div >
            {(
                isUserLoading ? (<SkeletonMyProfile />) :
                (<div className='user-block-row'>
                    <div className='user-block'>
                        <div className='user-block_avatar'>
                            {userBlock.data.avatarUrl 
                                ? (<img src={userBlock.data.avatarUrl} 
                                    onError={(err) => {
                                        err.currentTarget.src="https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg";
                                    }}
                                ></img>)    
                                : (<img src='https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg'></img>)
                            }
                            {/* <img src={userBlock.data.avatarUrl}></img> */}
                        </div>
                        <div  className='user-block_info'>
                            <div>
                                <div className='user-block_name'>{userBlock.data.fullName}</div>
                                <div className='user-block_quote'>{userBlock.data.quote}</div>
                            </div>
                            <div className='user-block_subscr'>

                                {/* <div> 10 подписчиков </div> */}

                                { isAuth ? ( id == userData._id ? ('') : ((isSubscriptionCompleted ? 
                                    (<Button size="large" type="primary" onClick={cancelYourSubscription}>
                                        Вы подписаны</Button>) 
                                    : (<Button className='my-profile_edit' size="large" type="text" onClick={subscribeToUser}>
                                        Подписаться</Button>)
                                ))
                                    
                                )
                                 : ('') }
                            </div>
                        </div>
                        

                    </div>
                </div>)
            )}

            <div className='user-block_text'>Авторские материалы</div>
            {( isUserLoading  ? (<></>) : (<MiniCardsList userBlockId={userBlock.data._id} />))}
            
        </div>
    )
}
  
export default UserBlock;