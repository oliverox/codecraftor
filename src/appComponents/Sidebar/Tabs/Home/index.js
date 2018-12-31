import React from 'react';
import { H5 } from '@blueprintjs/core';

const HomePanel = () => {
  return (
    <div>
      <H5>Welcome to Codecraftor!</H5>
      <p style={{ lineHeight: '23px' }}>
        You are welcome to play around. However, please note that Codecraftor 
        is a product still under active development. Apologies for any issues 
        you might encounter.
      </p>
    </div>
  );
};

export default HomePanel;
