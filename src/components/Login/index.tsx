import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Col, Flex, Form, Input, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import imgaeAnt from '~/assets/img/LoginArt.png'
import logoStyles from './Login.module.scss'
import { FaceBookIcon, GoogleIcon } from '../Icon'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'

import { auth, fbProvider } from '../../firebase/confg'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const handleFbLogin = async () => {
    signInWithPopup(auth, fbProvider)
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/')
      console.log(`user`, user)
    } else {
      // User is signed out
      // ...
    }
  })
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

                <Form form={form} layout='vertical' autoComplete='off' style={{ marginTop: '48px' }}>
                  <Form.Item name='Name' label='Name'>
                    <Input size='large' placeholder='Name' />
                  </Form.Item>
                  <Form.Item name='Password' label='Password'>
                    <Input.Password
                      size='large'
                      placeholder='Password'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Button
                    size='large'
                    type='primary'
                    htmlType='submit'
                    style={{
                      display: 'flex',
                      padding: '16px 0px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'stretch',
                      width: '100%',
                      borderRadius: '10px',
                      background: '#162D3A'
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>

            <Row
              style={{
                width: '338px'
              }}
            >
              <div className={logoStyles['login-or']}>
                <div></div>
                Or
                <div></div>
              </div>
              <Col span={24}>
                <Flex vertical style={{ gap: '16px' }}>
                  <Button
                    type='primary'
                    size='large'
                    href='/auth/google'
                    style={{
                      background: '#F3F9FA',
                      borderColor: '#F3F9FA',
                      color: '#000',
                      borderRadius: '12px',
                      height: '40px'
                    }}
                  >
                    <GoogleIcon /> Login with Google
                  </Button>
                  <Button
                    type='primary'
                    size='large'
                    // href='/auth/google'
                    style={{
                      background: '#F3F9FA',
                      borderColor: '#F3F9FA',
                      color: '#000',
                      borderRadius: '12px',
                      height: '40px'
                    }}
                    onClick={handleFbLogin}
                  >
                    <FaceBookIcon />
                    Login with Facebook
                  </Button>
                </Flex>
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
