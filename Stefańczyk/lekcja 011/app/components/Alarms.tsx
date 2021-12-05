/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
} from 'react-native'

import AlarmItem from './AlarmItem'
import Database from '../db/Database'

import { styles } from '../globals'
import { dbRow } from '../@types/Database'

const defaultAlarms: Array<dbRow> = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Alarms(props: any) {
    const [alarms, setAlarms] = useState(defaultAlarms)

    useEffect(() => {
        (async() => {
            const alarmList = await (Database.getAll())
            setAlarms(alarmList)
        })()
    }, [])

    useEffect(() => {
        setAlarms(alarms.sort((a, b) => a.id - b.id))
    }, [alarms])

    const renderAlarms = () => {
        return alarms.map((el, i) => {
            return <AlarmItem
                key={i}
                data={el}
                alarms={alarms}
                setAlarms={setAlarms}
            />
        })
    }

    const navigate = () => {
        props.navigation.navigate(
            's3',
            {alarms: alarms, setAlarms: setAlarms}
        )
    }

    return (
        <>
            <ScrollView style={styles.alarmList}>
                {renderAlarms()}
            </ScrollView>
            <View style={styles.addButton}>
                <TouchableOpacity
                    onPress={navigate}
                >
                    <Text style={styles.secondary}>➕</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
