import React, { Component } from 'react'
import classes from './NavigationItems.module.css'
import {NavLink} from 'react-router-dom'
export class NavigationItems extends Component {
    render() {
        return (
            <li className={classes.NavigationItem}>
        <NavLink 
            to={this.props.link}
            exact={this.props.exact}
            activeClassName={classes.active}>{this.props.children}</NavLink>
            {/* <div className={classes.active}>{this.props.children}</div> */}
    </li>
        )
    }
}

export default NavigationItems
