
import React from 'react';
import Skeleton from './Skeleton';

const CustomLoader = ({ size = 'md', color = 'accent', fullPage = false, type = 'spinner' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const colorClasses = {
    accent: 'border-accent border-t-transparent',
    lite: 'border-lite border-t-transparent',
    litest: 'border-litest border-t-transparent',
    dark: 'border-darker border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  const spinner = (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full border-4 animate-spin`} />
  );

  const skeletonLoader = (
    <div className="flex flex-col space-y-2">
      <Skeleton className={sizeClasses[size]} />
    </div>
  );

  const loader = type === 'spinner' ? spinner : skeletonLoader;

  if (fullPage) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-3">
          {loader}
          {type === 'spinner' && (
            <p className="text-litest font-medium animate-pulse">Loading...</p>
          )}
        </div>
      </div>
    );
  }

  return loader;
};

export default CustomLoader;
