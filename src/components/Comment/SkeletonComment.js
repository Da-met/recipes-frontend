import React from 'react';
import { Skeleton } from 'antd';



export const SkeletonComment = () => {
    
    return (
        <div className='comment_wrapper'>
            <div className='skeleton_button'>
                <Skeleton.Avatar />
                <Skeleton.Input />
            </div>

            <Skeleton.Avatar  />
        </div>
    );
}