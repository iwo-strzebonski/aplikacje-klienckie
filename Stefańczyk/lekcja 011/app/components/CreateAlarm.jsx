import React, { useState } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native'

export default function CreateAlarm(props) {
    return (
        <>
            <View style={global.styles.container}>
                
            </View>
            <View style={global.styles.addButton}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('s2')}
                >
                    <Text style={global.styles.secondary}>➕</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}