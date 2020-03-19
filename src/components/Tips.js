import React from 'react'
import { Link } from 'react-router-dom'
import { wechat, fans, article, profile } from '../router'


export default props => {
    return (
        <div className="Tips">
            <p>微信公众号平台限制，每天<b>上午8点后</b>可查询公众号前一天的数据。</p>
            <ul>
                <li>本系统默认在每天<b>上午8点10分</b>从微信服务器同步公众号前一天的粉丝和图文数据。</li>
                <li>如果您订阅了邮件服务，本系统将在<b>每周一</b>导出公众号数据到xlsx，并发送到您的电子邮箱。</li>
                <li>可在右上角悬浮菜单中点击<Link to={profile.path}>My Profile</Link>维护个人电子邮件地址、修改密码、设置邮件服务。</li>
                <li>可在<Link to={wechat.path}>微信公众号</Link>管理您的公众号列表。</li>
                <li>请确保您的微信公众号已经经过认证，并具有用户/图文分析接口权限。</li>
                <li>可分别在<Link to={fans.path}>粉丝数据</Link>和<Link to={article.path}>文章数据</Link>查看粉丝和文章的数据，并下载xlsx文件。</li>
            </ul>
        </div>
    )
}
