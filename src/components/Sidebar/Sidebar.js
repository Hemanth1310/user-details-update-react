import React, { Component } from 'react'
import classes from './Sidebar.module.css'
export class Sidebar extends Component {
    render() {
        return (
            <div className={classes.side}> 
                <p>Home</p>
                <p>My Account</p>
                <p>My Company</p>
                <p>My Settings</p>
                <p>News</p>
                <p>Analytics</p>
            </div>
        )
    }
}

export default Sidebar
