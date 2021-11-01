import React from 'react'
import { StyleSheet, View, Text, Switch } from 'react-native'

import MyButton from './MyButton'

export default class ListItem extends React.Component {
    constructor(props) {
        super(props)
    
        this.props = props
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            },
            text: {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
            }
        })
    }

    render() {
        return (
            <View style={this.style.container}>
                <View style={this.style.text}>
                    <Text style={{fontWeight: 'bold'}}>{this.props.data.value.timestamp}</Text>
                    <Text>{this.props.data.value.coords.latitude}</Text>
                    <Text>{this.props.data.value.coords.longitude}</Text>
                </View>
                <Switch
                    value={this.props.data.selected}
                    onChange={() => this.props.callback(this.props.id)}
                />
            </View>
        )
    }
}
