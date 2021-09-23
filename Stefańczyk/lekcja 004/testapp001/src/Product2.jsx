import React from 'react'
import {
    Route,
    Link,
} from 'react-router-dom'

const Product2 = ({ match }) => (
    <h1>
        {console.log(match)}
        
        <Link to={`${match.url}/a`}>link to page a</Link>
        <Link to={`${match.url}/b`}>link to page b</Link>
        <Link to={`${match.url}/c`}>link to page c</Link>

        <Route path={`${match.url}/:prodId`} component={MyComp} />
    </h1>

)

const MyComp = ({ match }) => (
    <h1>
        {match.params.prodId}
    </h1>
);

export default Product2
