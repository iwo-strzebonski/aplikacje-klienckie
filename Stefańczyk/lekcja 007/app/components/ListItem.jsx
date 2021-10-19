import React from 'react'
import { StyleSheet } from 'react-native'

import MyButton from './MyButton'

export default class ListItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.uid)

        this.props = props
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'row'
            }
        })
    }

    render() {
        console.log(this.props.route.params.a)
        console.log(this.props.route.params.b)
        return (
            <View style={this.style.cotainer}>
                <MyButton
                    title='Details'
                    color='#FFC107' 
                    onpress={() => this.props.navigation.navigate('s3', {uid: this.props.uid})}
                />
            </View>
        )
    }
}
