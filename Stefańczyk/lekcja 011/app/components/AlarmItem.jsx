import React, { useState } from 'react'
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
} from 'react-native'

export default function Alarms(props) {
    const [alarms, createAlarm] = useState([])

    return (
        <View style={global.styles.alarm}>
            <Text style={global.styles.primary}>{props.data}</Text>
        </View>
    )
}