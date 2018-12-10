import React from 'react';
import { H6, Divider } from '@blueprintjs/core';
import getPropConfigElement from '../../../../utils/getPropConfigElement';
import componentList from '../../../../components';

const ConfiguratorTab = ({ componentObj, index, updateComponentOnPage }) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> index:', index);
  if (!componentObj) {
    return <div />;
  }
  const { id, componentType, props = {} } = componentObj;
  const allProps = props;
  console.log(
    '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
    id,
    componentType,
    props
  );
  const componentConfig = componentList[componentType].config;
  const onPropUpdate = ({ prop, value }) => {
    console.log(`updating prop "${prop}" to ${value}`);
    console.log(id, props);
    props[prop] = value;
    console.log('new props=', props);
    updateComponentOnPage({ id, props });
  };
  return (
    <div>
      <H6>Component properties</H6>
      <Divider />
      {componentConfig &&
        componentConfig.map((propObj, key) => {
          return getPropConfigElement(
            propObj,
            `${id}-${key}`,
            onPropUpdate,
            allProps
          );
        })}
    </div>
  );
};

export default ConfiguratorTab;
