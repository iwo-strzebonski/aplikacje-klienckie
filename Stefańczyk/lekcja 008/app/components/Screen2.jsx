import React from 'react'

import {
    View,
    StyleSheet,
    AsyncStorage,
    FlatList,
    Switch
} from 'react-native'

import MyActivityIndicator from './MyActivityIndicator'
import ListItem from './ListItem'

// import AsyncStorage from '@react-native-community/async-storage'

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
            },
            buttons: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }
        })

        this.state = {
            posList: [],
            mainSwitch: false,
            indicator: false
        }
    }
    
    async componentDidMount() {
        this.setState({
            posList: await this.getAllData()
        })
    }

    callbackIndicator() {
        this.setState({
            indicator: false
        })
    }

    async getPosition() {
        const pos =
            await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
            })

        await this.setData(pos)
    }

    async setData(data) {
        alert(JSON.stringify(data, null, 4))

        this.setState({
            indicator: true
        })

        await AsyncStorage.setItem(
            `pos${this.state.posList.length}`,
            JSON.stringify(data)
        ).then(async() => {
            this.setState({
                posList: await this.getAllData()
            }, async() => this.setState({indicator: false}))
        })
    }

    async getAllData() {
        const keys = await AsyncStorage.getAllKeys()
        const stores = await AsyncStorage.multiGet(keys)

        const posList = stores.map((result, i, store) => {
            return { key: store[i][0], value: JSON.parse(store[i][1]), selected: false }
        })

        return posList
    }

    renderMap() {
        if (this.state.posList.some(el => { return el.selected })) {
            this.setState({
                indicator: true
            })

            this.props.navigation.addListener('focus', () => {
                this.setState({
                    indicator: false
                })
            })

            this.props.navigation.navigate(
                's3', this.state.posList.filter(el => {return el.selected})
            )
        } else {
            alert('Please select at least one location!')
        }
    }

    changeSwitch(id) {
        const tmp = this.state.posList

        for (const i in tmp) {
            if (tmp[i].key === id) {
                tmp[i].selected = !tmp[i].selected
            }
        }

        this.setState({
            posList: tmp,
            mainSwitch: this.state.posList.every(el => {
                return el.selected
            })
        })
    }

    changeMainSwitch() {
        if (!this.state.posList.length) {
            this.setState({mainSwitch: false})
            return
        }

        const tmp = this.state.posList

        for (const i in tmp) {
            tmp[i].selected = !this.state.mainSwitch
        }

        this.setState({
            posList: tmp,
            mainSwitch: !this.state.mainSwitch
        })
    }

    async clearStorage() {
        try {
            await AsyncStorage.multiRemove(
                await AsyncStorage.getAllKeys()
            )
        } catch {
            'pass'
        }

        this.setState({ posList: [], mainSwitch: false })
    }

    render() {
        return (
            <View style={this.style.container}>
                <MyActivityIndicator state={this.state.indicator} />
                <View style={this.style.buttons}>
                    <MyButton
                        title='Save position'
                        color='#FFC107'
                        onpress={this.getPosition.bind(this)}
                    />
                    <MyButton
                        title='View selected locations'
                        color='#FFC107'
                        onpress={this.renderMap.bind(this)}
                    />
                    <MyButton
                        title='Delete all locations'
                        color='#FFC107'
                        onpress={this.clearStorage.bind(this)}
                    />
                </View>
                <Switch value={this.state.mainSwitch} onChange={this.changeMainSwitch.bind(this)} />
                <FlatList
                    data={this.state.posList}
                    renderItem={({item}) => <ListItem id={item.key} data={item} callback={this.changeSwitch.bind(this)} />}
                    keyExtractor={item => item.key}
                />
            </View>
        )
    }
}
