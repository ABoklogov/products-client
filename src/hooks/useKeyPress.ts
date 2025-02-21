import { useState, useEffect } from 'react';

type Key = {
  key: string;
};

export const useKeyPress = (keyTarget: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const downHandler = (({ key }: Key) => {
    // console.log("🚀 ~ downHandler ~ key:", key)
    if (key === keyTarget) setIsKeyPressed(true);
  });
  const upHandler = (({ key }: Key) => {
    if (key === keyTarget) setIsKeyPressed(false);
  });

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  }, []);

  return isKeyPressed;
};