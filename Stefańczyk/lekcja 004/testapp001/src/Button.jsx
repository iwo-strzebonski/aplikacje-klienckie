import React from 'react'

class Button extends React.Component {
    onClick(e) {
        alert(e.target.tagName + this.props.id)
    }

    render() {
        return (
            <button onClick={(e) => this.onClick(e)}>
                Button{this.props.id}
            </button> 
        )
    }
}

export default Button
