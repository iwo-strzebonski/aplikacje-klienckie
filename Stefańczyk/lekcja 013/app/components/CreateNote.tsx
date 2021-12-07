/* eslint-disable require-jsdoc */
import React from 'react'
import {
    TouchableNativeFeedback,
    View,
    TextInput
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateAlarm(props: any) {
    return (
        <View style={[
            styles.container,
            styles.center
        ]}>
            <View style={[
                styles.inputContainer,
                styles.center
            ]}>
                <TextInput style={[
                    styles.input,
                    styles.titleInput
                ]} />
                <TextInput
                    style={[
                        styles.input,
                        styles.valueInput
                    ]}
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <TouchableNativeFeedback background={ripple.circle}>
                <View style={styles.addButton}>
                    <FontAwesome name='plus' size={32} color='white' />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
