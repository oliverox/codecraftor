import React from 'react';
import { H5 } from '@blueprintjs/core';

import styles from './Home.module.css';

const HomePanel = () => {
  return (
    <div>
      <H5>Welcome to Codecraftor!</H5>
      <p className={styles.tabDescription}>
        What you see on the right is our first template named{' '}
        <strong>Pioneer</strong>. It is based inspired by the Pioneer website
        and contains similar building blocks. You can build a new website by
        reusing and customizing these building blocks. Feel free to try it out!
        <br />
        <br />
        PS: Codecraftor is still under active development. Apologies for any
        issues you may encounter.
      </p>
    </div>
  );
};

export default HomePanel;
