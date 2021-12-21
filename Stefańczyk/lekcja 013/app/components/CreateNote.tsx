/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react'

import {
    TouchableNativeFeedback,
    View,
    TextInput
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'

import createNote from '../functions/createNote'

export default function CreateNote(props: any) {
    const titleRef = useRef()
    const textRef = useRef()

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
                    placeholder='title'
                    onChangeText={
                        (text) => (titleRef.current as any).value = text
                    }
                    ref={titleRef}
                />
                <TextInput
                    style={[
                        styles.input,
                        styles.valueInput
                    ]}
                    multiline={true}
                    numberOfLines={4}
                    placeholder='text'
                    onChangeText={
                        (text) => (textRef.current as any).value = text
                    }
                    ref={textRef}
                />
            </View>
            <TouchableNativeFeedback
                background={ripple.circle}
                onPress={() => createNote(props, titleRef, textRef)}
            >
                <View style={styles.addButton}>
                    <FontAwesome name='plus' size={32} color='white' />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
