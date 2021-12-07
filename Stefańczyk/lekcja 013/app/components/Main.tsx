/* eslint-disable require-jsdoc */
import React from 'react'
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native'

import { styles } from '../styles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Main(props: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('s2')}
            >
                <Text style={styles.header}>Notepad App</Text>
            </TouchableOpacity>
            <Text style={styles.secondary}>create notes</Text>
            <Text style={styles.secondary}>use secure storage</Text>
            <Text style={styles.secondary}>use burger menu</Text>
        </View>
    )
}
