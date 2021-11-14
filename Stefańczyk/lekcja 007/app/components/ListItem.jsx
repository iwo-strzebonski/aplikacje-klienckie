import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import login from '../assets/login.jpg'
import { Settings } from './Settings'

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
                textAlign: 'center',
            }
        })
    }

    deleteUser(id, getusers) {
        fetch(
            Settings.address + ':' + Settings.port + `/delete?id=${id}`,
            {method: 'GET'}
        )
            .then(() => getusers())
    }

    render() {
        return (
            <View style={this.style.container}>
                <Image source={login} style={{width: 60, height: 60}} />
                <Text style={this.style.text}>{this.props.data.id}: {this.props.data.user} {this.props.data.pass}</Text>
                <MyButton
                    title='Delete'
                    color='#FFC107'
                    onpress={() => this.deleteUser(this.props.data.id, this.props.getusers)}
                />
                <MyButton
                    title='Details'
                    color='#FFC107' 
                    onpress={() => this.props.navigation.navigate('s3', {data: this.props.data})}
                />
            </View>
        )
    }
}
