import React, { Component } from 'react'
// import * as classes from './UserDetails.module.css'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from 'axios'
// import postback from '../../assets/postback.png'
export class Checkout extends Component {

    state={
        price:null,
        shareForm:{
          
            firstName:{
                elementType: "input",
                elementConfig:{
                    type:'text',
                    placeholder:"Enter your First Name"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            lastName:{
                elementType: "input",
                elementConfig:{
                    type:'text',
                    placeholder:"Enter your Last Name"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            houseNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'House number'
                },
                value: '',
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched: false
            },
            
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Germany', displayValue: 'Germany'},
                        {value: 'Autria', displayValue: 'Austria'},
                        {value: 'Switzerland', displayValue: 'Switzerland'},

                    ]
                },
                value: '',
                validation: {},
                valid: true
            }},
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
            firstName:formData.firstName.value,
            lastName:formData.lastName.value,
           address:{
                    street:formData.street.value,
                    houseNumber:formData.houseNumber.value,
                    postalCode:formData.postalCode.value,
           },
            country:formData.contry.value
        }

        axios.post(`link here`,post)
            .then(response =>{
                this.setState({loading:false})
                // this.props.history.push('/')
            })
            .catch(error=>{
                this.setState({loading:false})
            });

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
                
           
            </div>
        )
    }
}

export default Checkout
