import React from 'react'
import {
    TouchableOpacity,
    Text
} from 'react-native'

export default class CircleButton extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <TouchableOpacity
                title=''
                style={{
                    borderRadius: 999,
                    width: this.props.size,
                    height: this.props.size,
                    borderColor: '#ffffff',
                    borderWidth: this.props.size / 16,
                    overflow: 'hidden',
                    borderType: 'solid',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => this.props.onpress()}
            >
                <Text style={{fontSize: this.props.size / 2, color: '#ffffff'}}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}
