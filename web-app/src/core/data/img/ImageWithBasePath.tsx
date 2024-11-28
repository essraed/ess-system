import React from 'react';
import { IMAGE_SERVER_PATH, img_path } from '../../../environment';

type Props = {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
  lazyLoad?: boolean; 
  placeholder?: string; 
}

const ImageWithBasePath = ({
  className,
  src,
  alt = '',
  height,
  width,
  id,
  lazyLoad = true, 
  placeholder = '', 
}: Props) => {
  const fullSrc =
    src.startsWith('/') || src.startsWith('assets')
      ? `${img_path}${src}`
      : `${IMAGE_SERVER_PATH}/${src}`;

  return (
    <img
      className={className}
      src={fullSrc}
      height={height}
      alt={alt}
      width={width}
      id={id}
      loading={lazyLoad ? 'lazy' : 'eager'} // Leverage native lazy loading
      onError={(e) => {
        if (placeholder) e.currentTarget.src = placeholder; // Fallback to placeholder
      }}
    />
  );
};

export default ImageWithBasePath;
