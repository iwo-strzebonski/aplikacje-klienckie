import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import Header from './components/__App-Header'
import Content from './components/__App-Content'
import Footer from './components/__App-Footer'

export default class App extends React.Component {
    render() {
        console.log('App')
        return (
            <View style={styles.container}>     
                <Header />
                <Content />
                <Footer />
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
