import React from 'react';
import { H5, Divider } from '@blueprintjs/core';
import getComponentFromComponentList from '../../../../utils/getComponentFromComponentList';
import getPropConfigElement from '../../../../utils/getPropConfigElement';

import styles from './Configurator.module.css';

const ConfiguratorTab = ({
  componentObj,
  componentList,
  updateComponentOnPage
}) => {
  if (!componentObj) {
    return <div />;
  }
  const { id, componentType, props = {} } = componentObj;
  const allProps = props;
  console.log(id, componentType, props);
  const component = getComponentFromComponentList(componentList, componentType);
  const onPropUpdate = ({ prop, value }) => {
    console.log(`updating prop "${prop}" to ${value}`);
    console.log(id, props);
    props[prop] = value;
    console.log('new props=', props);
    updateComponentOnPage({ id, props });
  };
  return (
    <div className={styles.tabHeader}>
      <H5>{component.name} <span className={styles.componentHeader}>section</span></H5>
      <p className={styles.tabDescription}>
        Tweak the following properties to customize this section.
      </p>
      <Divider />
      {component.config.map((propObj, key) =>
        getPropConfigElement(propObj, `${id}-${key}`, onPropUpdate, allProps)
      )}
    </div>
  );
};

export default ConfiguratorTab;
