import React from 'react';
import { Card } from '@blueprintjs/core';

import styles from './Pages.module.css';

const PagesPanel = ({ siteMeta, currentPage }) => {
  if (!siteMeta) {
    return <div />;
  }
  const pages = Object.keys(siteMeta.pages);
  let cn = styles.pageOutline;
  return (
    <div className={styles.pageOutlineContainer}>
      {pages.map((page, key) => {
        cn += (currentPage === page) ? ` ${styles.selected}` : ''; 
        return (
          <Card key={key} interactive={true} className={cn}>
            {siteMeta.pages[page].pageTitle}
          </Card>
        );
      })}
    </div>
  );
};

export default PagesPanel;
