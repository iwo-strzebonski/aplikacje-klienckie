/* eslint-disable require-jsdoc */
import React  from 'react'
import {
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native'

import { styles, ripple } from '../styles'

import createDate from '../functions/createDate'
import invertHex from '../functions/invertHex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlarmItem(props: any) {
    const handleEditNote = () => {
        props.navigation.navigate('s3', { data: props.data })
    }

    return (
        <TouchableNativeFeedback
            background={ripple.contain}
            key={props.data.id}
            onPress={() => handleEditNote()}
            onLongPress={() => props.setModalData(props.data.id)}
        >
            <View style={[styles.note, {backgroundColor: props.data.color}]}>
                <Text style={styles.noteCategory}>
                    {props.data.category}
                </Text>
                <Text
                    style={[styles.noteTitle, {color: invertHex(props.data.color)}]}
                >
                    {props.data.title}
                </Text>
                <Text
                    style={[styles.noteDate, {color: invertHex(props.data.color)}]}
                >
                    {createDate(props.data.date)}
                </Text>
                <Text style={{color: invertHex(props.data.color)}}>
                    {props.data.text}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}
