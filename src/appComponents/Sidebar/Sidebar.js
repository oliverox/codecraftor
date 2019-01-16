import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import {
  HomeTab,
  PagesTab,
  ThemesTab,
  ComponentsTab,
  ConfiguratorTab
} from './Tabs';
import getComponentObj from '../../utils/getComponentObj';

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
    const {
      siteMeta,
      currentPage,
      updateTheme,
      currentComponentId,
      currentTab = 'home',
      sendPageMetaToFrame,
      updateComponentOnPage,
      componentList
    } = this.props;
    let componentObj = false;
    let index = -1;
    if (siteMeta) {
      const data = getComponentObj(siteMeta, currentPage, currentComponentId);
      componentObj = data.componentObj;
      index = data.index;
    }
    return (
      <div className={styles.sidebarContainer}>
        <Tabs
          id="sidebarTabs"
          animate={false}
          onChange={this.handleTabChange}
          selectedTabId={currentTab}
          renderActiveTabPanelOnly={true}
        >
          <Tab
            id="home"
            panel={<HomeTab sendPageMetaToFrame={sendPageMetaToFrame} />}
          />
          <Tab
            id="pages"
            panel={<PagesTab siteMeta={siteMeta} currentPage={currentPage} />}
          />
          <Tab
            id="components"
            panel={
              <ComponentsTab
                componentList={componentList}
                siteMeta={siteMeta}
              />
            }
          />
          <Tab
            id="theme"
            panel={
              <ThemesTab theme={siteMeta.theme} updateTheme={updateTheme} />
            }
          />
          <Tab
            id="configurator"
            panel={
              <ConfiguratorTab
                index={index}
                componentObj={componentObj}
                componentList={componentList}
                updateComponentOnPage={updateComponentOnPage}
              />
            }
          />
        </Tabs>
      </div>
    );
  }
}

export default SideBar;
