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
      console.log('will now position iframe...');
      this.iframeContainerRef.current.classList.add(styles.iframePosition);
    }, 500);
  }

  render() {
    const { currentPageTitle } = this.props;
    return (
      <div className={styles.iframeContainer} ref={this.iframeContainerRef}>
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
          src="/editor"
          width="100%"
          height="100%"
          title="Codecraftor"
        />
      </div>
    );
  }
}

export default Iframe;
