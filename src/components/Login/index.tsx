import { Button, Col, Flex, Row, Form, Input, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import imgaeAnt from '~/assets/img/LoginArt.png'
import logoStyles from './Login.module.scss'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
const Login: React.FC = () => {
  const [form] = Form.useForm()
  return (
    <>
      <Flex align='center' justify='center'>
        <Flex className={logoStyles['login_container']}>
          <Flex className={logoStyles['login_container-form']} vertical>
            <Row>
              <Col
                span={24}
                style={{
                  width: '338px'
                }}
              >
                <Title level={2} style={{ color: '#000' }} className={logoStyles['login_container-form--heading']}>
                  Welcome Back
                </Title>
                <span className={logoStyles['login_container-form--span']}>
                  Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
                </span>

                <Form form={form} name='control-hooks' style={{ maxWidth: 600 }}>
                  <Form.Item name='username' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name='password' rules={[{ required: true }]}>
                    <Input.Password
                      placeholder='input password'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type='primary' htmlType='submit'>
                        Submit
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  type='primary'
                  size='large'
                  href='/auth/google'
                  style={{ background: '#DB4437', borderColor: '#DB4437' }}
                >
                  Login with Google
                </Button>
              </Col>
            </Row>
          </Flex>
          <Flex className={logoStyles['login_container-img']}>
            <img src={imgaeAnt} />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Login
