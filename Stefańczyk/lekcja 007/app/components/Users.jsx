import React from 'react'
import { FlatList } from 'react-native'
import ListItem from './ListItem'
import { Settings } from './Settings'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {data: []}
    }

    getUsers() {
        fetch(
            Settings.address + ':' + Settings.port + '/get',
            {method: 'GET'}
        )
            .then(response => response.json())
            .then(data => this.setState({data: data}))
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={
                    ({item}) => <ListItem data={item} navigation={this.props.navigation} getusers={this.getUsers.bind(this)} />
                }
                keyExtractor={
                    item => item.user
                }
            />
        )
    }
}
