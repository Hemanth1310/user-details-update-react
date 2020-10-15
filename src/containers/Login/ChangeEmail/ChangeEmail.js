import React, { Component } from 'react'
// import * as classes from './Login.module.css'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from 'axios'
export class Changemail extends Component {

    state={
        price:null,
        shareForm:{
          
            Email:{
                elementType: "input",
                elementConfig:{
                    type:'email',
                    placeholder:"Enter your Email"
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            conformemail:{
                elementType: "input",
                elementConfig:{
                    type:'email',
                    placeholder:"Re-Enter Email"
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: "input",
                elementConfig:{
                    type:'password',
                    placeholder:"Password"
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 8,
                    maxLength: 12,
                },
                valid:false,
                touched:false
            },},
            formIsValid: false,
            loading: false,
    }


    componentDidMount(){
    //     let total;
    //    const query = new URLSearchParams( this.props.location.search );
    //    for ( let param of query.entries() ) {
    //     total=param[1]
    //      }
    //      this.setState({
    //         price:total
    //     }) 

    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.shareForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
       
        
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid ;
        }
        this.setState({shareForm: updatedOrderForm, formIsValid: formIsValid});
    }

    sharingHandler= (event) =>{
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let forElementIdentifier in this.state.shareForm){
            formData[forElementIdentifier]= this.state.shareForm[forElementIdentifier]
        }

        const post={
            logindetails:{
            email:formData.Email.value,
            password:formData.password.value
            }
        }

        if(formData.Email.value=== formData.conformemail.value){
        axios.post(`link here`,post)
            .then(response =>{
                this.setState({loading:false})
                // this.props.history.push('/')
            })
            .catch(error=>{
                this.setState({loading:false})
            });

            // {this.props.backHandle}   
        }
        else{
            alert("Emails dont match")
            this.setState({loading:false})
        }
   

    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.shareForm) {
            formElementsArray.push({
                id: key,
                config: this.state.shareForm[key]
            });
        }
       let form = (
            <form onSubmit={this.sharingHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Update</Button>
                <a style={{color:"blue",cursor:"pointer",padding:"10px"}} onClick={this.props.backHandle}>Back</a>
            </form>
        );

        let fetchedData= this.state.loading ? <Spinner></Spinner> :null;
        
        return (
            // <div className={classes.wel}>
            // <div className={classes.ContactData}>
            //     <h2><u>The Total Amount is : {this.state.price}</u></h2>

            //     {/* <p style={{font:"AR BARKLEY"}}>Pick One</p> */}
            //     <h3>Enter your Card details</h3>
            <div>   
                {fetchedData}
             {form}
                
             {/* </div> */}
           
            </div>
        )
    }
}

export default Changemail
