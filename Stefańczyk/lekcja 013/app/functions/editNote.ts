/* eslint-disable require-jsdoc */
import * as SecureStore from 'expo-secure-store'

export default async function editNote(
    props: any,
    title: string,
    text: string,
    category: string
) {
    if (!(title && text && category)) return

    const note = props.route.params.data
    note.title = title
    note.text = text
    note.category = category

    await SecureStore.setItemAsync(note.id, JSON.stringify(note));
    
    props.navigation.navigate('s1', { edited: true })
}
