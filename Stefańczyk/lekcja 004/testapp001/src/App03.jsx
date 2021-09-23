import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Child from './Child'
import './App.css'

class App03 extends React.Component {
    render() {
        let array = []

        for (let i = 0; i < 50; i++) {
            array.push(<Link to={'/' + i}>param = {i}</Link>)
        }

        return (
            <Router>
                {array}

                <Switch>
                    <Route path='/:id' component={Child} />
                </Switch>

            </Router>
        )
    }
}
export default App03
