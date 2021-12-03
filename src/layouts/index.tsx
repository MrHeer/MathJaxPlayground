import styles from './index.css';
import { useIntl } from 'umi';
import { Typography, Layout } from 'antd';

const BasicLayout: React.FC = props => {
  const intl = useIntl();
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <Typography.Title className={styles.title}>
          {intl.formatMessage({ id: 'index.title' })}
        </Typography.Title>
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  );
};

export default BasicLayout;
