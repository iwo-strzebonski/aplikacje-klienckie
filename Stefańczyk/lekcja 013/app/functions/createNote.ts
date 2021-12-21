/* eslint-disable require-jsdoc */
import { MutableRefObject } from 'react'
import * as SecureStore from 'expo-secure-store'

import randomColor from '../functions/randomColor'

export default async function createNote(
    navigate: Function,
    titleRef: MutableRefObject<undefined>,
    textRef: MutableRefObject<undefined>,
    category: string
) {
    if (!(titleRef.current || textRef.current)) return

    const title = (titleRef.current as any).value
    const text = (textRef.current as any).value

    if (!(title && text && category)) return

    let keys: string[] = []
    const keyStore = await SecureStore.getItemAsync('keys')
    let key = '0'

    if (keyStore !== null) {
        keys = JSON.parse(keyStore)
        key = JSON.parse(keyStore).length.toString()
    }

    keys.push(key)

    await SecureStore.setItemAsync('keys', JSON.stringify(keys))
    await SecureStore.setItemAsync(key, JSON.stringify({
        id: key,
        title: title,
        text: text,
        category: category,
        date: Date.now(),
        color: randomColor()
    }));

    (titleRef.current as any).clear();
    (textRef.current as any).clear()

    navigate('s1')
}
