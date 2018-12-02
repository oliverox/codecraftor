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
    const { selected, handleTabChange } = this.props;
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
              text="Components"
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
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="cloud-upload" />}
              text="Deploy"
            />
            <Button
              className={`${Classes.MINIMAL} ${styles.navbarButton}`}
              icon={<Icon style={{ color: '#fff' }} icon="download" />}
              text="Source Code"
            />
          </NavbarGroup>
        </Navbar>
      </header>
    );
  }
}

export default NavbarHeader;
