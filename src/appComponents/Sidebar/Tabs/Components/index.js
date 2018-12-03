import React from 'react';
import { Card, Elevation, Icon } from '@blueprintjs/core';
import componentList from '../../../../components';

import styles from './Components.module.css';

const ComponentsPanel = () => {
  const onDragStart = e => {
    e.dataTransfer.setData(
      'componentModule',
      e.target.getAttribute('data-componentmodule')
    );
  };
  return (
    <div>
      {Object.keys(componentList).map((component, key) => {
        const componentMeta = componentList[component];
        return (
          <Card
            key={key}
            data-componentmodule={component}
            interactive={true}
            elevation={Elevation.ONE}
            className={styles.componentContainer}
            draggable={true}
            onDragStart={onDragStart}
          >
            <span className={styles.componentItem}>
              <Icon
                className={styles.componentItemIcon}
                icon={componentMeta.icon}
              />
              {componentMeta.name}
            </span>
          </Card>
        );
      })}
    </div>
  );
};

export default ComponentsPanel;
