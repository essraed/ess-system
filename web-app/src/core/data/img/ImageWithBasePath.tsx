import React from 'react';
import { IMAGE_SERVER_PATH, img_path } from '../../../environment';

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?:string;
}

const ImageWithBasePath = (props: Image) => {
  // Combine the base path and the provided src to create the full image source URL
  const fullSrc = (props.src.startsWith('/') || props.src.startsWith('assets')) ? `${img_path}/${props.src}` : `${IMAGE_SERVER_PATH}/${props.src}`;
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageWithBasePath;
