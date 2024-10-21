import React from 'react';
import { Skeleton } from 'antd';

export const SkeletonMyProfile = () => {
    
    return (
        <div className='skeleton_my-profile-row'>
            <div className='skeleton_my-profile'>
                <div className='skeleton_my-profile_avatar'></div>
                <Skeleton.Input size="large" />
            </div>
            <div className='skeleton_my-profile_btns'>
                <Skeleton.Input size="large" />
                <Skeleton.Button size="large" />
            </div>
        </div>
    );
}