import React, { Component } from 'react'
import classes from './Main.module.css'
import './Main.module.css'
import Login from '../Login/Login'
// import Tabs from '../../components/Tabs/Tabs'
import NavigationItems from './navigationItems/NavigationItems'
import Userdata from '../UserData/UserDetails'
export class Main extends Component {
   
   state={
       tab:1
   }
   
   tabOneClickHAndle=()=>{
       this.setState({
           tab:1
       })
   }

   tabTwoClickHAndle=()=>{
    this.setState({
        tab:2
    })
}
   
    render() {

        const oneClasses = [classes.one];
        
        let accountSettings=null
       

    if (this.state.tab=="1") {
        oneClasses.push(classes.oneClicked);
        accountSettings=(
            <div>
                <Login></Login>
            </div>
        )
    }

    const twoClasses = [classes.two];

    if (this.state.tab=="2") {
        twoClasses.push(classes.twoClicked);
        accountSettings=(
            <div>
                <Userdata></Userdata>
            </div>
        )
    }


        return (
           
            <div className={classes.ContactData}> 

    
                {/* <div className={classes.head}>
               <ul className={classes.NavigationItems}>
               <NavigationItems link='/login' >Login Info</NavigationItems> 
                <NavigationItems link='/user-details' >User Info</NavigationItems>
               </ul>
               </div>
                <br></br> */}

{/* <p style={{font:"AR BARKLEY"}}>Pick One</p> */}

                <div className={classes.head}>
                    <div className={oneClasses.join(' ')} onClick={this.tabOneClickHAndle}>Account Settings</div>
                    <div className={twoClasses.join(' ')} onClick={this.tabTwoClickHAndle}>User Details</div>
                </div>


                <h3>Settings</h3>
               {accountSettings}
            </div>
                
        )
    }
}

export default Main
