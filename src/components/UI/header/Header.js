import React, { Component } from 'react'
import * as classes from './Header.module.css'
// import Logo from '../../Logo/Logo'
import logo from '../../../assets/menu.png'
export class Header extends Component {
    render() {
        return (
            <div className={classes.frame}>
                DemoApp
                <div className={classes.menu} onClick={this.props.drawerToggleClicked}>
                    {/* <Logo></Logo> */}
                    <img src={logo} alt="menu"></img>
                </div>
            </div>
        )
    }
}

export default Header
