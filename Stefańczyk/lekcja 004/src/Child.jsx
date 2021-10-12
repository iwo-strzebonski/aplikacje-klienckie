import React from 'react'

class Child extends React.Component {
    render() {
        return (
            <h1>
                Child Page - params: {this.props.match.params.id}
            </h1>
        )
    }
}

export default Child
