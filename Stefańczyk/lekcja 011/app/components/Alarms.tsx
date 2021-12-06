/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import AlarmItem from './AlarmItem'
import Database from '../db/Database'

import { styles } from '../globals'
import { dbRow } from '../@types/Database'

const defaultAlarms: Array<dbRow> = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Alarms(props: any) {
    const [alarms, setAlarms] = useState(defaultAlarms)
    const [id, refreshId] = useState(-1)

    useEffect(() => {
        (async() => {
            const alarmList = await (Database.getAll())
            setAlarms(alarmList)
        })()
    }, [])

    useEffect(() => {
        setAlarms(alarms.sort((a, b) => a.id - b.id))
        if (alarms.length) {
            refreshId(alarms[alarms.length - 1].id)
        } else {
            refreshId(-1)
        }
    }, [alarms])

    const renderAlarms = (alarms: dbRow[]) => {
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

    // TODO: po naprawieniu renderowania usuwanych elementów usunąć <Text>
    return (
        <>
            <ScrollView style={styles.alarmList} key={id}>
                <Text>{JSON.stringify(alarms)}</Text>
                {renderAlarms(alarms)}
            </ScrollView>
            <View style={styles.addButton}>
                <TouchableOpacity onPress={navigate}>
                    <FontAwesome name='plus' size={32} color='white' />
                </TouchableOpacity>
            </View>
        </>
    )
}
