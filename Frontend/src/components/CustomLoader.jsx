
import React from 'react';

const CustomLoader = ({ size = 'md', color = 'accent', fullPage = false }) => {
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

  const loader = (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full border-4 animate-spin`} />
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-3">
          {loader}
          <p className="text-litest font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return loader;
};

export default CustomLoader;
