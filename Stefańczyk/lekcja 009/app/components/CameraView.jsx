import React from 'react'
import {
    ToastAndroid,
    View,
    Text,
    BackHandler
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { Camera } from 'expo-camera'

import CircleButton from './CircleButton'
import CameraSettings from './CameraSettings'

export default class CameraView extends React.Component {
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            isHidden: true,
            cameraSetting: {
                ratio: null,
                whiteBalance: 0,
                pictureSize: null,
                flashMode: 3
            }
        }
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync()
        this.setState({
            hasCameraPermission: status == 'granted'
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    async componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }

    async rotateCamera() {
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

    handleBackPress = () => {
        if (this.state.isHidden) {
            this.props.navigation.goBack()
        } else {
            this.toggleSettings()
        }

        return true
    }

    toggleSettings() {
        this.setState({ isHidden: !this.state.isHidden })
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
                    whiteBalance={this.state.whiteBalance}
                    flashMode={this.state.flashMode}
                    ref={ref => {
                        this.camera = ref
                        }}
                    style={{ flex: 1 }}
                    type={this.state.type}
                >
                    <CameraSettings ishidden={this.state.isHidden} />
                    <View style={{
                        position: 'absolute',
                        bottom: 16,
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        zIndex: -1
                    }}>
                        <CircleButton
                            size={64}
                            text='↺'
                            onpress={this.rotateCamera.bind(this)}
                        />
                        <CircleButton
                            size={128}
                            text='⬤'
                            onpress={this.takePhoto.bind(this)}
                        />
                        <CircleButton
                            size={64}
                            text='⚙'
                            onpress={this.toggleSettings.bind(this)}
                        />
                    </View>
                </Camera>
            )
        }
    }
}
