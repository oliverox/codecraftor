import React from 'react';
import { H5 } from '@blueprintjs/core';

import styles from './Home.module.css';

const HomePanel = () => {
  return (
    <div>
      <H5>Welcome to Codecraftor!</H5>
      <p className={styles.tabDescription}>
        What you see on the right is our first template which we named{' '}
        "<strong>Pioneer</strong>". It is obviously based off the Pioneer
        website and contains similar building blocks. Feel free to try out
        various blocks and customize them to your taste to get a completely 
        new site. Most importantly, have fun! <br />
        <br />
        PS: Codecraftor is still under active development. Apologies for any
        issues you may encounter.
      </p>
    </div>
  );
};

export default HomePanel;
