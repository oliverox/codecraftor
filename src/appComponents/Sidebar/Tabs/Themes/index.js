import React from 'react';
import { H6, Divider, HTMLSelect } from '@blueprintjs/core';
import { ChromePicker } from 'react-color';

import styles from './Themes.module.css';

const ThemesPanel = ({ theme }) => {
  return (
    <div>
      <H6>Color scheme</H6>
      <Divider />
      <div className={styles.colorContainer}>
        <span>Background</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.background
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Primary</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.primary
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Secondary</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.secondary
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Tertiary</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.tertiary
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Quaternary</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.quaternary
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Light font color</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.light
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Dark font color</span>
        <div
          className={styles.color}
          style={{
            backgroundColor: theme.colors.dark
          }}
        />
      </div>
      <div className={styles.colorContainer}>
        <span>Font</span>
        <HTMLSelect minimal>
          <option>Times New Roman</option>
          <option>Montserrat</option>
        </HTMLSelect>
      </div>
    </div>
  );
};

export default ThemesPanel;
