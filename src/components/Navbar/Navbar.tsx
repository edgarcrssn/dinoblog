import { capitalize } from '@/utils/capitalize';
import { DisconnectOutlined } from '@ant-design/icons';
import { Button, Layout, Modal, Tooltip } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useLoggedUser } from '@/contexts/LoggedUserContext';
import LoginForm from '../LoginForm/LoginForm';
import { authenticationServices } from '@/services/authenticationServices';
import { manageToken } from '@/utils/manageToken';
import styles from './Navbar.module.scss';

const { Header } = Layout;

const Navbar = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'register' | 'login'>(
    'register'
  );

  const openRegisterModal = () => {
    setModalContent('register');
    setIsModalOpen(true);
  };
  const openSignInModal = () => {
    setModalContent('login');
    setIsModalOpen(true);
  };

  useEffect(() => {
    const token = manageToken.get();

    if (!token) {
      manageToken.remove();
      setLoggedUser(null);
      return;
    }

    authenticationServices
      .verifyToken(token)
      .then((response) => {
        if (response.ok) return response.json();
        else {
          manageToken.remove();
          setLoggedUser(null);
        }
      })
      .then((decoded) => {
        if (decoded.username)
          setLoggedUser({ username: decoded.username, role: decoded.role });
        else manageToken.remove();
      })
      .catch((error) => {
        manageToken.remove();
        console.error(error);
      });
  }, [setLoggedUser]);

  const disconnect = () => {
    manageToken.remove();
    setLoggedUser(null);
  };

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <nav className={styles.navbar}>
        <Link className={styles.logo} href="/">
          🦕 Dinoblog 🦖
        </Link>
        {loggedUser ? (
          <span className={styles.connectedMessage}>
            Bonjour {loggedUser.username ? loggedUser.username : 'visiteur'} !
            <Tooltip title="Disconnect" placement="bottom">
              <button onClick={disconnect}>
                <DisconnectOutlined />
              </button>
            </Tooltip>
          </span>
        ) : (
          <div className={styles.buttons}>
            <Button type="primary" onClick={openRegisterModal}>
              Register
            </Button>
            <Button onClick={openSignInModal}>Login</Button>
            <Modal
              title={capitalize(modalContent)}
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              {modalContent === 'register' ? (
                <RegisterForm setIsModalOpen={setIsModalOpen} />
              ) : (
                <LoginForm setIsModalOpen={setIsModalOpen} />
              )}
            </Modal>
          </div>
        )}
      </nav>
    </Header>
  );
};

export default Navbar;
