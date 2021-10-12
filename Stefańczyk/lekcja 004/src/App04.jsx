import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Buttons from './Buttons'
import './App.css'

class App04 extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/:id' component={Buttons} />
                </Switch>
            </Router>
        )
    }
}

export default App04
