import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import {
  HomeTab,
  PagesTab,
  ThemesTab,
  ComponentsTab,
  ConfiguratorTab
} from './Tabs';

import styles from './Sidebar.module.css';

const getComponentObj = (siteMeta, page, componentId) => {
  const { nonRootComponents } = siteMeta.pages[page];
  let componentObj = false;
  for (let i = 0; i < nonRootComponents.length; i++) {
    if (nonRootComponents[i].id === componentId) {
      componentObj = nonRootComponents[i];
      break;
    }
  }
  return componentObj;
};

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange() {
    console.log('handleTabChange');
  }

  render() {
    const {
      currentTab = 'home',
      siteMeta,
      sendPageMetaToFrame,
      currentPage,
      currentComponentId
    } = this.props;
    let componentObj = false;
    if (siteMeta) {
      componentObj = getComponentObj(siteMeta, currentPage, currentComponentId);
    }
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
          <Tab
            id="pages"
            panel={<PagesTab siteMeta={siteMeta} currentPage={currentPage} />}
          />
          <Tab id="components" panel={<ComponentsTab />} />
          <Tab id="themes" panel={<ThemesTab />} />
          <Tab
            id="configurator"
            panel={<ConfiguratorTab componentObj={componentObj} />}
          />
        </Tabs>
      </div>
    );
  }
}

export default SideBar;
