import React from 'react'
import {
    View,
    Button,
    Image,
    Text,
    Dimensions
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'

export default class Photo extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <View style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: '100%',
                height: '100%'
            }}>
                <Image
                    style={{
                        width: Dimensions.get('window').width - 32,
                        height: Dimensions.get('window').height - 128,
                        borderRadius: 16
                    }}
                    source={{ uri: this.props.route.params.data.uri }}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%'
                }}>
                    <Button
                        title='Share'
                        color='#FFC107'
                        onPress={async() => {
                            const status = await Sharing.isAvailableAsync()

                            if (status) {
                                Sharing.shareAsync(this.props.route.params.data.uri)
                            }
                        }}
                    />
                    <Button
                        title='Delete'
                        color='#FFC107'
                        onPress={async() => {
                            await MediaLibrary.deleteAssetsAsync([this.props.route.params.data.id])
                            await this.props.route.params.refresh()
                            this.props.navigation.goBack()
                        }}
                    />
                </View>
            </View>
        )
    }
}
