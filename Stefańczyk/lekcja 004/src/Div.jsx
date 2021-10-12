import React from 'react'

class Div extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }
    }

    onClick(e) {
        this.setState({
            value: this.state.value + 1
        })
    }

    render() {
        return (
            <div className='pressable-div'
                onClick={(e) => this.onClick(e)}>
                {this.state.value}
            </div> 
        )
    }
}

export default Div
