import React from 'react';
import { Card, Divider, Elevation, Icon, H5 } from '@blueprintjs/core';

import styles from './Components.module.css';

const ComponentsPanel = ({ componentList = [], siteMeta }) => {
  const onDragStart = e => {
    e.dataTransfer.setData(
      'componentType',
      e.target.getAttribute('data-component')
    );
  };
  return (
    <div>
      <div className={styles.tabHeader}>
        <H5>Block Components</H5>
        <p className={styles.tabDescription}>
          The following block components are provided by your selected template.
          To add them to your canvas, simply drag and drop your desired
          component to the drop area on the right.
        </p>
        <Divider />
      </div>
      {componentList.map((component, key) => (
        <Card
          key={key}
          data-component={component.type}
          interactive={true}
          elevation={Elevation.ONE}
          className={styles.componentContainer}
          draggable={true}
          onDragStart={onDragStart}
        >
          <span className={styles.componentItem}>
            <Icon className={styles.componentItemIcon} icon={component.icon} />
            {component.name}
          </span>
          <p className={styles.componentDescription}>{component.desc}</p>
        </Card>
      ))}
    </div>
  );
};

export default ComponentsPanel;
