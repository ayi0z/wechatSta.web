import { authchk } from './api'
import { get } from './request'
import { login, reg } from '../router'

const X_AUTH_TOKEN = 'x-auth-token'
const X_NICKNAME = 'x-nickname'

export function authSave(token, nickname) {
    localStorage.setItem(X_AUTH_TOKEN, token)
    if (nickname)
        localStorage.setItem(X_NICKNAME, nickname)
}

export function authClear() {
    localStorage.removeItem(X_AUTH_TOKEN)
    localStorage.removeItem(X_NICKNAME)
}

export function authtoken() {
    return localStorage.getItem(X_AUTH_TOKEN)
}

export function nickname() {
    return localStorage.getItem(X_NICKNAME)
}

export const AuthChk = () => {
    const path = window.location.pathname.toLowerCase()
    if (path !== login.path && path !== reg.path)
        get(authchk)
}
