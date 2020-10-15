import React, { Component } from 'react'

import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from 'axios'
export class Changepassword extends Component {

    state={
        price:null,
        shareForm:{
          
            Email:{
                elementType: "input",
                elementConfig:{
                    type:'text',
                    placeholder:"Enter email"
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            Password:{
                elementType: "input",
                elementConfig:{
                    type:'password',
                    placeholder:"Enter new Password"
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 8,
                    maxLength: 12,
                },
                valid:false,
                touched:false
            },
            Repassword:{
                elementType: "input",
                elementConfig:{
                    type:'password',
                    placeholder:"Re-enter new password"
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
            password:formData.Password.value
            }
        }
        if(formData.Password.value===formData.repassword.value){
        axios.post(`link here`,post)
            .then(response =>{
                this.setState({loading:false})
                // this.props.history.push('/')
            })
            .catch(error=>{
                this.setState({loading:false})
            });
        //  {this.props.backHandle}   
        }
        else{
            alert("Passwords dont match")
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

            <div>   
                {fetchedData}
             {form}
                
             {/* </div> */}
           
            </div>
        )
    }
}

export default Changepassword
