import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Product2 from './Product2'
import './App.css'

class App06 extends React.Component {
    render() {
        return (
            <Router>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/products'>Products</Link>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/products' component={Product2} />
                </Switch>
            </Router>
        )
    }
}

export default App06
