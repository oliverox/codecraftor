import React from 'react';
import { Card, Elevation, Icon } from '@blueprintjs/core';

import styles from './Components.module.css';

const ComponentsPanel = ({ componentList = [] }) => {
  const onDragStart = e => {
    e.dataTransfer.setData(
      'componentType',
      e.target.getAttribute('data-component')
    );
  };
  return (
    <div>
      {componentList.map((component, key) => (
        <Card
          key={key}
          data-component={component.name}
          interactive={true}
          elevation={Elevation.ONE}
          className={styles.componentContainer}
          draggable={true}
          onDragStart={onDragStart}
        >
          <span className={styles.componentItem}>
            <Icon className={styles.componentItemIcon} icon={component.icon} />
            {component.display}
          </span>
        </Card>
      ))}
    </div>
  );
};

export default ComponentsPanel;
