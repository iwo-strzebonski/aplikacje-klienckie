/* eslint-disable require-jsdoc */
import React from 'react'
import {
    Text
} from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import { FontAwesome } from '@expo/vector-icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label='Note App'
                icon={() =>
                    <FontAwesome name='sticky-note' size={64} color='black' />
                }
                onPress={() => false}
            />

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}
