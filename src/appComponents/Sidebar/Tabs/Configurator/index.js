import React from 'react';
import componentList from '../../../../components';

// import styles from './Configurator.module.css';

/* 

config = [{
    prop: 'active',
    name: 'Active',
    type: 'boolean',
    value: false,
  },
  {
    prop: 'intent',
    name: 'Intent',
    type: 'list',
    value: 'None',
    list: [{
      name: 'none',
      value: 'None'
    }, {
      name: 'primary',
      value: 'Primary'
    }, {
      name: 'success',
      value: 'Success'
    }]
  },
  {
    prop: 'collapseFrom',
    name: 'Collapse from',
    type: 'option',
    value: 'end',
    options: [{
      name: 'start',
      value: 'Start'
    }, {
      name: 'end',
      value: 'End'
    }]
  },
  {
    prop: 'width',
    name: 'Width',
    type: 'slider',
    value: 50,
    discrete: true,
    tmpl: '{{value}}%`',
    range: [0, 100]
  },
  {
    prop: 'title',
    name: 'Title',
    type: 'string',
    value: 'Boom Boom',
    placeholder: 'Type a title'
  },
  {
    prop: 'render',
    name: 'Render me on load?'
    type: 'yesno'
    value: true
  }
}]

*/
const ConfiguratorTab = ({ componentObj }) => {
  if (!componentObj) {
    return <div />;
  }
  const { id, componentType, props } = componentObj;
  const componentConfig = componentList[componentType].config;
  return (
    <div>
      {componentConfig &&
        componentConfig.map((propObj, key) => {
          const { prop, name, type } = propObj;
          console.log('prop, name, type:', id, componentType, prop, name, type);
          return <div key={key}>{name}</div>;
        })}
    </div>
  );
};

export default ConfiguratorTab;
