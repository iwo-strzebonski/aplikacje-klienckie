import React from 'react'
import {
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native'

export default class ListItem extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        if (this.props.selected) {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        borderRadius: 4
                    }}
                >
                    <Image
                        style={{
                            width: this.props.data.width,
                            height: this.props.data.height,
                        }}
                        source={{ uri: this.props.data.uri }}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            width: this.props.data.width,
                            height: this.props.data.height,
                        }}
                        onPress={() => this.props.unselect(this.props.data.id)}
                    >
                        <Text style={{
                            fontSize: 60,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>+</Text>
                    </TouchableOpacity>
                    <Text>{this.props.data.id}</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        borderRadius: 4
                    }}
                    onPress={() => this.props.navigation.navigate('s4',
                        {data: this.props.data, refresh: this.props.refresh},
                    )}
                    onLongPress={() => this.props.select(this.props.data.id)}
                >
                    <Image
                        style={{
                            width: this.props.data.width,
                            height: this.props.data.height
                        }}
                        source={{ uri: this.props.data.uri }}
                    />
                    <Text>{this.props.data.id}</Text>
                </TouchableOpacity>
            )
        }
    }
}
