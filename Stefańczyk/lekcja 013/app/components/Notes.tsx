/* eslint-disable require-jsdoc */
import React, {
    EffectCallback,
    useEffect,
    useState
} from 'react'
import {
    FlatList,
    Text,
    TextInput
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

import NoteItem from './NoteItem'
import Alert from './Alert'

import loadNotes from '../functions/loadNotes'
import deleteNote from '../functions/deleteNote'

import { styles } from '../styles'

import { note } from '../@types/Notes'
import filterNotes from '../functions/filterNotes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Notes(props: any) {
    const [modalData, setModalData] = useState('')
    const [secureKeys, setSecureKeys] = useState('')
    const [notes, setNotes] = useState([] as note[])
    const [filter, setFilter] = useState('')

    useEffect(
        loadNotes.bind(null, setNotes) as unknown as EffectCallback,
        [secureKeys]
    )

    useEffect(
        deleteNote.bind(
            null,
            modalData,
            setModalData,
            setSecureKeys
        ) as unknown as EffectCallback,
        [modalData]
    )

    useFocusEffect(() => {
        (async() => {
            let kks = await SecureStore.getItemAsync('keys')

            if (kks !== null) {
                if (kks === secureKeys && props.route.params?.edited)
                    kks += props.route.params.edited

                setSecureKeys(kks)
            }
        })()
    })

    return (
        < >
            <Alert
                modalData={modalData}
                setModalData={setModalData}
            />
            
            <TextInput
                style={[
                    styles.input,
                    styles.searchInput
                ]}
                placeholder='search...'
                onChangeText={text => setFilter(text)}
            />
            {
                filterNotes(notes, filter).length
                    ? <FlatList
                        key={Date.now()}
                        style={styles.container}
                        columnWrapperStyle={{justifyContent: 'space-evenly'}}
                        data={filterNotes(notes, filter)}
                        renderItem={({item}) => <NoteItem
                            data={item}
                            setSecureKeys={setSecureKeys}
                            modalData={modalData}
                            setModalData={setModalData}
                            navigation={props.navigation}
                        />}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                    />
                    : <Text style={styles.title}>StoreApp1</Text>
            }
        </>
    )
}
