import React, { Component } from 'react'
import Header from '../../components/UI/header/Header'
import classes from './Layout.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'

import Backdrop from '../../components/UI/Backdrop/Backdrop'
// import sideDrawer from '../../components/SideDrawer/SideDrawer'
export class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }


    render() {

        let dropper;
        if(this.state.showSideDrawer){
            dropper=(
            <div className={classes.cover}>
            <Backdrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler}></Backdrop>
            <div className={classes.open}>
                <p Style={{float:"right",fontSize:"50px",fontWeight:"500px"}}>ENERGIE</p>
                <Sidebar></Sidebar>
                
            </div>
            </div>)
        }

        return (
            <div className={classes.back}>
                <Header drawerToggleClicked={this.sideDrawerToggleHandler}></Header>
                <div className={classes.side}>
                <Sidebar></Sidebar>
                </div>
               
                {dropper}

                <main className={classes.back}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout
