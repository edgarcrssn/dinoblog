import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout, theme } from 'antd';
import Link from 'next/link';

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
          <Link className="logo" href="/">
            🦕 Dinoblog 🦖
          </Link>
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
