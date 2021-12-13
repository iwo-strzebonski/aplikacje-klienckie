/* eslint-disable require-jsdoc */
import React, { EffectCallback, useEffect, useState } from 'react'
import {
    FlatList,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

import NoteItem from './NoteItem'

import { styles } from '../styles'
import { note } from '../@types/Notes'
import Alert from './Alert'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Notes() {
    const [modalData, setModalData] = useState('')

    const [notes, setNotes] = useState(
        [] as note[]
    )

    const [secureKeys, setSecureKeys] = useState('')

    const loadNotes = async() => {
        const notesArray: note[] = []
        const keyStore = await SecureStore.getItemAsync('keys')

        if (keyStore !== null) {
            for (const key of JSON.parse(keyStore)) {
                const note = await SecureStore.getItemAsync(key.toString())
                if (note !== null) {
                    notesArray.push(JSON.parse(note))
                }
            }
        }

        setNotes(notesArray)
    }

    const deleteNote = async() => {
        if (modalData.includes('remove')) {
            const id = modalData.substring(modalData.indexOf('_') + 1)
            setModalData('')

            await SecureStore.deleteItemAsync(id)
            const kks = await SecureStore.getItemAsync('keys')

            if (kks !== null) {
                let keyList: string[] = JSON.parse(kks)
                keyList = keyList.filter(el => el !== id)
                await SecureStore.setItemAsync('keys', JSON.stringify(keyList))
                setSecureKeys(JSON.stringify(keyList))
            }
        }
    }

    useEffect(loadNotes as unknown as EffectCallback, [secureKeys])
    useEffect(deleteNote as unknown as EffectCallback, [modalData])

    useFocusEffect((() => {
        (async() => {
            const kks = await SecureStore.getItemAsync('keys')
            if (kks !== null && kks !== secureKeys) {
                setSecureKeys(kks)
            }
        })()
    }) as unknown as EffectCallback)

    return (
        < >
            <Alert
                modalData={modalData}
                setModalData={setModalData}
            />
            <FlatList
                key={Date.now()}
                style={styles.container}
                columnWrapperStyle={{justifyContent: 'space-evenly'}}
                data={notes}
                renderItem={({item}) => <NoteItem
                    id={item.id}
                    date={item.date}
                    title={item.title}
                    text={item.text}
                    color={item.color}
                    setSecureKeys={setSecureKeys}
                    modalData={modalData}
                    setModalData={setModalData}
                />}
                numColumns={2}
                keyExtractor={(item) => item.id}
            />
        </>
    )
}
