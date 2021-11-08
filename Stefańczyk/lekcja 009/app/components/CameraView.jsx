import React from 'react'
import {
    ToastAndroid,
    View,
    Text
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { Camera } from 'expo-camera'

import CircleButton from './CircleButton'

export default class CameraView extends React.Component {
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        }
        console.log(this.props.route.params)
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync()
        this.setState({
            hasCameraPermission: status == 'granted'
        })
    }

    async rotateCamera() {
        console.log('a')
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        })
    }

    async takePhoto() {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync()
            await MediaLibrary.createAssetAsync(foto.uri)
            this.props.route.params()
            ToastAndroid.showWithGravity(
                'Photo has been taken',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    render() {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>Permissions denied</Text>
        } else {
            return (
                <Camera
                    ref={ref => {
                        this.camera = ref
                        }}
                    style={{ flex: 1 }}
                    type={this.state.type}>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row-reverse',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                        <CircleButton
                            size={128}
                            text='⬤'
                            onpress={this.takePhoto.bind(this)}
                        />
                        <CircleButton
                            size={64}
                            text='↺'
                            onpress={this.rotateCamera.bind(this)}
                        />
                    </View>
                </Camera>
            )
        }
    }
}
