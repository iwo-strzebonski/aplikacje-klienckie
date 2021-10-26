import React from 'react'
import { FlatList, View } from 'react-native'
import ListItem from './ListItem'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
    }

    render() {
        return (
            <View></View>
            // <FlatList
            //     data={this.state.data}
            //     renderItem={
            //         ({ item }) => <ListItem data={item} navigation={this.props.navigation} getusers={this.getUsers.bind(this)} />
            //     }
            //     keyExtractor={
            //         item => item.user
            //     }
            // />
        )
    }
}
