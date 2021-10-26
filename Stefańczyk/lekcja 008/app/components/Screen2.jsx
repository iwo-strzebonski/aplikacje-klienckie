import React from 'react'

import {
    View,
    StyleSheet,
    AsyncStorage
} from 'react-native'

import * as Location from 'expo-location'
import MyButton from './MyButton'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        })

        this.state = {
            posList: []
        }
    }
    
    async componentDidMount() {
        // try {
        //     await AsyncStorage.multiRemove(
        //         await AsyncStorage.getAllKeys()
        //     )
        // } catch {
        //     'pass'
        // }

        this.setState({
            posList: await this.getAllData()
        })

        // await AsyncStorage.setItem('key1', 'value1')
    }

    async getPosition() {
        const pos =
            await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            })

        alert(JSON.stringify(pos, null, 4))
        await this.setData(pos)
    }

    async setData(data) {
        console.log(data)
        alert(JSON.stringify(data, null, 4))
        console.log('' + (await AsyncStorage.getAllKeys()).length)

        // await AsyncStorage.setItem(
        //     ,
        //     data
        // )
    }

    async getData() {
        const val = await AsyncStorage.getItem('key1')
        console.log('val :>> ', val);
    }

    async getAllData() {
        const keys = await AsyncStorage.getAllKeys()
        const stores = await AsyncStorage.multiGet(keys)

        const posList = stores.map((result, i, store) => {
            return { key: store[i][0], value: store[i][1] }
        })

        return posList
    }

    render() {
        return (
            <View style={this.style.container}>
                <MyButton
                    title='Pobierz i zapisz pozycję'
                    color='#FFC107'
                    onpress={this.getPosition.bind(this)}
                />
                <MyButton
                    title='Set data'
                    color='#FFC107'
                    onpress={this.setData}
                />
                <MyButton
                    title='Get data'
                    color='#FFC107'
                    onpress={this.getData}
                />
                <MyButton
                    title='Get all data'
                    color='#FFC107'
                    onpress={this.getAllData}
                />
            </View>
        )
    }
}
