import React from 'react'

import {
    Text,
    View
} from 'react-native'
import RadioButton from './RadioButton'

export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props)
        this.props = props

        this.defaultKey = null
        let settings = null

        if (Array.isArray(props.data)) {
            settings = props.data
            this.defaultKey = props.default
        } else {
            let bool = false
            for (const i in props.data) {
                if (Array.isArray(props.data[props.ratio])) {
                    this.defaultKey = props.default
                    settings = props.data[props.ratio]
                    break
                }
                if (props.data[i] === props.default) {
                    this.defaultKey = i
                    bool = true
                    break
                }
            }
            settings = bool ? Object.keys(props.data) : settings
        }

        this.state = {
            settings: settings,
            pressed: {}
        }
    }

    changeState(key) {
        const pressed = {}

        this.props.setSettings(this.props.groupname, key)

        for (const i in this.state.settings) {
            pressed[this.state.settings[i]] = (this.state.settings[i] === key)
        }

        this.setState({ pressed: pressed })
    }

    componentDidMount() {
        this.changeState(this.defaultKey)
    }

    render() {
        return (
            <View style={{
                flexDirection: this.props.direction
            }}>
                <Text style={{
                    fontSize: 32,
                    color: '#FFFFFF',
                    borderBottomColor: '#FFFFFF',
                    borderBottomWidth: 1
                }}>{this.props.groupname}</Text>
                {this.state.settings
                    ? this.state.settings.map(el => {
                        return (
                            <RadioButton
                                title={el}
                                selected={this.state.pressed[el]}
                                key={el}
                                id={el}
                                changestate={this.changeState.bind(this)}
                            />
                        )
                    })
                    : null
                }
            </View>
        )
    }
}
