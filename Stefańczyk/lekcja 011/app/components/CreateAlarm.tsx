/* eslint-disable require-jsdoc */
import React, {
    useState
} from 'react'
import {
    Button,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Database from '../db/Database'
import Clock from './Clock'

import { styles } from '../globals'

import { dbRow } from '../@types/Database'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateAlarm(props: any) {
    const [input, changeInput] = useState(0)
    const [hour, setHour] = useState('00')
    const [minute, setMinute] = useState('00')

    const addAlarm = () => {
        const alarm: dbRow = {
            id: ++Database.lastId,
            hour: `${hour}:${minute}`,
            days: '[]',
            active: false
        }

        Database.addOne(alarm)
        props.route.params.setAlarms(props.route.params.alarms.concat(alarm))
        props.navigation.navigate('s2')
    }

    return (
        <>
            <View style={[
                styles.container,
                {justifyContent: 'flex-start'}
            ]}>
                <Text style={[
                    styles.primary,
                    styles.selectedHour
                ]}>{hour}:{minute}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Hours'
                        color='#FFC600'
                        onPress={() => changeInput(0)}
                    />
                    <Button
                        title='Minutes'
                        color='#FFC600'
                        onPress={() => changeInput(1)}
                    />
                </View>
                <View style={styles.clock}>
                    {input
                        ? <Clock
                            data={minute}
                            setData={setMinute}
                            count={12}
                            offset={5}
                        />
                        : <Clock
                            data={hour}
                            setData={setHour}
                            count={24}
                            offset={1}
                        />
                    }
                </View>
            </View>
            <View style={styles.addButton}>
                <TouchableOpacity onPress={addAlarm}>
                    <FontAwesome name='plus' size={32} color='white' />
                </TouchableOpacity>
            </View>
        </>
    )
}
