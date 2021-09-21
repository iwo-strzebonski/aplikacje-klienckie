class MyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            status: false
        }
    }

    handleChange(event) {
        this.setState({
            data: event.target.value,
            status: false
        })
    }

    handleSubmit(event) {
        this.setState({
            data: '',
            status: true
        })
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} >
                <h2>formularz</h2>
                <input type="text" value={this.state.data} onChange={this.handleChange.bind(this)} />
                <br />
                <input type="submit" value="send" />
                <br />
                <span>status: <i>{this.state.status ? 'wysłane' : 'niewysłane'}</i></span>
                <br />
                <span>data: <i>{this.state.data}</i></span>
            </form>
        )
    }
}

ReactDOM.render(
    < >
        <h1>cw 01: React forms - simple</h1>
        <MyForm />
    </>,
    document.getElementById('react-app')
)
