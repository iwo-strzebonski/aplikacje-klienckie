import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native'

import Item from './components/Item'

export default class App extends React.Component {
    constructor() {
        super()

        this.styles = StyleSheet.create({
            container: {
                flex: 1
            },
            rowContainer: {
                flexDirection: 'row',
                flex: 3,
                width: '100%'
            },
            mathContainer: {
                backgroundColor: '#47ffcb',
                flex: 2,
                alignItems: 'flex-end'
            },
            row: {
                backgroundColor: '#434343',
                flexDirection: 'column',
                flex: 1
            },
            rowSyntax: {
                backgroundColor: '#636363',
                flexDirection: 'column',
                flex: 1
            },
            expression: {
                fontSize: 96,
                color: '#434343',
                alignItems: 'flex-end'
            },
            result: {
                fontSize: 48,
                color: '#434343',
                alignItems: 'flex-end'
            }
        })

        this.chars = [
            ['1', '4', '7', '.'],
            ['2', '5', '8', '0'],
            ['3', '6', '9', '='],
            ['C', '/', '*', '-', '+']
        ]

        this.state = {
            exp: '',
            res: undefined
        }
    }

    updateExp(char) {
        let exp = this.state.exp
        let res
        const lastChar = exp[exp.length - 1]

        switch (char) {
        case '=':
            try { res = eval(exp) } catch { res = undefined }
            this.setState({
                res: res
            })

            break

        case '+':
        case '-':
        case '*':
        case '/':
            exp = (this.chars[3].includes(lastChar)
                ? exp.slice(0, -1)
                : exp) + char
            break
        
        case 'C':
            exp = exp.slice(0, -1)
            break
        
        default:
            exp += char
            break
        }

        this.setState({
            exp: exp
        })
    }

    render() {
        const t = this
        const arr = []

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
            arr.push(
                <View key={i} style={
                    i < 3 ? this.styles.row : this.styles.rowSyntax
                }>
                    {temp}
                </View>
            )
        }

        return (
            <View style={this.styles.container}>
                <View style={this.styles.mathContainer}>
                    <Item
                        color='#47ffcb'
                        text={this.state.exp}
                        height='60%'
                        style={this.styles.expression}
                    />
                    <Item
                        color='#47ffcb'
                        text={this.state.res}
                        height='40%'
                        style={this.styles.result}
                    />
                </View>
                <View style={this.styles.rowContainer}>
                    {arr}
                </View>
            </View>
        )
    }
}
