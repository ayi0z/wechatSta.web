import React from 'react'
import Tips from './components/Tips'

export default props => {
    return (
        <div>
            <h1 style={{
                textAlign: 'center',
                margin: '30px auto 20px',
                fontSize: 38,
                textShadow: ' 3px 2px 1px #a6b8bd'
            }}>
                404. Not Found</h1>
            <Tips />
        </div>
    )
}