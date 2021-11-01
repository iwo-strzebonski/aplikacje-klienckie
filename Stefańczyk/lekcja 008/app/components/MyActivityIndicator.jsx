import React from 'react'
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native'

export default class MyActivityIndicator extends React.Component{
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
            this.props.state
                ? (
                    <View style={{
                        display: 'flex',
                        width:'100%',
                        height:'100%',
                        position:'absolute',
                        backgroundColor: '#f0f0f0',
                        zIndex:999,
                        justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size='large' color='#0000ff' />
                    </View>
                )
                : < ></>
        )
    }
}
