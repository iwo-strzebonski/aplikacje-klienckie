import React from 'react'

import MyButton from './MyButton'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        console.log(this.props.route.params.a)
        console.log(this.props.route.params.b)
        return (
            <MyButton
                title='Go to screen 3'
                color='green' 
                onpress={
                    () => this.props.navigation.navigate(
                            's3',
                            {a: 1,b: 2}
                        )
                    }
            />
        )
    }
}
