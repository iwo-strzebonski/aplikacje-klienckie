/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Switch,
    TouchableNativeFeedback,
} from 'react-native'
import { dbRow } from '../@types/Database'
import Database from '../db/Database'

import { styles } from '../globals'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlarmItem(props: any) {
    const [active, changeActive] = useState(props.data.active)
    const [days, changeDays] = useState([])

    // useEffect(() => {
    // }, [active, days])

    const onActiveChange = (value: boolean) => {
        changeActive(value)

        const alarmList = props.alarms
        for (const i in alarmList) {
            if (alarmList[i].id === props.data.id) {
                alarmList[i].active = value
                alarmList[i].days = days
                Database.editOne(alarmList[i])

                break
            }
        }

        props.setAlarms(alarmList)
    }

    const removeAlarm = () => {
        Database.deleteOne(props.data.id)

        props.setAlarms(
            props.alarms.filter((el: dbRow) => {
                return el.id !== props.data.id
            })
        )
    }

    return (
        <TouchableNativeFeedback>
            <View style={styles.alarm}>
                <Text style={styles.primary}>{props.data.hour}</Text>
                <Switch value={active} onValueChange={(value) => {
                    onActiveChange(value)
                }} style={{width: 48, alignSelf: 'flex-end'}} />
                <TouchableOpacity onPress={removeAlarm} style={{width: 32}}>
                    <Text style={styles.removeAlarm}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </TouchableNativeFeedback>
    )
}
