import React from 'react';
import {
  Alignment,
  Navbar,
  Icon,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
  Classes,
  Popover,
  ProgressBar,
  InputGroup,
  Toaster,
  Intent
} from '@blueprintjs/core';

import styles from './NavbarHeader.module.css';
import logo from '../../images/logo.png';

class NavbarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    const { publishUrl } = this.props;
    window.open(publishUrl, '_blank');
  }

  render() {
    const {
      selected,
      handleTabChange,
      publish,
      download,
      publishUrl,
      publishState,
      publishInProgress,
      resetPublishError,
      isPublishPopoverOpen
    } = this.props;
    return (
      <header className="app-header">
        <Navbar
          style={{
            backgroundColor: '#364699'
          }}
        >
          <NavbarGroup>
            <NavbarHeading className={styles.navbarHeading}>
              <img
                style={{ paddingRight: 5 }}
                src={logo}
                alt="Craft your code visually"
                height={25}
              />
              <span>codecraftor</span>
            </NavbarHeading>
            <NavbarDivider />
            <Button
              active={selected === 'home'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="home" />}
              text="Home"
              onClick={() => handleTabChange('home')}
            />
            <Button
              active={selected === 'pages'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="document" />}
              text="Pages"
              onClick={() => handleTabChange('pages')}
            />
            <Button
              active={selected === 'components'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="code-block" />}
              text="Component Library"
              onClick={() => handleTabChange('components')}
            />
            <Button
              active={selected === 'theme'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="style" />}
              text="Theme"
              onClick={() => handleTabChange('theme')}
            />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Popover isOpen={isPublishPopoverOpen}>
              <Button
                className={`${Classes.MINIMAL} ${styles.navbarButton}`}
                icon={<Icon style={{ color: '#fff' }} icon="cloud-upload" />}
                onClick={publish}
                text="Publish"
              />
              <div className={styles.publishPopover}>
                {publishInProgress && (
                  <div className={styles.publishPopoverContentCol}>
                    <span className={styles.publishText}>
                      Publishing your website: {publishState}
                    </span>
                    <ProgressBar intent="none" />
                  </div>
                )}
                {publishState === 'ERROR' && (
                  <Toaster
                    action={{
                      onClick: () => resetPublishError(),
                      text: "Dismiss",
                    }}
                    intent={Intent.DANGER}
                    message="Sorry, an error was encountered while trying to publish you app."
                  />
                )}
                {!publishInProgress && !publishState !== 'ERROR' && (
                  <div className={styles.publishPopoverContentRow}>
                    <InputGroup readOnly value={publishUrl} />
                    <Button
                      onClick={this.openWindow}
                      icon="arrow-right"
                      intent="success"
                      text="Open"
                    />
                  </div>
                )}
              </div>
            </Popover>
            <Button
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="download" />}
              onClick={download}
              text="Download"
            />
          </NavbarGroup>
        </Navbar>
      </header>
    );
  }
}

NavbarHeader.defaultProps = {
  publishInProgress: false,
  isPublishPopoverOpen: false
};

export default NavbarHeader;
