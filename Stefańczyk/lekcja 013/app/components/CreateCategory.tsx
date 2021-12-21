/* eslint-disable require-jsdoc */
import React, { useRef } from 'react'

import {
    TouchableNativeFeedback,
    View,
    TextInput
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'

import createCategory from '../functions/createCategory'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateCategory(props: any) {
    const categoryRef = useRef()

    return (
        <View style={[
            styles.container,
            styles.center
        ]}>
            <View style={[
                styles.inputContainer,
                styles.center
            ]}>
                <TextInput
                    style={[
                        styles.input,
                        styles.titleInput
                    ]}
                    placeholder='category...'
                    onChangeText={
                        (text) => (categoryRef.current as any).value = text
                    }
                    ref={categoryRef}
                />
            </View>
            <TouchableNativeFeedback
                background={ripple.circle}
                onPress={() => createCategory(
                    props.navigation.navigate,
                    (categoryRef.current as any).value
                )}
            >
                <View style={styles.addButton}>
                    <FontAwesome name='tag' size={32} color='white' />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
