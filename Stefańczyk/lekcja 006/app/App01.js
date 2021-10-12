import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import Item from './components/__App01-Item'

export default class App extends React.Component {
    render() {
        console.log('App')
        return (
            <View style={styles.container}>
                <Item color='red' text='Header' height='15%' />
                <Item color='green' text='Content' height='70%' />
                <Item color='blue' text='Footer' height='15%' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff00',   
    }, 
})
