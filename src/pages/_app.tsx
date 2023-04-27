import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout, theme } from 'antd';
import { LoggedUserProvider } from '@/contexts/LoggedUserContext';
import Navbar from '@/components/Navbar/Navbar';

const { Content, Footer } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LoggedUserProvider>
      <Layout>
        <Navbar />
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <div
            style={{
              padding: '1.5rem',
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
    </LoggedUserProvider>
  );
}
