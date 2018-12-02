import React from 'react';
import { Card, Elevation, Icon } from '@blueprintjs/core';
import componentList from '../../../../components';

import styles from './Components.module.css';

const ComponentsPanel = () => {
  const onDragStart = e => {
    console.log('onDragStart()');
    e.dataTransfer.setData('component', e.target.getAttribute('data-component'))
  }
  return (
    <div>
      {Object.values(componentList).map((component, key) => {
        return (
          <Card
            key={key}
            data-component={component}
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
          </Card>
        );
      })}
    </div>
  );
};

export default ComponentsPanel;
