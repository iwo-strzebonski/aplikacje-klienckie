/* eslint-disable require-jsdoc */
import { Dispatch, SetStateAction } from 'react'
import * as SecureStore from 'expo-secure-store'

export default async function deleteNote(
    modalData: string,
    setModalData: Dispatch<SetStateAction<string>>,
    setSecureKeys: Dispatch<SetStateAction<string>>
) {
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
