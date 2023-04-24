import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Header
          style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
        >
          <div className="logo">🦕 Dinoblog</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={[
              {
                key: 'home',
                label: 'Home',
              },
            ]}
          />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
            }}
          >
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Dinoblog ©2023 Created by{' '}
          <a href="https://github.com/edgarcrssn" target="_blank">
            @edgarcrssn
          </a>
        </Footer>
      </Layout>
    </>
  );
}
