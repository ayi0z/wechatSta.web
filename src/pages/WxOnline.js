import React, { useState, useEffect } from 'react'
import { get } from '../util/request'
import { wxonline } from '../util/api'

export default props => {
    const [loginQr, setLoginQr] = useState()

    // useEffect(() => {
    //     get(`https://mp.weixin.qq.com/cgi-bin/scanloginqrcode?action=getqrcode&random=${Date.now()}`).then(data=>{
    //         console.log(data);
    //     })
    // }, [])

    return (
        <div>
            <img rel="noopener noreferrer" src={`https://mp.weixin.qq.com/cgi-bin/scanloginqrcode?action=getqrcode&random=${Date.now()}`}></img>
        </div>
    )
}