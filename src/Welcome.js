import React from 'react'
import { nickname } from './util/auth-storage'
import Tips from './components/Tips'

export default () => {
    return (
        <div style={{
            margin: '30px auto 20px',
            textAlign: 'center',
            fontSize: '60px',
        }}>
            <p style={{ textShadow: ' 3px 2px 1px #a6b8bd' }}>Hi, {nickname() || 'Lucky Day!'}</p>
            <Tips />
        </div >
    )
}