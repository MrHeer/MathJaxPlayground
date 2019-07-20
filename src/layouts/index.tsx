import React from 'react';
import styles from './index.css';
import { FormattedMessage } from 'umi/locale';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}><FormattedMessage id='index.title' /></h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
