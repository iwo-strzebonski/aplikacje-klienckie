/* eslint-disable require-jsdoc */
import * as SecureStore from 'expo-secure-store'

export default async function createCategory(navigate: any, category: string) {
    if (!category) return

    const store = await SecureStore.getItemAsync('categories')
    let categories: string[] = []

    if (store !== null) {
        categories = JSON.parse(store)
    }

    categories.push(category)

    await SecureStore.setItemAsync(
        'categories', JSON.stringify(categories)
    )
    navigate('s1')
}
