import React from 'react'
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native'

export default function Main(props) {
    console.log(props)
    return (
        <View style={global.styles.container}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('s2')}
            >
                <Text style={global.styles.header}>Sqlite App</Text>
            </TouchableOpacity>
            <Text style={global.styles.secondary}>manage sqlite</Text>
            <Text style={global.styles.secondary}>use animation</Text>
            <Text style={global.styles.secondary}>use ring</Text>
        </View>
    )
}