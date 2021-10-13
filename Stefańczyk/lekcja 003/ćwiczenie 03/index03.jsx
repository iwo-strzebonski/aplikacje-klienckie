class MyCheckbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    onSelectChange(e) {
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
            
        }
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
        <h1>cw 03: React forms - checkboxes</h1>
        <MyForm />
    </>,
    document.getElementById('react-app')
)
