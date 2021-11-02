import React from 'react'
import { ToastAndroid } from 'react-native'

export default class Camera extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    componentDidMount() {
        ToastAndroid.showWithGravity(
            'test kamery',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }

    render() {
        return (
            < ></>
        )
    }
}
