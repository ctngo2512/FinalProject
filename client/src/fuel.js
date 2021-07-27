import React, { useState, useEffect } from 'react';
import fire from './fire';
import validator from 'validator';

//form for company fuel inputs
const FuelForm = (props) => {

    const initialFieldValues = {
        gallon_requested: '',
        delivery_address: '',
        delivery_date: '',
        suggested_price: '',
        total_due: ''
    }
    const fakeUser = {
        gallon_requested: '*',
        delivery_address: '',
        delivery_date: '*',
        suggested_price: '',
        total_due: ''
    }
    const fakeUser2 = {
        gallon_requested: '1',
        delivery_address: '',
        delivery_date: '02/16/1997',
        suggested_price: '',
        total_due: ''
    }

    const [gallonError, setGallonError] = useState('');
    const [dateError, setDateError] = useState('');
    const [toggleQuote, setToggleQuote] = useState(false);
    var [values, setValues] = useState(initialFieldValues);
    const [errorMessage, setErrorMessage] = useState('')
    const [showQuote, setShowQuote] = useState(false);
    //for pricing module
    var stateFee, gallonFee, historyFee, marginPrice;
    var profitFee = 0.1;
    var suggestedPop, totalPop;


    const clearErrors = () => {
        setGallonError('');
        setDateError('');
    }


    var userAddy;
    const {
        userID
    } = props;


    useEffect(() => {
        try {
            if (props.currentId == '')
                setValues({ ...initialFieldValues })
            else{
                setValues({
                    ...props.fuelObjects[props.currentId]
                });
            }
        } catch{}
    }, [props.currentId, props.fuelObjects, props.initialFieldValues])
    

    const addyRef = fire.database().ref('Users/'+userID);
    var userState;

    try {
        addyRef.on('value', function(snapshot){
            if(snapshot.hasChild('Info')){
                userAddy = (Object.values(snapshot.child('Info').val())[0]);
                userState = (Object.values(snapshot.child('Info').val())[4]);

            //---EXTRA PRICING MODULE CALCULATIONS---

                //out of state charges
                if(userState !='TX'){
                    stateFee = 0.04;
                }else{
                    stateFee = 0.02;
                }
            }

            //history discount/fee
            if(snapshot.hasChild('Transactions')){
                historyFee = 0.01;
            }else{
                historyFee = 0.0;
            }
        })
    } catch {}

    if(values.gallon_requested && values.gallon_requested.match(/^[0-9]*$/) && values.gallon_requested!=null){
        if(parseInt(values.gallon_requested)>1000){
            gallonFee = 0.02;
        }else{
            // alert("Test");
            gallonFee = 0.01;
        }
    }
 

    marginPrice = ((stateFee-historyFee+gallonFee+profitFee)*1.50)+1.50;
    //alert(gallonFee);
    const handleInputChange = e => {
        var { name, value} = e.target;
        setToggleQuote(false);

        setValues({
            ...values,
            [name]: value,
            //pseudo suggested price calculator
            suggested_price: marginPrice,
            total_due: ((parseInt(values.gallon_requested))*marginPrice).toFixed(2),
            delivery_address: userAddy
        })
    }
   
    
    //validation for fuel form 
    function handleValidation (values) {
       
        //let fields caused an issue with refreshing and not inputting data
       //let fields = this.values.fields;
        //date
        let errors = {};
        let formIsValid = true;

        if (validator.isDate(values.delivery_date)) {
            if (validator.isBefore(values.delivery_date)) {
                formIsValid = false;
                errors["delivery_date"] = "can't be in the past";
                setDateError("Date cannot be in the past.");
            }
        } 
        else {
            if (values.delivery_date=='' || values.delivery_date==null){
                formIsValid = false;
                errors["delivery_date"] = "Cannot be empty";
                setDateError("Delivery date cannot be empty.");
            }
            else {
                formIsValid = false;
                errors["delivery_date"] = "has to be in form of 00/00/0000";
                setDateError("Delivery date has to be in the form of 00/00/0000.");
            }
        }
        //need to fix
        //gallons requested
        if(values.gallon_requested=='' || values.gallon_requested==null){
           formIsValid = false;
           errors["gallon_requested"] = "Cannot be empty";
           setGallonError("Gallons requested cannot be empty.");
        }else{

        if(!values.gallon_requested.match(/^[0-9]+$/)){
            formIsValid = false;
            errors["gallon_requested"] = "Only numbers";
            setGallonError("Gallons requested can only contain numbers.");
         }  
        }
       return (formIsValid);
    }

    useEffect(() => {
        try {
            expect(() =>{ handleValidation(fakeUser); }).toThrow(Error);
        }catch{}
        try {
            expect(() =>{ handleValidation(fakeUser2); }).toThrow(Error);
        }catch{}
    })

    const checkForm = e => {
        if (e)
            e.preventDefault();
        if(handleValidation(values)){
            setToggleQuote(true);
        }
    }

    const handleFormSubmit = e => {
        if (e)
            e.preventDefault();
        setToggleQuote(false);
        setValues(initialFieldValues);
        if(handleValidation(values)){
            props.gasFormEdit(values);
        }
    }

    return (
        <form autoComplete="off">
            <section className = "contact">
            <div className="contactContainer">
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        </div>
                        </div>
                <div className = 'Name'>
                <input className="form-control" 
                name="gallon_requested" 
                onClick={clearErrors} 
                placeholder="Gallons Requested"
                    value={values.gallon_requested}
                    onChange={handleInputChange}
                />
                </div>
                <p className="errorMsg">{gallonError}</p>
                </div>
                    <div className="form-group input-group">   
                    <div className="input-group-prepend">
                    <div className="input-group-text">
                        </div>
                        </div>
                    <div className = 'Name'>
                    <input type="date" className="form-control" 
                    id="pure-date" 
                    name="delivery_date" 
                    onClick={clearErrors} 
                    onChange={handleInputChange} aria-describedby="date-design-prepend"
                    />
                    </div>
                    <p className="errorMsg">{dateError}</p>
                    </div>
            <div className="form-group">
                    <div className="pricepops">
                    <h5 style={{fontWeight: "bold"}} >{(toggleQuote) ? "Suggested price: "+marginPrice +" per gallon": ''}</h5>
                    <h5 style={{fontWeight: "bold"}} >{(toggleQuote) ? "Total amount: $"+ (marginPrice*values.gallon_requested).toFixed(2) : ''}</h5>
                    </div>
                    <div className="quotebtn">
                    <input type="submit" disabled={!values.gallon_requested || !values.delivery_date} value= "Get Quote" className="btn btn-primary btn-block" onClick={checkForm}/>         
                </div>
                <div className="savebtn">
                <input type="submit" disabled={!values.gallon_requested || !values.delivery_date} value= "Submit" className="btn btn-primary btn-block"  onClick={handleFormSubmit}/>
                </div>
                </div>
                </div>
                
            </section>
        </form>
       
    );
}

export default FuelForm;
