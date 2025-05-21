declare module 'react-awesome-lightbox' {
  import * as React from 'react';

  interface Lightbox {
    image: string;
    title?: string;
    onClose: () => void;
  }

  const Lightbox: React.FC<Lightbox>;
  export default Lightbox;
}
