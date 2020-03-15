import React from 'react';
import './App.css';
import { Layout, Menu, Avatar, Popover, Divider } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { Route, Switch, Link, useLocation } from 'react-router-dom'
import { root, login, reg, profile } from './router'
import { nickname } from './util/auth-storage'

const { Header, Content } = Layout

const AvatarMenu = (
  <>
    <div className="AvatarNickName">Hi, Ayioz</div>
    <Divider className="AvatarDivider" />
    <Link className="AvatarMenu" to={profile.path}>My Profile</Link>
    <Link className="AvatarMenu" to={login.path}><LogoutOutlined /> LOGOUT</Link>
  </>
)

const App = props => {
  const nname = nickname() || 'O'
  let path = useLocation().pathname.toLowerCase()
  if (path === login.path || path === reg.path) return (null)

  return (
    <Layout className="Layout">
      <Header className="Header">
        <Link to="/"><div className="logo" /></Link>
        <Menu
          className="Menu"
          mode="horizontal"
          selectedKeys={[path]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/fans">
            <Link to="/fans">粉丝数据</Link>
          </Menu.Item>
          <Menu.Item key="/article">
            <Link to="/article">文章数据</Link>
          </Menu.Item>
          <Menu.Item key="/wechat">
            <Link to="/wechat">微信公众号</Link>
          </Menu.Item>
        </Menu>
        <Popover content={AvatarMenu} placement="bottomRight" trigger="click">
          <Avatar className="Avatar" size="large">
            {(nname[0] || 'O').toUpperCase()}
          </Avatar>
        </Popover>
      </Header>
      <Content className="Content">
        <Switch>
          {
            root.children.map((r, k) => (<Route exact key={k} path={r.path} component={r.component} />))
          }
        </Switch>
      </Content>
    </Layout>
  )
}

export default App
