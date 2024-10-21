import React from 'react';
import { Skeleton } from 'antd';
// import '../MiniCardList/Media-MiniCardsList.css';
import '../MiniCardsList/Media-MiniCardsList.css';


export const SkeletonMiniCardsList = () => {
    
    return (
        <div>
            <div className='skeleton-shell' >
                <Skeleton.Input  />    
                <div className='skeleton_mini-card_logo'></div>
                <div className='skeleton_words'>
                    <Skeleton.Button  />
                    <Skeleton.Input  />
                </div>

                <div className='skeleton_bottom'>
                    <div className='skeleton_user'>
                        <Skeleton.Avatar />
                        <Skeleton.Input className='skeleton-user_name'/>
                    </div>

                    <div className='skeleton_button'>
                        <Skeleton.Avatar />
                        <Skeleton.Avatar />
                        <Skeleton.Avatar />
                    </div>
                </div>
            </div>
        </div>
    );
}