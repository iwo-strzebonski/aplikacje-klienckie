import React from 'react'
import {
    Animated,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native'
import RadioGroup from './RadioGroup'

export default class CameraSettings extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            pos: new Animated.Value(Dimensions.get('window').height),
        }

        this.style = StyleSheet.create({
            animatedView: {
                position: 'absolute',
                zIndex: 999,
                bottom: 0,
                left: 0,
                width: 200,
                height: '100%',
                backgroundColor: 'rgba(33, 33, 33, 0.75)',
            }
        })
    }

    async componentDidUpdate() {
        Animated.spring(
            this.state.pos,
            {
                toValue: this.props.ishidden
                    ? Dimensions.get('window').height
                    : 0,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start()
    }

    render() {
        return (
            <Animated.View
                style={[
                    this.style.animatedView,
                    {
                        transform: [
                            { translateY: this.state.pos }
                        ]
                    }
                ]}
            >
                <FlatList
                    data={Object.entries(this.props.settings)}
                    renderItem={({item}) => {
                        return (
                            <RadioGroup
                                groupname={item[0]}
                                data={item[1]}
                                direction='column'
                                default={this.props.default[item[0]]}
                                ratio={this.props.default.Ratio}
                                setSettings={this.props.setSettings}
                            />
                        )
                    }}
                    keyExtractor={item => item[0]}
                />
            </Animated.View>
        )
    }
}
