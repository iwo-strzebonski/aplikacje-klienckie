/* eslint-disable require-jsdoc */
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import * as SecureStore from 'expo-secure-store'

export default async function createPickerItems() {
    const categories = await SecureStore.getItemAsync('categories')

    if (!categories) return ''

    // return JSON.parse(categories).map(category => {
    //     return <Picker.Item category />
    // })

    return <Picker />
}
