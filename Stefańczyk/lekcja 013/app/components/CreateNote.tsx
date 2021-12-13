/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    useRef
} from 'react'
import {
    TouchableNativeFeedback,
    View,
    TextInput
} from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'

export default function CreateNote(props: any) {
    const randomColor = () => {
        return '#' + (
            Math.random() * 0xFFFFFF << 0
        ).toString(16).padStart(6, '0')
    }

    const titleRef = useRef()
    const textRef = useRef()

    const createNote = async() => {
        if (titleRef.current && textRef.current) {
            const title = (titleRef.current as any).value
            const text = (textRef.current as any).value

            if (title && text) {
                let keys: string[] = []
                const keyStore = await SecureStore.getItemAsync('keys')
                let key = '0'

                if (keyStore !== null) {
                    keys = JSON.parse(keyStore)
                    key = JSON.parse(keyStore).length.toString()
                }

                keys.push(key)

                await SecureStore.setItemAsync('keys', JSON.stringify(keys))
                await SecureStore.setItemAsync(key, JSON.stringify({
                    id: key,
                    title: title,
                    text: text,
                    date: Date.now(),
                    color: randomColor()
                }));

                (titleRef.current as any).clear();
                (textRef.current as any).clear()

                props.navigation.navigate('s1')
            }
        }
    }

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
                onPress={createNote}
            >
                <View style={styles.addButton}>
                    <FontAwesome name='plus' size={32} color='white' />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
