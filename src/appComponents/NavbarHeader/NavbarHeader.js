import React from 'react';
import {
  Alignment,
  Navbar,
  Icon,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
  Classes
} from '@blueprintjs/core';

import styles from './NavbarHeader.module.css';
import logo from '../../images/logo.png';

class NavbarHeader extends React.Component {
  render() {
    const { selected, handleTabChange, download } = this.props;
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
              onClick={() => handleTabChange('home') }
            />
            <Button
              active={selected === 'pages'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="document" />}
              text="Pages"
              onClick={() => handleTabChange('pages') }
            />
            <Button
              active={selected === 'components'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="code-block" />}
              text="Component Library"
              onClick={() => handleTabChange('components') }
            />
            <Button
              active={selected === 'themes'}
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="style" />}
              text="Themes"
              onClick={() => handleTabChange('themes') }
            />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Button
              disabled
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="cloud-upload" />}
              text="Publish"
            />
            <Button
              disabled
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

export default NavbarHeader;
