import s from './Container.module.css';
import React from 'react';

const Container = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;