import React from 'react';
import router from 'umi/router';
import { Button } from 'antd';

import styles from './index.less';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>

        MMG Electron Demo
      </div>
      {props.children}
    </div>
  );
};

export default BasicLayout;
