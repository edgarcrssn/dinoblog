import { useLoggedUser } from '@/contexts/LoggedUserContext';
import { LoginDto } from '@/pages/api/auth/login';
import { authenticationServices } from '@/services/authenticationServices';
import { manageToken } from '@/utils/manageToken';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setIsModalOpen }: Props) => {
  const { setLoggedUser } = useLoggedUser();

  const [isLoading, setIsLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const login = (fields: LoginDto) => {
    setIsLoading(true);
    authenticationServices
      .login(fields)
      .then((response) => {
        if (response.ok) return response.json();
        if (response.status === 401) {
          messageApi.open({
            type: 'error',
            content: 'Wrong credentials.',
          });
          throw new Error('Wrong credentials.');
        }
      })
      .then((data) => {
        manageToken.set(data.token);
        messageApi.open({
          type: 'success',
          content: `Hello ${fields.username}!`,
        });
        setLoggedUser(data.user);
        setIsModalOpen(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {contextHolder}
      <Form
        disabled={isLoading}
        layout="vertical"
        onFinish={(fields: LoginDto) => login(fields)}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username.' }]}
        >
          <Input placeholder="your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password.' }]}
        >
          <Input type="password" placeholder="your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
