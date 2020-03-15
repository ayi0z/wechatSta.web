import App from './App'
import Welcome from './Welcome'
import NotFound from './404'
import Pwd from './pages/Pwd'
import WeChat from './pages/WeChat'
import Fans from './pages/Fans'
import Article from './pages/Article'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Profile from './pages/Profile'

export const notfound = { path: '*', component: NotFound }
export const welcome = { path: '/', component: Welcome }
export const pwd = { path: '/pwd', component: Pwd }
export const wechat = { path: '/wechat', component: WeChat }
export const fans = { path: '/fans', component: Fans }
export const article = { path: '/article', component: Article }
export const profile = { path: '/profile', component: Profile }

export const root = {
    path: '/',
    component: App,
    children: [welcome, pwd, wechat, fans, article, profile, notfound]
}
export const login = { path: '/login', component: Login }
export const reg = { path: '/reg', component: Reg }