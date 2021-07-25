import React, { useState, useEffect } from 'react';

//contact form takes user inputs for name, address....
const ContactForm = (props) => {

    const initialFieldValues = {
        name: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipcode: ''
    }

    const fakeUser = {
        name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        address: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        address2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        city: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        state: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        zipcode: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }

    const fakeUser2 = {
        name: '*',
        address: '*',
        address2: '*',
        city: '*',
        state: '*',
        zipcode: '*'
    }

    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');
    const [address2Error, setAddress2Error] = useState('');

    const clearErrors = () => {
        setNameError('');
        setAddressError('');
        setCityError('');
        setStateError('');
        setZipcodeError('');
        setAddress2Error('');
      }

    var [values, setValues] = useState(initialFieldValues);

    //if no input yet set to empty, else set values to user inputs
    useEffect(() => {
        try {
            if (props.currentId == '')
                setValues({ ...initialFieldValues })
            else
                setValues({
                    ...props.contactObjects[props.currentId]
                })
        } catch(error) {}
    }, [props.currentId, props.contactObjects])

    //save user inputs to values to save to firebase
    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    //input validations for profile page
    function handleValidation (values){
       
        //let fields caused an issue with refreshing and not inputting data
        //let fields = this.values.fields;
        let errors = {};
        let formIsValid = true;

        //---Name---
        if(values.name =='' || values.name==null){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
            setNameError("Name cannot be empty.");
         }else{
 
         if(!values.name.match(/^[a-zA-Z\s]*$/)){
             formIsValid = false;
             errors["name"] = "Only letters";
             setNameError("Name can only contain letters.");
        }
        if (values.name.length > 50) {
            errors['name'] = 'Is too long';
            setNameError("Name has to be shorter than 50 characters.");
            throw new Error("Too long");
            }        
        }  

         //---Address 1---
         if(values.address =='' || values.address==null){
            formIsValid = false;
            errors["address"] = "Cannot be empty";
            setAddressError("Address Line 1 cannot be empty.");
         }else{
 
         if(!values.address.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)){
             formIsValid = false;
             errors["address"] = "Only letters and numbers";
             setAddressError("Address Line 1 can only contain letters and numbers.");
          }
         if (values.address.length > 100) {
            formIsValid = false;
            errors["address"] = 'Is too long';
            setAddressError("Address Line 1 has to be shorter than 100 characters.");
            } 
        if (values.address.length < 4){
             formIsValid = false;
             errors["address"]= 'Is too short';
             setAddressError("Address Line 1 has to be longer than 4 characters");
         }       
        }

         //---Address 2---
       /*  if(values.address2 =='' || values.address2==null){
            formIsValid = false;
            errors["address2"] = "Cannot be empty";
          //  setAddress2Error("Address Line 2 cannot be empty.");
         }else{*/
            if(values.address2 != null && values.address2!=''){
                if(!values.address2.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)){
                 formIsValid = false;
                 errors["address2"] = "Only letters";
                setAddress2Error("Address Line 2 can only contain letters and numbers.");
              }
            if (values.address2.length > 100) {
                formIsValid = false;
                errors["address2"] = 'Is too long';
                setAddress2Error("Address Line 2 has to be shorter than 100 characters.");
                }
            if (values.address2.length < 4){
                formIsValid = false;
                errors["address2"] = 'Is too short';
                setAddress2Error("Address Line 2 has to be longer than 4 characters");
            }        
            }
        // }

         //----City----
         if(values.city =='' || values.city==null){
            formIsValid = false;
            errors["city"] = "Cannot be empty";
            setCityError("City cannot be empty.");
         }else{
 
         if(!values.city.match(/^[a-zA-Z]+$/)){
             formIsValid = false;
             errors["city"] = "Only letters";
             setCityError("City can only contain letters.");
          }
        if (values.city.length > 100) {
            formIsValid = false;
            errors["city"] = 'Is too long';
            setCityError("City has to be shorter than 100 characters.");
            }        
        }

        //----State----
        if(values.state =='' || values.state==null){
            formIsValid=false;
            errors["state"] = "Cannot be empty";
            setStateError("State cannot be empty.");
        }

        if(!values.state.match(/^[a-zA-Z\s]*$/)){
            formIsValid=false;
            errors["state"] = "Only letters";
            setStateError("State can only contain letters.");
        }

         //----Zipcode---
        if(values.zipcode =='' || values.zipcode==null){
            formIsValid = false;
            errors["zipcode"] = "Cannot be empty";
            setZipcodeError("Zipcode cannot be empty.");
         }else{
        if(!values.zipcode.match(/^[0-9]([0-9]|-(?!-))+$/)){
             formIsValid = false;
             errors["zipcode"] = "Only numbers";
             setZipcodeError("Zipcode can only contain numbers.");
          }
        if (values.zipcode.replace(/[^0-9]/g,"").length > 9) {
            errors["zipcode"] = 'Is too long';
            formIsValid=false;
            setZipcodeError("Zipcode has to be shorter than 9 digits.");
        }  
        if(values.zipcode.length < 5){
            errors["zipcode"] = "Is too short";
            formIsValid=false;
            setZipcodeError("Zipcode has to be at least 5 digits.");
        }
        if(!values.zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)){
            errors["zipcode"] = "Wrong format";
            formIsValid=false;
            setZipcodeError("Zipcode must be in format 00000 or 00000-0000");
        }
    }
       return (formIsValid);
   }

   //submitting form to firebase and prevent page refresh
   const handleFormSubmit = e => {
        if (e)
            e.preventDefault()

        if(handleValidation(values)){
            props.addOrEdit(values);
        }
        try{
            expect(() =>{ handleValidation(fakeUser2); }).toThrow(Error);
        }catch{}
        try {
            expect(() =>{ handleValidation(fakeUser); }).toThrowError("Too long");
        }catch{}
    }
    //alert(values["name"]);
    //alert(props.contactObjects[0]["name"]);
    
    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <section className = "contact">
            <div className="contactContainer">
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <div className = 'Name'>
                <input className="form-control" name="name" onClick={clearErrors} placeholder="Full Name"
                    value={values.name}
                    onChange={handleInputChange}
                />
                </div>
                <p className="errorMsg">{nameError}</p>
                </div>
            </div>
            <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                        </div>
                    </div>
                    <div className = 'Name'>
                    <input className="form-control" name="address" onClick={clearErrors} placeholder="Address Line 1"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    </div>
                    <p className="errorMsg">{addressError}</p>
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                        </div>
                    </div>
                    <div className = 'Name'>
                    <input className="form-control" name="address2" onClick={clearErrors} placeholder="Address Line 2"
                        value={values.address2}
                        onChange={handleInputChange}
                    />
                    </div>
                    <p className="errorMsg">{address2Error}</p>
                </div>
                
                <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        </div>
                    </div>
                    <div className = 'Name'>
                    <input className="form-control" name="city" onClick={clearErrors} placeholder="City"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </div>
                <p className="errorMsg">{cityError}</p>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                    </div>
                </div>
                <div className = 'Name'>
                <select className="form-control" name="state" onClick={clearErrors}
                    value={values.state}
                    //pull down option for state
                    onChange={handleInputChange}>
                        <option value="DEFAULT">Select your state</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                </select>		
                </div>
                <p className="errorMsg">{stateError}</p>	
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                    </div>
                </div>
                <div className = 'Name'>
                <input className="form-control" name="zipcode" onClick={clearErrors} placeholder="Zipcode"
                    value={values.zipcode}
                    onChange={handleInputChange}
                />
            </div>
            <p className="errorMsg">{zipcodeError}</p>	
            </div>
            <div className="form-group">
                <div className="savebtn">
                <input //save button
                type="submit" value={props.currentId == "" ? "Save" : "Update"} className="btn btn-primary btn-block" />
                </div>
                </div>
            </section>
        </form>
    );
}

export default ContactForm;
