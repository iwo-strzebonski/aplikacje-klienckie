import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import Item from './components/__Calc-Item'

export default class App extends React.Component {
    constructor() {
        super()

        this.styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'lightgray'
            },
            rowContainer: {
                flexDirection: 'row',
                height: '60%',
                width: '100%'
            },
            row: {
                flexDirection: 'column',
                width: '25%'
            }
        })

        this.arr = []
        this.chars = [
            ['1', '4', '7', '.'],
            ['2', '5', '8', '0'],
            ['3', '6', '9', '='],
            ['C', '/', '*', '-', '+']
        ]

        this.state = {
            exp: '',
            res: ''
        }
    }

    updateExp(char) {
        this.setState({
            exp: this.state.exp + char
        })
    }

    render() {
        console.log(this)
        const t = this

        for (let i in this.chars) {
            let temp = this.chars[i].map(function(el) {
                return (
                    <Item
                        key={el}
                        color={i < 3 ? '#434343' : '#636363'}
                        text={el}
                        height={i < 3 ? '25%' : '20%'}
                        onPress={t.updateExp.bind(t)}
                    />
                )
            })
            this.arr.push(
                <View key={i} style={this.styles.row}>
                    {temp}
                </View>
            )
        }

        return (
            <View style={this.styles.container}>
                <Item
                    color='#47ffcb'
                    text={this.state.exp}
                    height='40%'
                />
                <View style={this.styles.rowContainer}>
                    {this.arr}
                </View>
            </View>
        )
    }
}
