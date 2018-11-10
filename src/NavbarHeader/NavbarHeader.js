import React from 'react';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
  Classes
} from '@blueprintjs/core';

import './NavbarHeader.scss';

class NavbarHeader extends React.Component {
  render() {
    return (
      <header className="app-header">
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading className="navbar-heading">
              Codecraftor
            </NavbarHeading>
            <NavbarDivider />
            <Button
              onClick={this.props.handleAddComponentBtnClick}
              className={Classes.MINIMAL}
              icon="add"
              text="Add Component"
            />
            <Button
              disabled
              className={Classes.MINIMAL}
              icon="download"
              text="Download"
            />
            <Button
              disabled
              className={Classes.MINIMAL}
              icon="upload"
              text="Deploy"
            />
          </NavbarGroup>
        </Navbar>
      </header>
    );
  }
}

export default NavbarHeader;
