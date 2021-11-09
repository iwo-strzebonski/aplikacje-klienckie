import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 4
            }}>
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        borderType: 'solid',
                        borderColor: '#FFC107',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    id={this.props.id}
                >
                    <TouchableOpacity
                        onPress={() => this.props.changestate(this.props.id)}
                        style={{
                            backgroundColor: this.props.selected
                                ? '#FFC107'
                                : 'transparent',
                            borderColor: '#FFC107',
                            borderType: 'solid',
                            borderRadius: 999,
                            width: 24,
                            height: 24
                        }}
                    />
                </View>
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 24,
                    marginLeft: 16
                }}>{this.props.title}</Text>
            </View>
        )
    }
}
