import React, { Component } from 'react'
import * as classes from './Login.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
// import postback from '../../assets/postback.png'
import Changemail from './ChangeEmail/ChangeEmail'
import Changepass from './ChangePassword/ChangePassword'
import axios from 'axios'
export class Checkout extends Component {

    state={
            logindetails:{
                email:"user@xyz.com",    //make it null if databse link is updated
                password:"user123",         //make it null if databse link is updated
            },
            edit:null,
            loading:true,
            
        }

        componentDidMount(){
            axios.get('link')    //put the link of the login details of user
            .then(resp=>{
         
            let details=resp.data

            this.setState({
                loading:false,
                logindetails:details
            })
       
            })
            .catch(err=>{
                this.setState({
                    loading:false
                })
            })
            
        }    

    emailClickHandler=()=>{
        this.setState({
            edit:"email"
        })
    }

    passwordClickHandler=()=>{
        this.setState({
            edit:"pass"
        })
    }

    backHandler=()=>{
        this.setState({
            edit:null
        })
    }


    render() {

      let update=null ;


        if(this.state.edit=="email")
        {
            update=<Changemail backHandle={this.backHandler}></Changemail>
        }
        if(this.state.edit=="pass"){
            update=<Changepass backHandle={this.backHandler}></Changepass>
        }

        let dots = "*";
        let hide = dots;
        for(let i=0;i<this.state.logindetails.password.length-1; i++)
        {
          // you can also use substr instead of substring
          hide=hide+dots;
        }

      let form=null
      
      if(this.state.edit==null)
      {
      form=(
           <div>
               <div className={classes.frame}>
                  <p> <b>Email:</b> {this.state.logindetails.email}</p>
                   <button className={classes.button} onClick={this.emailClickHandler} >Edit</button>
               </div>
               <div className={classes.frame}>
                  <p className={classes.elmt}> <b>password: {hide}</b></p>
                   <button className={classes.button}  onClick={this.passwordClickHandler}>Edit</button>
               </div>
           </div>
       )
      }
        if(this.state.edit != null){
            form=update
        }
        let fetchedData= this.state.loading ? <Spinner></Spinner> :null;

        return (
          
            <div>   
            {fetchedData} 
            {form}
                   
            </div>
        )
    }
}

export default Checkout
