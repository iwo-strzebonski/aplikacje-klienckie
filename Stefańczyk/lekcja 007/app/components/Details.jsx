import React from 'react'
import { FlatList, Text } from 'react-native'
import ListItem from './ListItem'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <FlatList
                data={
                    [
                        { key: 'a', id: 1 },
                        { key: 'b', id: 2 },
                        { key: 'c', id: 3 },
                    ]
                }
                renderItem={
                    ({ item }) => <ListItem uid={item.key} />
                }
                keyExtractor={
                    item => item.id.toString()
                }
        />
        )
    }
}
