class Boards extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            color: props.data[0].color,
            chars: props.chars
        }
    }

    onFieldClick(id) {
        let i = id.split('-')

        let state = this.state.chars
        state[i[0]][i[1]][i[2]] = !(state[i[0]][i[1]][i[2]])

        this.setState({
            chars: state
        })
    }

    onRadioClick(color) {
        console.log(color)
        this.setState({
            color: color
        })
    }

    render() {
        let array = this.props.data.map((el, i) => {
            return (
                <div key={el.id} className='board' style={{borderColor: el.color}}>
                    <div>{el.title}</div>
                    <br />
                    <div>{el.id}</div>
                    <br />
                    <Fields onfieldclick={this.onFieldClick.bind(this)} key={i} color={this.state.color} char={this.state.chars[i]} id={i} />
                    <br />

                    <button>Zapisz</button>
                </div>
            )
        })

        let radios = this.props.data.map((el, i) => {
            return (
                < >
                    <input type='radio' name='color' onClick={this.onRadioClick.bind(this, el.color)} />
                    <label htmlFor={el.color}>{el.color}</label>
                </>
            )
        })

        return (
            < >
            boards
            <br />
            {radios}
            <br />
            {array}
            </>
        )
    }
}

class Fields extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let array = []
        for (let r = 0; r < 5; r++) {
            let row = []
            for (let c = 0; c < 3; c++) {
                row.push(
                    <Field
                    onfieldclick={this.props.onfieldclick}
                    key={this.props.id+'-'+r+'-'+c}
                    id={this.props.id+'-'+r+'-'+c}
                    color={this.props.color}
                    state={this.props.char[r][c]}
                    />
                )
            }
            row.push(<br />)
            array.push(row)
        }

        return array
    }
}

class Field extends React.Component {
    constructor(props) {
        super(props)
    }

    // onElementClick = () => {
    //     this.setState({
    //         pressed: !this.state.pressed
    //     })
    // }

    render() {
        return (
            <div
            className='field'
            // onClick={() => this.onElementClick()}
            onClick={() => this.props.onfieldclick(this.props.id)}
            id={this.props.id}
            style={{backgroundColor: this.props.state ? this.props.color : 'transparent'}}
            >
            </div>
        )
    }
}

class Start extends React.Component {
    constructor(props) {
        super(props)

        this.data = {
            "boards": [
                {
                    "id": 111,
                    "title": "plansza 111",
                    "color": "green"
                },
                {
                    "id": 222,
                    "title": "plansza BBB",
                    "color": "#ff3300"
                },
                {
                    "id": 555,
                    "title": "plansza CCC",
                    "color": "#ff6600"
                },
                {
                    "id": 666,
                    "title": "plansza DDD",
                    "color": "#ff9900"
                },
                {
                    "id": 888,
                    "title": "plansza EEE",
                    "color": "#ffcc00"
                }
            ],
            "chars": [
                [
                    [true, false, true],
                    [true, false, true],
                    [true, true, true],
                    [false, false, true],
                    [false, false, true]
                ],
                [
                    [true, true, true],
                    [false, true, false],
                    [false, true, false],
                    [false, true, false],
                    [true, true, true]
                ],
                [
                    [false, false, false],
                    [false, false, false],
                    [true, true, false],
                    [true, false, true],
                    [true, true, true]
                ],
                [
                    [false, false, true],
                    [false, true, true],
                    [true, false, true],
                    [false, false, true],
                    [false, false, true]
                ],
                [
                    [false, true, false],
                    [false, true, false],
                    [false, true, false],
                    [false, false, false],
                    [false, true, false],
                ]
            ]
        }

        fetch('http://localhost:4000/json')
            .then(response => response.json())
            .then(data => this.data.boards = data['boards'])
    }

    render() {
        return (
            <div className='selected'>
                <div className='boards'>
                    <Boards data={this.data['boards']} chars={this.data['chars']} />
                    
                </div>
                selected
            </div>
        )
    }
}

ReactDOM.render(
    < >
        <h1>Sprawdzian</h1>
        <Start />
    </>,
    document.getElementById('react-app')
)
