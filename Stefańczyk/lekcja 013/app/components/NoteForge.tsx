/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    useState,
    useRef
} from 'react'

import {
    TouchableNativeFeedback,
    View,
    TextInput
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'

import * as SecureStore from 'expo-secure-store'
import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'

import editNote from '../functions/editNote'
import createNote from '../functions/createNote'

export default function NoteForge(props: any) {
    const [categories, setCategories] = useState([] as string[])
    const [value, pickValue] = useState(
        props.route.params.data?.category || ''
    )

    const titleRef = useRef()
    const textRef = useRef()

    useFocusEffect(() => {
        if (props.route.params.mode === 'edit') {
            if (!props.route.params.data) {
                props.navigation.navigate('s2')
                return
            }

            const title = (titleRef.current as any)
            const text = (textRef.current as any)
            title.value = props.route.params.data.title
            text.value = props.route.params.data.text
        }

        (async() => {
            const cat = await SecureStore.getItemAsync('categories')

            if (!cat) return

            setCategories(JSON.parse(cat))
        })()
    })

    const createPickerList = () => {
        return categories.map((category, i) =>
            <Picker.Item
                key={i}
                label={category}
                value={category}
            />
        )
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
                    placeholder='title...'
                    defaultValue={props.route.params.data?.title || null}
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
                    placeholder='text...'
                    defaultValue={props.route.params.data?.text || null}
                    onChangeText={
                        (text) => (textRef.current as any).value = text
                    }
                    ref={textRef}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={value}
                    onValueChange={pickValue}
                >
                    {createPickerList()}
                </Picker>
            </View>
            <TouchableNativeFeedback
                background={ripple.circle}
                onPress={
                    props.route.params.mode === 'edit'
                        ? () => editNote(
                            props,
                            (titleRef.current as any).value,
                            (textRef.current as any).value,
                            value
                        )
                        : () => createNote(
                            props.navigation.navigate,
                            titleRef,
                            textRef,
                            value
                        )
                }
            >
                <View style={styles.addButton}>
                    <FontAwesome name={
                        props.route.params.mode === 'edit'
                            ? 'pencil'
                            : 'plus'
                    } size={32} color='white' />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
