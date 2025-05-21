import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { AppRouter } from './AppRouter';

const { Content } = Layout;

interface AppProviderProps {
  children?: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = () => {
  return (
    <BrowserRouter basename="/calculator/">
      <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
        <Content style={{ padding: 0, width: '100%', margin: 0 }}>
          <Row justify="center" gutter={[0, 0]} style={{ margin: 0, width: '100%' }}>
            <Col xs={24} sm={24} md={22} lg={22} xl={22} style={{ padding: 0 }}>
              <AppRouter />
            </Col>
          </Row>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}; 