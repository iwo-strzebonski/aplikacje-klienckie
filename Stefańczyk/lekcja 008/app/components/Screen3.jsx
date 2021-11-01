import React from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

import MyActivityIndicator from './MyActivityIndicator'

export default class Screen3 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            markers: this.props.route.params
        }
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 50.0415,
                    longitude: 19.9257,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                onMapReady={() => this.setState({indicator: false})}
            >
                {this.state.markers.map((marker) => (
                    <Marker
                        key={marker.key}
                        coordinate={{
                            latitude: marker.value.coords.latitude,
                            longitude: marker.value.coords.longitude,
                        }}
                        title={marker.key}
                        description={marker.value.coords.timestamp}
                    />
                ))}
            </MapView>
        )
    }
}
