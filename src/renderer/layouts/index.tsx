import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';

import styles from './index.less';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

class BasicLayout extends PureComponent {
  componentDidMount() {
    ipcRenderer.on('router-goforward', (event) => {
      router.go(1);
    });
    ipcRenderer.on('router-goback', (event) => {
      router.goBack();
    });
  }
  render() {
    return (
      <div className={styles.container}>
      <div className={styles.header}>
        MMG Electron Demo
      </div>
      {this.props.children}
    </div>
    )
  }
}

export default BasicLayout;
