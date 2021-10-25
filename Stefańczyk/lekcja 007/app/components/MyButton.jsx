import PropTypes from 'prop-types'

import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'


export default class MyButton extends React.Component{
    constructor(props) {
        super(props)
        this.props = props

        this.style = StyleSheet.create({
            container: {
                alignSelf: 'flex-start',
                backgroundColor: this.props.color,
                borderRadius: 16,
                padding: 10
            },
            text: {
                textAlign: 'center',
                color: 'white'
            }
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onpress()}>
                <Text style={this.style.text}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onpress: PropTypes.func.isRequired,
}
