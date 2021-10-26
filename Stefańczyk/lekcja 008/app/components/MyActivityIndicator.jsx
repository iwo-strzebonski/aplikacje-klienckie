import React from 'react'
import { ActivityIndicator, View } from 'react-native'

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
            <View style={{flex:1}}>
                {
                    this.props.number
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        : <ActivityIndicator size="small" color="#ff0000" />
                }
            </View>
        )
    }
}
