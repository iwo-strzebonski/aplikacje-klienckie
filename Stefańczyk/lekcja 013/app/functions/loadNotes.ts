/* eslint-disable require-jsdoc */
import { Dispatch, SetStateAction } from 'react'
import * as SecureStore from 'expo-secure-store'

import { note } from '../@types/Notes'

export default async function loadNotes(
    setNotes: Dispatch<SetStateAction<note[]>>
) {
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
