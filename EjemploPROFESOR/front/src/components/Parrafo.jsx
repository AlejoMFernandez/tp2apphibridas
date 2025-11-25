import React from 'react'

const Parrafo = ({ nombre, clase, ...res }) => {
    return (
        <p { ...res } >
            {nombre}
            <em>{clase}</em>
        </p>
    )
}

export default Parrafo