import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Child from './Child'
import './App.css'

class App02 extends React.Component {
    render() {
        return (
            <Router>
                <Link to='/1'>param = 1</Link>
                <Link to='/2'>param = 2</Link>
                <Link to='/3'>param = 3</Link>


                <Switch>
                    <Route path='/:id' component={Child} />
                </Switch>

            </Router>
        )
    }
}
export default App02
