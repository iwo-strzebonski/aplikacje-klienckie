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
        this.isloaded = false

        this.defaultSettings = {
            Type: Camera.Constants.Type.back,
            PictureSize: '1920x1080',
            Ratio: '16:9',
            WhiteBalance: 0,            // 'auto'
            FlashMode: 3,               // 'auto'
            AutoFocus: false,           // 'off'
            VideoQuality: 1,            // '720p'
        }

        this.state = {
            hasCameraPermission: null,
            settings: 0,
            isHidden: true,
            cameraSettings: this.defaultSettings
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

    rotateCamera() {
        const Type =
            this.state.cameraSettings.Type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back

        this.setSettings('Type', Type)
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

    setSettings(key, value) {
        const cameraSettings = this.state.cameraSettings
        cameraSettings[key] = value

        this.setState({ cameraSettings: cameraSettings })
    }

    async getSettings() {
        const settings = Camera.Constants
        settings.Ratio = await this.camera.getSupportedRatiosAsync()
        settings.PictureSize = {}

        for (const i in settings.Ratio) {
            settings.PictureSize[settings.Ratio[i]] =
                await this.camera.getAvailablePictureSizesAsync(settings.Ratio[i])
        }

        for (const i in settings) {
            if (!settings[i] || Object.keys(settings[i]).length === 0) {
                delete settings[i]
            }
        }

        this.setState({ settings: settings })
    }

    async componentDidUpdate() {
        if (!this.isloaded) {
            let settings = 0
            while (!settings) {
                try {
                    await this.getSettings()
                    this.isloaded = true
                } catch {
                    settings = 0
                }
            }
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
                    type={this.state.cameraSettings.Type}
                    ratio={this.state.cameraSettings.Ratio}
                    whiteBalance={this.state.cameraSettings.WhiteBalance}
                    pictureSize={this.state.cameraSettings.PictureSize}
                    flashMode={this.state.cameraSettings.FlashMode}
                    autoFocus={this.state.cameraSettings.AutoFocus}
                    videoQuality={this.state.cameraSettings.VideoQuality}
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={{ flex: 1 }}
                >
                    <CameraSettings
                        ishidden={this.state.isHidden}
                        setSettings={this.setSettings.bind(this)}
                        settings={this.state.settings}
                        default={this.defaultSettings}
                    />
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
