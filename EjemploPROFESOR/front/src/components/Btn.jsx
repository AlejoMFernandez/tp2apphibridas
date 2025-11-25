import React from 'react'

const Btn = () => {

    const handleClick = (e) => {
        console.log(e)
        console.log("click")
    }

    return (
        <div>
            <button onClick={ () => handleClick("Hola!") } >Click!</button>
        </div>
    )
}

export default Btn