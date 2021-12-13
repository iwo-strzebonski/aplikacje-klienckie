/* eslint-disable require-jsdoc */
import React from 'react'
import {
    TouchableOpacity,
    Dimensions,
    View,
    Text,
    Vibration
} from 'react-native'
import { styles } from '../globals'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Clock(props: any) {
    const setData = (i: number) => {
        props.setData(i < 10 ? `0${i}` : i)
        Vibration.vibrate(100)
    }

    const renderData = (): JSX.Element[] => {
        const hours = []
        const r = (
            Dimensions.get('window').width > Dimensions.get('window').height
                ? Dimensions.get('window').height
                : Dimensions.get('window').width
        ) / 2.5

        for (let i = 0, j = 0; j < props.count; i += props.offset, j++) {
            hours.push(
                i == props.data
                    ? <View
                        key={i}
                        style={[
                            {
                                top: r * Math.sin(
                                    Math.PI / (props.count / 2) *
                                        (j - props.count / 4)
                                ),
                                left: r * Math.cos(
                                    Math.PI / (props.count / 2) *
                                        (j - props.count / 4)
                                ) - 16
                            },
                            styles.circle,
                            styles.selected
                        ]}
                    >
                        <Text>{i}</Text>
                    </View>
                    : <TouchableOpacity
                        key={i}
                        style={[
                            {
                                top: r * Math.sin(
                                    Math.PI / (props.count / 2) *
                                        (j - props.count / 4)
                                ),
                                left: r * Math.cos(
                                    Math.PI / (props.count / 2) *
                                        (j - props.count / 4)
                                ) - 16
                            },
                            styles.circle
                        ]}
                        onPress={() => setData(i)}
                    >
                        <Text>{i}</Text>
                    </TouchableOpacity>
            )
        }

        return hours
    }

    return (
        < >
            {renderData()}
        </>
    )
}
