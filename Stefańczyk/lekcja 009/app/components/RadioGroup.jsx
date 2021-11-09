import React from 'react'

import {
    Text,
    View
} from 'react-native'
import RadioButton from './RadioButton'

export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            pressed: this.props.data.map((el, id) => {
                return {id: el, state: id === 0}
            })
        }
    }

    changeState(id) {
        this.setState({
            pressed: this.state.pressed.map(el => {
                return {id: el.id, state: el.id === id}
            })
        })
    }

    render() {
        return (
            <View style={{
                flexDirection: this.props.direction // row - column
            }}>
                <Text style={{
                    fontSize: 32,
                    color: '#FFFFFF',
                    borderBottomColor: '#FFFFFF',
                    borderBottomWidth: 1
                }}>{this.props.groupname}</Text>
                {this.props.data.map((element, i) => {
                    return (
                        <RadioButton
                            title={element}
                            selected={this.state.pressed.find(el => {
                                return el.id === element
                            }).state}
                            key={i}
                            id={element}
                            changestate={this.changeState.bind(this)}
                        />
                    )
                })}
            </View>
        )
    }
}
