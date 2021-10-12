import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class Item extends Component {
    constructor(props) {
        super(props)

        this.state = { }

        this.styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: this.props.color,
                height: this.props.height,
                justifyContent: 'space-around',
                alignItems: 'center'
            },
            text: {
                fontSize: 48,
                color: 'white',
            }
        })
    }

    render() {
        const value = this.props.text
        return (
            <TouchableOpacity
                style={this.styles.container}
                onPress={() => this.props.onPress(value)}
            >
                <Text style={this.styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}
