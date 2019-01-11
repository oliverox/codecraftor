import React from 'react';
import PropConfigString from './PropConfigString';
import PropConfigYesNo from './PropConfigYesNo';
import PropConfigList from './PropConfigList';
import PropConfigNumeric from './PropConfigNumeric';
import PropConfigSlider from './PropConfigSlider';
import PropConfigColor from './PropConfigColor';

import styles from './styles.module.css';

const getPropConfigElement = (propObj, onPropUpdate, allProps) => {
  const { type } = propObj;
  switch (type) {
    case 'string':
      return (
        <PropConfigString
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'yesno':
      return (
        <PropConfigYesNo
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'list':
      return (
        <PropConfigList
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'numeric':
      return (
        <PropConfigNumeric
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'slider':
      return (
        <PropConfigSlider
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'color':
      return (
        <PropConfigColor
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    default:
      break;
  }
};

export default getPropConfigElement;

/* 

config = [{
    prop: 'active',
    label: 'Active',
    type: 'boolean',
    value: false,
  },
  {
    prop: 'intent',
    label: 'Intent',
    type: 'list',
    value: 'none',
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
    label: 'Collapse from',
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
    label: 'Width',
    type: 'slider',
    value: 50,
    discrete: true,
    tmpl: '{{value}}%`',
    range: [0, 100]
  },
  {
    prop: 'title',
    label: 'Title',
    type: 'string',
    value: 'Boom Boom',
    placeholder: 'Type a title'
  },
  {
    prop: 'render',
    label: 'Render me on load?'
    type: 'yesno'
    value: true
  },
  {
    prop: '<some custom prop>',
    label: 'Button group',
    type: 'custom',
    value: <custom value>
  }
}]

*/
