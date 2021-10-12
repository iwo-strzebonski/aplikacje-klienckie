import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import Divs from './Divs'
import './App.css'

class App05 extends React.Component {
    render() {
        let array = [7, 3, 5, 6, 10, 20, 2, 1, 11]
        let elements = array.map(function(el, i) {
            return <Link key={i} to={'/divs/' + el}>param = {el}</Link>
        })
        return (
            <Router>
                {elements}
                <br />

                <Switch>
                    <Route path='/divs/:id' component={Divs} />
                </Switch>
            </Router>
        )
    }
}

export default App05
