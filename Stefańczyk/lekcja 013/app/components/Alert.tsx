/* eslint-disable require-jsdoc */
import React from 'react'
import {
    Modal,
    Pressable,
    View,
    Text,
    Button
} from 'react-native'

import { styles } from '../styles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Alert(props: any) {
    const handleClose = () => {
        props.setModalData('')
    }

    const handleRemove = () => {
        props.setModalData(`remove_${props.modalData}`)
    }

    const setVisibility = () => {
        return props.modalData && !props.modalData.includes('remove')
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={setVisibility()}
            onRequestClose={handleClose}
        >
            <Pressable
                style={styles.alertContainer}
                onPress={() => {
                    props.setModalData('')
                }}
            />
            <View style={styles.alert}>
                <Text>Remove note?</Text>
                <View style={styles.alertButtonContainer}>
                    <Button
                        title='remove'
                        onPress={handleRemove}
                    />
                    <Button
                        title='cancel'
                        onPress={handleClose}
                    />
                </View>
            </View>
        </Modal>
    )
}
