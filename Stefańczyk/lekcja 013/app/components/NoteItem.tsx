/* eslint-disable require-jsdoc */
import React  from 'react'
import {
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native'
import * as SecureStore from 'expo-secure-store'

import { styles, ripple } from '../styles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlarmItem(props: any) {
    const invertHex = (hex: string) => {
        return '#' + (Number(`0x${hex.substring(1)}`) ^ 0xFFFFFF)
            .toString(16).toUpperCase().padStart(6, '0')
    }

    const viewNote = () => {
        console.log('> view')
    }

    const createDate = (date: number): string => {
        const d = new Date(date)
        return (
            d.toLocaleString().substring(8, 10) +
            d.toLocaleString().substring(3, 7)
        )
    }

    return (
        <TouchableNativeFeedback
            background={ripple.contain}
            key={props.id}
            onPress={() => viewNote()}
            onLongPress={() => props.setModalData(props.id)}
        >
            <View style={[styles.note, {backgroundColor: props.color}]}>
                <Text
                    style={[styles.noteTitle, {color: invertHex(props.color)}]}
                >
                    {props.title}
                </Text>
                <Text
                    style={[styles.noteDate, {color: invertHex(props.color)}]}
                >
                    {createDate(props.date)}
                </Text>
                <Text style={{color: invertHex(props.color)}}>
                    {props.text}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}
