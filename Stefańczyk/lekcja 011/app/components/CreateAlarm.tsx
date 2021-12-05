/* eslint-disable require-jsdoc */
import React, { useState } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native'
import { dbRow } from '../@types/Database'

import Database from '../db/Database'

import { styles } from '../globals'

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
                <TouchableOpacity
                    onPress={addAlarm}
                >
                    <Text style={styles.secondary}>➕</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
