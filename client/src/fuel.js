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

    const clearErrors = () => {
        setGallonError('');
        setDateError('');
    }

    var userAddy;
    const {
        userID
    } = props;

    var [values, setValues] = useState(initialFieldValues)
    const [errorMessage, setErrorMessage] = useState('')
    
    useEffect(() => {
        try {
            if (props.currentId == '')
                setValues({ ...initialFieldValues })
            else{
                setValues({
                    ...props.fuelObjects[props.currentId]
                });
            }
        } catch(error) {}
    }, [props.currentId, props.fuelObjects, props.initialFieldValues])
    
    const addyRef = fire.database().ref('Users/'+userID);
    try {
        addyRef.on('value', function(snapshot){
            if(snapshot.hasChild('Info')){
                userAddy = (Object.values(snapshot.child('Info').val())[0]);
            }
        })
    } catch {}

    const handleInputChange = e => {
        var { name, value} = e.target;
        
        setValues({
            ...values,
            [name]: value,
            //pseudo suggested price calculator
            suggested_price: (parseInt(values.gallon_requested))*1.50,
            total_due: (((parseInt(values.gallon_requested))*1.50)*1.10).toFixed(2),
            delivery_address:  userAddy
        })

    }

    //validation for fuel form 
    function handleValidation (values) {
       
        //let fields caused an issue with refreshing and not inputting data
       //let fields = this.values.fields;
        let errors = {};
        let formIsValid = true;

        //date
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
    
    const handleFormSubmit = e => {
        if (e)
            e.preventDefault()
        if(handleValidation(values)){
         props.gasFormEdit(values);
        }
        try {
            expect(() =>{ handleValidation(fakeUser); }).toThrow(Error);
        }catch{}
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
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
                <div className="savebtn">
                <input type="submit" value= "Save" className="btn btn-primary btn-block" />
                </div>
                </div>
                </div>
            </section>
        </form>
    );
}

export default FuelForm;
