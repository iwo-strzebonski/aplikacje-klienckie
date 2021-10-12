import React from 'react'

import Div from './Div'

class Divs extends React.Component {
    render() {
        let array = []

        for (let i = 0; i < this.props.match.params.id; i++) {
            array.push(<Div value={i+1} key={i}></Div>)
        }

        return (
            <>{array}</>
        )
    }
}

export default Divs
