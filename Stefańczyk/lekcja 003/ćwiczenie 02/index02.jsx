class MySelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: {
                num: this.props.num,
                value: props.data[0].name
            }
        }
    }

        this.setState({
            value: {
                num: this.props.num,
                value: e.target.value
            }
        }, () => this.props.handleSelect(this.state.value))
    }

    render() {
        const s = this.props.data.map(function(elem, i) {
            return (
                <option key={i} value={elem.name}>{elem.name}</option>
            )
        })

        return (
            <div className='mySelect'>
                <h3>komponent MySelect</h3>
                <form onChange={this.onSelectChange.bind(this)}>
                    <select>{s}</select>
                </form>
            </div>
        )
    }
}


class MyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [
                { id: 0, name: 'hamlet' },
                { id: 1, name: 'krzyzacy' },
                { id: 2, name: 'lalka' }
            ],
            array2: [
                { id: 0, name: 'Kraków' },
                { id: 1, name: 'Warszawa' },
                { id: 2, name: 'Gdańsk' },
                { id: 3, name: 'Toruń' }
            ],
            data: [],
            toSend: []
        }
    }

    componentDidMount() {
        this.setState({
            toSend: [
                { num: '0', value: this.state.array[0].name },
                { num: '1', value: this.state.array2[0].name }
            ]
        })
    }

    handleSubmit(e) {
        this.setState({
            data: this.state.data.concat(
                this.state.toSend.map(function(el) {
                    return el.value
                })
            )
        }, () => alert(this.state.data))

        e.preventDefault()
    }

    onHandleSelect = (item) => {
        let tmp = this.state.toSend

        tmp.forEach((el, i) => {
            if (el.num === item.num) {
                tmp[i].value = item.value
            }
        })

        this.setState({
            toSend: tmp
        })
    }

    render() {
        return (
            <div className='myForm' onSubmit={this.handleSubmit.bind(this)}>
                <h2>komponent MyForm</h2>
                <MySelect num='0' handleSelect={this.onHandleSelect} data={this.state.array} />
                <MySelect num='1' handleSelect={this.onHandleSelect} data={this.state.array2} />
                <form>
                    <input type='submit' value='send' />
                </form>
                <span>wysłane: <i>{JSON.stringify(this.state.data, null, 1)}</i></span>
            </div>
        )
    }
}

ReactDOM.render(
    < >
        <h1>cw 02: React forms - select</h1>
        <MyForm />
        <MyForm />
    </>,
    document.getElementById('react-app')
)
