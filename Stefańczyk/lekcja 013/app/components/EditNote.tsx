/* eslint-disable require-jsdoc */
import React, { useRef } from 'react'

import {
    TouchableNativeFeedback,
    View,
    TextInput
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'

import editNote from '../functions/editNote'

export default function EditNote(props: any) {
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
                    defaultValue={props.route.params.data.title}
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
                    defaultValue={props.route.params.data.text}
                    onChangeText={
                        (text) => (textRef.current as any).value = text
                    }
                    ref={textRef}
                />
            </View>
            <TouchableNativeFeedback
                background={ripple.circle}
                onPress={() => editNote(props, titleRef, textRef)}
            >
                <View style={styles.addButton}>
                    <FontAwesome name='pencil' size={32} color='white' />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
