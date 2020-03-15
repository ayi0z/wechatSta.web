import React from 'react'
import { nickname } from './util/auth-storage'

export default () => {
    return (
        <div style={{
            margin: '10% auto',
            textAlign: 'center',
            fontSize: '60px',
            textShadow: ' 3px 2px 1px #a6b8bd'
        }}>
            <p>Hi, {nickname() || 'Lucky Day!'}</p>
        </div >
    )
}