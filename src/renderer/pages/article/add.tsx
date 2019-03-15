import React from 'react';
import styles from './add.less';

var a = '123';
export default function() {
  console.log('123');
  return (
    <div className={styles.container}>
      <div className={styles.title}>Title</div>
      <div>Conent</div>
      <div>footer</div>
    </div>
  );
}
