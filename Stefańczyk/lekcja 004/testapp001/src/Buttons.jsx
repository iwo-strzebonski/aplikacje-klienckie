import React from 'react'

import Button from './Button'

class Buttons extends React.Component {
    render() {
        let array = []

        for (let i = 0; i < this.props.match.params.id; i++) {
            array.push(<Button id={i} key={i}></Button>)
        }

        return (
            <>{array}</>
        )
    }
}

export default Buttons
