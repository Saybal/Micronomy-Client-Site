import React from 'react';
import Lottie from "lottie-react";
import load_plane from "../../../../public/Loading.json";


const Loading = () => {
    return (
        <div className='absolute z-30  min-w-screen min-h-screen flex items-center flex-col justify-center px-4'>
            <Lottie
                className='w-40 sm:w-60 md:w-72 lg:w-80'
                animationData={load_plane}
                loop={true}
            />
    
        </div>
    );
};

export default Loading;