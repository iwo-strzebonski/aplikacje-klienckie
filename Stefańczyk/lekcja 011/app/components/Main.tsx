/* eslint-disable require-jsdoc */
import React from 'react'
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native'

import { styles } from '../globals'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Main(props: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('s2')}
            >
                <Text style={styles.header}>Sqlite App</Text>
            </TouchableOpacity>
            <Text style={styles.secondary}>manage sqlite</Text>
            <Text style={styles.secondary}>use animation</Text>
            <Text style={styles.secondary}>use ring</Text>
        </View>
    )
}
