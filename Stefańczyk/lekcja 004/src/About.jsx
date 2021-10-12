import React from 'react'

class About extends React.Component {
    onClick(e) {
        alert(e.target.tagName)
    }

    render() {
        return (
            <h1>About</h1> 
        )
    }
}

export default About
