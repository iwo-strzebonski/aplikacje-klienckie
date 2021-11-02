import React from 'react'
import {
    StyleSheet,
    Button,
    View,
    FlatList,
    Dimensions
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'

import ListItem from './ListItem'

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            images: [],
            columns: 5
        }

        this.style = StyleSheet.create({
            buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }
        })
    }

    async componentDidMount() {
        const { status } = await MediaLibrary.requestPermissionsAsync()

        if (status !== 'granted') {
            alert('Permission error')
        } else {
            await this.setAllPhotos()
        }
    }

    async setAllPhotos() {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        
        obj = obj.assets.map(el => {
            return {
                width: Dimensions.get('window').width / this.state.columns - 16,
                height: this.state.columns === 1
                    ? Dimensions.get('window').height / 8
                    : Dimensions.get('window').width / this.state.columns - 16,
                uri: el.uri,
                id: el.id
            }
        })
        
        this.setState({
            images: obj
        })
    }

    render() {
        return (
            <View>
                <View style={this.style.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.setState({
                                columns: this.state.columns === 1 ? 5 : 1
                            }, () => this.setState({
                                images: this.state.images.map(el => {
                                    return {
                                        width: Dimensions.get('window').width / this.state.columns - 16,
                                        height: this.state.columns === 1
                                            ? Dimensions.get('window').height / 8
                                            : Dimensions.get('window').width / this.state.columns - 16,
                                        uri: el.uri,
                                        id: el.id
                                    }
                                })
                            }))
                        }}
                        title='Grid/List'
                        color='#FFC107'
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('s3')}
                        title='open camera'
                        color='#FFC107'
                    />
                    <Button
                        onPress={() => alert(this.state.columns)}
                        title='Remove selected'
                        color='#FFC107'
                    />
                </View>
                <FlatList
                    key={1}
                    data={this.state.images}
                    renderItem={({item}) => <ListItem data={item} columns={this.state.columns} />}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
            </View>
        )
    }
}
