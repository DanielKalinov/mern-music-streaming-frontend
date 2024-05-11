import React, { useState } from 'react';

const Image = ({
  src,
  width,
  height,
  fullWidth,
  noPlaceholder,
  classes,
}: {
  src: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  noPlaceholder?: boolean;
  classes?: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className={`relative overflow-hidden ${classes}`}>
        <img
          className={`${loaded ? 'opacity-1' : 'opacity-0'} ${
            fullWidth ? 'w-full' : ''
          } h-full object-cover transition-opacity duration-300 ease-in-out`}
          width={width ?? undefined}
          height={height ?? undefined}
          src={src}
          onLoad={() => setLoaded(true)}
          alt=''
        />

        {!noPlaceholder && (
          <div
            className={`absolute top-0 left-0 h-full w-full bg-white/10 ${
              !loaded && 'animate-pulse'
            } rounded-lg transition-opacity duration-300 ease-in-out ${
              loaded ? 'opacity-0' : 'opacity-1'
            }`}
          />
        )}
      </div>
    </>
  );
};

export default Image;
