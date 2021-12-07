/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    Animated,
    View,
    Text,
    Switch,
    TouchableNativeFeedback,
    Dimensions
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { styles, ripple } from '../styles'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlarmItem(props: any) {
    const invertHex = (hex: string) => {
        return '#' + (Number(`0x${hex.substr(1)}`) ^ 0xFFFFFF)
            .toString(16).toUpperCase().padStart(6, '0')
    }

    console.log(props)

    const viewNote = () => {
        console.log('> view')
    }

    const deleteNote = () => {
        console.log('> delete')
    }

    return (
        <TouchableNativeFeedback
            background={ripple.contain}
            key={props.id}
            onPress={() => viewNote()}
            onLongPress={() => deleteNote()}
        >
            <View style={[styles.note, {backgroundColor: props.color}]}>
                <Text style={{color: invertHex(props.color)}}>
                    {props.data.name}
                </Text>
                <Text style={{color: invertHex(props.color)}}>
                    {props.data.date}
                </Text>
                <Text style={{color: invertHex(props.color)}}>
                    {props.data.value}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}
