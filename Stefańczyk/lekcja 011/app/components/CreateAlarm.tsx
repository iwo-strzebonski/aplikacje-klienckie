/* eslint-disable require-jsdoc */
import React from 'react'
import {
    TouchableOpacity,
    View
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Database from '../db/Database'
import { styles } from '../globals'

import { dbRow } from '../@types/Database'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateAlarm(props: any) {
    const addAlarm = () => {
        const alarm: dbRow = {
            id: ++Database.lastId,
            hour: '00:00',
            days: '[]',
            active: false
        }

        Database.addOne(alarm)
        props.route.params.setAlarms(props.route.params.alarms.concat(alarm))
        props.navigation.navigate('s2')
    }

    return (
        <>
            <View style={styles.container}>

            </View>
            <View style={styles.addButton}>
                <TouchableOpacity onPress={addAlarm}>
                    <FontAwesome name='plus' size={32} color='white' />
                </TouchableOpacity>
            </View>
        </>
    )
}
