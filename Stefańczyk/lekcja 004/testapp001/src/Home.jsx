import React from 'react'

class Home extends React.Component {
    onClick(e) {
        alert(e.target.tagName)
    }

    render() {
        return (
            <h1>Home</h1> 
        )
    }
}

export default Home
