import { useState, useEffect } from 'react';

export const useWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const changeWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    }
  }, []);

  return width;
};