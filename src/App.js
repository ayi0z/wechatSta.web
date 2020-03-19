import React from 'react';
import './App.css';
import { Layout, Menu, Avatar, Popover, Divider } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Route, Switch, Link, useLocation } from 'react-router-dom'
import { root, login, reg, profile, article, fans, wechat, wxonline } from './router'
import { nickname } from './util/auth-storage'

const { Header, Content } = Layout

const AvatarMenu = nickname => (
  <>
    <div className="AvatarNickName">Hi, {nickname}</div>
    <Divider className="AvatarDivider" />
    <Link className="AvatarMenu" to={profile.path}><UserOutlined /> My Profile</Link>
    <Link className="AvatarMenu" style={{ color: '#e89191' }} to={login.path}><LogoutOutlined /> LOGOUT</Link>
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
          <Menu.Item key={fans.path}>
            <Link to={fans.path}>粉丝数据</Link>
          </Menu.Item>
          <Menu.Item key={article.path}>
            <Link to={article.path}>文章数据</Link>
          </Menu.Item>
          <Menu.Item key={wechat.path}>
            <Link to={wechat.path}>微信公众号</Link>
          </Menu.Item>
          <Menu.Item key={wxonline.path}>
            <Link to={wxonline.path}>公众号在线</Link>
          </Menu.Item>
        </Menu>
        <Popover content={AvatarMenu(nname)} placement="bottomRight" trigger="hover">
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
