import React, { Component } from 'react'
import classes from './UsedDetails.module.css'
import Aux from '../hoc/Auxilary/Auxilary'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios'
import Editdetails from './editDetails/editDetails'
export class UserDetails extends Component {

    state={
        userdetails:{
            firstName:"john",
            lastName:"Legend",
            address:{
                street:"dalal",
                houseNumber:"123",
                postelCode:580020
            },
            country:"Germany"
        },
        // userdetails:null,                               //once the the database is connected
        update:false,
        loading:true
    }

    componentDidMount(){

         axios.get(`link.json`)                     //put the database link here
            .then(resp=>{
                let fetchedData=resp.data;
              
            
            this.setState({
                loading:false,
                userDetails:fetchedData,
            })
             
            })
            .catch(err=>{
                this.setState({
                    loading:false
                })
            })
        
    }

    updateHandler=()=>{
        this.setState({
            update:true
        })
    }

    backHandler=()=>{
        this.setState({
            update:false

        })
    }


    render() {

        let content=null
        let fetchedData= this.state.loading ? <Spinner></Spinner> :null;
        if(this.state.update==false)
        {
            content=(
                <div>
                <div className={classes.frame}>
                <p><b>First Name:</b> {this.state.userdetails.firstName} </p>
                <p><b>Last Name:</b> {this.state.userdetails.lastName} </p>
                <p><b>Address:</b> 
                    <ul>
                    <li> <b>Street:</b> {this.state.userdetails.address.street} </li>
                    <li> <b>House No.:</b> {this.state.userdetails.address.houseNumber} </li>
                    <li> <b>Postal Code:</b> {this.state.userdetails.address.postelCode} </li>
                    </ul>
                </p>
                <p><b>Country:</b> {this.state.userdetails.country}</p>
                </div>
                <button className={classes.button}  onClick={this.updateHandler}>Edit</button>
               
            </div>
            )
        }

        if(this.state.update===true)
        {
            content=(
                <Editdetails  backHandle={this.backHandler}></Editdetails>
            )
        }
        return (
            <div>
            {fetchedData}
           {content}
           
            </div>
        )
    }
}

export default UserDetails
