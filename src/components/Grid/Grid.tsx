import React, { PropsWithChildren } from 'react';
import styles from './Grid.module.scss';

interface Props {
  size?: 'narrow' | 'normal';
}

const Grid = ({ children, size = 'normal' }: PropsWithChildren<Props>) => {
  return (
    <ul className={`${styles.grid} ${size === 'narrow' ? styles.narrow : ''}`}>
      {children}
    </ul>
  );
};

export default Grid;
