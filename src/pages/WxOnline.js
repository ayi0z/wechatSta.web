import React from 'react'
import mp from '../util/mp'

export default props => {
    return (
        <div style={{ height: '100%' }}>
            <object id="iframe_wechat"
                type="text/html"
                data="https://mp.weixin.qq.com/cgi-bin/home"
                width="100%" height="100%">Lost Connection</object>
            <object id="ifr_hid" type="text/html" width="0" height="0">Lost Connection</object>
        </div>
    )
}