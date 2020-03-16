import { message } from 'antd'
import { login, reg } from '../router'

message.config({
    top: 100,
    duration: 3,
})

const codeHandler = {
    500: '服务器内部错误',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    401: '登陆失效，重新登陆',
    403: '资源不可用',
    404: '请求的资源在服务器上不存在',
    6501: '无效参数.'
}

const codeCallbackHandler = {
    401: () => {
        const path = window.location.pathname.toLowerCase()
        if (path !== login.path && path !== reg.path)
            window.location = login.path
    }
}

export default (code, t = 'info', m = '') => {
    const msg = message[t]
    const ch = codeHandler[code] || m || 0
    const call = codeCallbackHandler[code]

    if (msg && ch) msg(ch)
    else if (msg && !call && code) msg(code)

    if (call) call()
}