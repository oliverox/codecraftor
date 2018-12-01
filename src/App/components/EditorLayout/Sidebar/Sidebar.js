import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import { HomePanel, PagesPanel, ThemesPanel, ComponentsPanel } from './Panels';

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
            title=""
            panel={<HomePanel sendPageMetaToFrame={sendPageMetaToFrame} />}
          />
          <Tab id="pages" title="" panel={<PagesPanel />} />
          <Tab id="components" title="" panel={<ComponentsPanel />} />
          <Tab id="themes" title="" panel={<ThemesPanel />} />
        </Tabs>
      </div>
    );
  }
}

export default SideBar;
