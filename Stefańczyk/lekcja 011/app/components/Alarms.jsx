import React, { useState } from 'react'
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
} from 'react-native'

import AlarmItem from './AlarmItem'

export default function Alarms(props) {
    const [alarms, createAlarm] = useState([
        '1', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', 'b',
        'a', '0',
    ])

    return (
        <>
            <ScrollView style={global.styles.alarmList}>
                {alarms.map((el, i) => {
                    return <AlarmItem key={i} data={el} />
                })}
            </ScrollView>
            <View style={global.styles.addButton}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('s3')}
                >
                    <Text style={global.styles.secondary}>➕</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}