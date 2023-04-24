import React, { PropsWithChildren } from 'react';
import styles from './Grid.module.scss';

const Grid = ({ children }: PropsWithChildren) => {
  return <ul className={styles.grid}>{children}</ul>;
};

export default Grid;
