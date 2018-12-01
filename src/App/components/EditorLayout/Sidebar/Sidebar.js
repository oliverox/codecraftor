import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import { HomeTab, PagesTab, ThemesTab, ComponentsTab } from './Tabs';

import styles from './Sidebar.module.css';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange() {
    console.log('handleTabChange');
  }

  render() {
    const { currentTab = 'home', sendPageMetaToFrame } = this.props;
    return (
      <div className={styles.sidebarContainer}>
        <Tabs
          id="sidebarTabs"
          animate={false}
          onChange={this.handleTabChange}
          selectedTabId={currentTab}
        >
          <Tab
            id="home"
            panel={<HomeTab sendPageMetaToFrame={sendPageMetaToFrame} />}
          />
          <Tab id="pages" panel={<PagesTab />} />
          <Tab id="components" panel={<ComponentsTab />} />
          <Tab id="themes" panel={<ThemesTab />} />
        </Tabs>
      </div>
    );
  }
}

export default SideBar;
