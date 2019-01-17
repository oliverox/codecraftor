import React from 'react';
import { Button, Card, Divider } from '@blueprintjs/core';

import styles from './Pages.module.css';

const PagesPanel = ({
  siteMeta,
  handleRemovePage,
  handleNewPage,
  currentPageIndex,
  updateCurrentPageIndex
}) => {
  if (!siteMeta) {
    return <div />;
  }
  const { pages } = siteMeta;
  let cn;
  return (
    <div className={styles.pageOutlineContainer}>
      <div className={styles.pageActions}>
        <Button minimal icon="document" onClick={handleNewPage}>
          New page
        </Button>
        <Button minimal icon="trash" onClick={handleRemovePage}>
          Remove page
        </Button>
      </div>
      <Divider className={styles.divider} />
      {pages.map((page, key) => {
        cn = styles.pageOutline;
        cn += currentPageIndex === key ? ` ${styles.selected}` : '';
        return (
          <Card
            key={`page-${key}`}
            interactive={true}
            className={cn}
            onClick={() => updateCurrentPageIndex(key)}
          >
            <div className={styles.cardContent}>{page.pageTitle}</div>
          </Card>
        );
      })}
    </div>
  );
};

export default PagesPanel;
