const X_AUTH_TOKEN = 'x-auth-token'
const X_NICKNAME = 'x-nickname'

export function authtoken() {
    return localStorage.getItem(X_AUTH_TOKEN)
}

export function nicknameSave(nickname) {
    localStorage.setItem(X_NICKNAME, nickname)
}

export function nickname() {
    return localStorage.getItem(X_NICKNAME)
}