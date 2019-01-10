import React from 'react';
import { H5 } from '@blueprintjs/core';

import styles from './Home.module.css';

const HomePanel = () => {
  return (
    <div>
      <H5>Welcome to Codecraftor!</H5>
      <p className={styles.tabDescription}>
        You are welcome to play around. However, please note that Codecraftor 
        is a product still under active development. Apologies for any issues 
        you may encounter.
      </p>
    </div>
  );
};

export default HomePanel;
