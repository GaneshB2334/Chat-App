
import React from 'react';

const Skeleton = ({ className, width, height }) => {
  return (
    <div 
      className={`animate-pulse bg-lite/20 rounded-md ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '16px' 
      }}
    />
  );
};

export default Skeleton;
