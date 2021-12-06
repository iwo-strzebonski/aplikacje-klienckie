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

import Database from '../db/Database'
import { styles, ripple } from '../globals'

import { dbRow } from '../@types/Database'

const defaultHeight = Dimensions.get('window').height / 5
const defaultDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlarmItem(props: any) {
    const [active, changeActive] = useState(props.data.active as boolean)
    const [days, changeDays] = useState(JSON.parse(props.data.days))
    const height = new Animated.Value(defaultHeight)
    const [expanded, toggleExpand] = useState(false)
    let toValue = 0

    useEffect(() => {
        const alarmList = props.alarms

        for (const i in alarmList) {
            if (alarmList[i].id === props.data.id) {
                alarmList[i].active = active
                alarmList[i].days = JSON.stringify(days)
                Database.editOne(alarmList[i])

                break
            }
        }

        props.setAlarms(alarmList)
    }, [active, days])

    useEffect(() => {
        toValue = expanded
            ? defaultHeight * 1.25
            : defaultHeight

        height.setValue(
            expanded
                ? defaultHeight
                : defaultHeight * 1.25
        )

        Animated.spring(height, {
            toValue: toValue,
            useNativeDriver: false
        }).start()
    }, [expanded])

    const setDays = (day: string) => {
        let dayList = days
        if (!dayList.includes(day)) {
            dayList = dayList.concat(day)
        } else {
            dayList = []
            for (const d of days) {
                if (d !== day) {
                    dayList.push(d)
                }
            }
        }

        dayList = dayList.sort(function(a: string, b: string) {
            return defaultDays.indexOf(a) - defaultDays.indexOf(b)
        })

        changeDays(dayList)
    }

    const renderDays = () => {
        return defaultDays.map((el, i) => {
            return (
                <TouchableNativeFeedback
                    background={ripple.circle}
                    key={i}
                    onPress={() => setDays(el)}
                >
                    <View style={[
                        styles.daySelectable,
                        {
                            backgroundColor: days.includes(el)
                                ? 'rgba(255,255,255,0.1)'
                                : 'transparent'
                        }
                    ]}>
                        <Text style={styles.dayText}>{el}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })
    }

    // TODO: Niedziałanie tego to czarna magia dla mnie
    const removeAlarm = () => {
        Database.deleteOne(props.data.id)

        props.setAlarms(
            props.alarms.filter((el: dbRow) => {
                return el.id !== props.data.id
            })
        )
    }

    return (
        <TouchableNativeFeedback
            background={ripple.contain}
            key={props.data.id}
            onPress={() => toggleExpand(!expanded)}
        >
            <Animated.View
                style={[styles.alarm, {height: height}]}
            >
                <Text style={styles.primary}>{props.data.hour}</Text>
                <Switch value={active} onValueChange={(value) => {
                    changeActive(value)
                }} style={{width: 48, alignSelf: 'flex-end'}} />
                <TouchableOpacity
                    onPress={removeAlarm}
                    style={{width: 32}}
                >
                    <FontAwesome name='trash' size={32} color='white' />
                </TouchableOpacity>
                <View style={styles.alarmDays}>
                    <View>
                        <Text style={styles.daysSelectedText}>
                            {days.join(', ')}
                        </Text>
                    </View>
                    <FontAwesome
                        name={`chevron-${expanded
                            ? 'up'
                            : 'down'
                        }`}
                        size={24}
                        color='white'
                    />
                </View>
                <View style={[
                    styles.selectableDays,
                    {display: (expanded ? 'flex' : 'none')}
                ]}>
                    {renderDays()}
                </View>
            </Animated.View>
        </TouchableNativeFeedback>
    )
}
