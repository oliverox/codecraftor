import React from 'react';

import styles from './Iframe.module.css';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.iframeContainerRef = React.createRef();
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    this.props.setIframeRef(this.iframeRef); // gives the iframe reference to the main frame
    setTimeout(() => {
      this.iframeContainerRef.current.classList.remove(styles.iframeOffset);
    }, 500);
  }

  render() {
    const { currentPageTitle } = this.props;
    return (
      <div
        className={`${styles.iframeContainer} ${styles.iframeOffset}`}
        ref={this.iframeContainerRef}
      >
        <div className={styles.iframeBrowserHeader}>
          <div className={styles.iframeBrowserButtonContainer}>
            <div className={styles.iframeBrowserButton} />
            <div className={styles.iframeBrowserButton} />
            <div className={styles.iframeBrowserButton} />
          </div>
          <div className={styles.iframePageTitle}>{currentPageTitle}</div>
        </div>
        <iframe
          ref={this.iframeRef}
          src="/editor?_frame=true"
          width="100%"
          height="100%"
          title="Codecraftor"
        />
      </div>
    );
  }
}

export default Iframe;
