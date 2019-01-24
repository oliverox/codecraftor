import React from 'react';
import styles from './PreviewWindow.module.css';

const PreviewWindow = () => {
  return (
    <div className={styles.previewWindowContainer}>
      <div id="preview" className={styles.previewWindowContent}></div>
    </div>
  )
}

export default PreviewWindow;