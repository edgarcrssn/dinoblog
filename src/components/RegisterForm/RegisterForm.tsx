import { useLoggedUser } from '@/contexts/LoggedUserContext';
import { RegisterDto } from '@/pages/api/auth/register';
import { authenticationServices } from '@/services/authenticationServices';
import { manageToken } from '@/utils/manageToken';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setIsModalOpen }: Props) => {
  const { setLoggedUser } = useLoggedUser();

  const [isLoading, setIsLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const registerNewUser = (fields: RegisterDto) => {
    setIsLoading(true);
    authenticationServices
      .register(fields)
      .then((response) => {
        if (response.ok) return response.json();
        if (response.status === 309) {
          messageApi.open({
            type: 'error',
            content: 'This username is already taken.',
          });
          throw new Error('This username is already taken.');
        }
      })
      .then((data) => {
        manageToken.set(data.token);
        setLoggedUser(data.user);
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: `Hello ${fields.username}!`,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={(fields: RegisterDto) => registerNewUser(fields)}
        initialValues={{ remember: true }}
        disabled={isLoading}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please choose a username.' }]}
        >
          <Input placeholder="choose a username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please choose a password.' },
            {
              pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              message: 'This password is too weak.',
            },
          ]}
        >
          <Input type="password" placeholder="choose a password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
