import React from 'react'
import { Card, Elevation, Icon } from '@blueprintjs/core'
import generalComponentList from '../../../general'

import styles from '../SideBar.module.css'

const ComponentsPanel = ({title}) => {
  const onDragStart = e => {
    e.dataTransfer.setData('component', e.target.getAttribute('data-component'))
  }
  const gcl = Object.keys(generalComponentList)
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarTitleContainer}>
        <span>{title}</span>
      </div>
      <div className={styles.sidebarContentContainer}>
        {gcl.map((component, index) => {
          return (
            <Card
              key={index}
              data-component={component}
              interactive={true}
              elevation={Elevation.ONE}
              className={styles.sidebarItem}
              draggable={true}
              onDragStart={onDragStart}
            >
              <span className={styles.sidebarItemName}>
                <Icon
                  className={styles.sidebarItemIcon}
                  icon={generalComponentList[component].icon}
                />
                {generalComponentList[component].name}
              </span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ComponentsPanel
