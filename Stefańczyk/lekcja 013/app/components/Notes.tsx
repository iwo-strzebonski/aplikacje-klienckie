/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    ScrollView,
    View,
    FlatList,
    Text
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import NoteItem from './NoteItem'

import { styles } from '../styles'
import { note } from '../@types/Notes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Alarms(props: any) {
    const randomColor = () => {
        return '#' + (
            Math.random() * 0xFFFFFF << 0
        ).toString(16).padStart(6, '0')
    }

    const [notes, setNotes] = useState(
        [] as note[]
    )

    useEffect(() => {
        setNotes([
            {
                id: 0,
                data: {
                    name: 'A',
                    value: 'AAA',
                    date: Date.now()
                },
                color: randomColor()
            },
            {
                id: 1,
                data: {
                    name: 'A',
                    value: 'AAA',
                    date: Date.now()
                },
                color: randomColor()
            },
        ])
    }, [])

    return (
        <FlatList
            style={styles.container}
            columnWrapperStyle={{justifyContent: 'space-evenly'}}
            data={notes}
            renderItem={({item}) => <NoteItem
                id={item.id}
                data={item.data}
                color={item.color}
            />}
            numColumns={2}
        />
    )
}
