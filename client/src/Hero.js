import React, { useState, useEffect} from 'react';
import fire from "./fire";
import ContactForm from "./contactForm";
import FuelForm from './fuel';
import {Button} from 'react-bootstrap';

//runs profile page and fuel page
const Hero = (props) => {
    const {
        handleLogout,
        userID
    } = props;

    //functions
    var [currentId, setCurrentId] = useState('');
    var [contactObjects, setContactObjects] = useState({});
    var [fuelObjects, setFuelObjects] = useState({});
    var userAddress = '';
    const [isClient, setIsClient] = useState('');

    //variables to switch between profile page and fuel page
    const [count, setCount] = useState(false);
    const goBack = () => setCount(value => !value);
    //Once components load complete
    useEffect(() => {
        fire.database().ref('Users/'+userID).on('value', snapshot => {
          //  setIsClient(false);
            if (snapshot.val() != null) {
                
                setContactObjects({
                    ...snapshot.val()
                });
            }
        })
    }, [])

    //mapping for the transactions table
    useEffect(() => {
        fire.database().ref('Users/'+userID+'/Transactions').on('value', snapshot => {
            
            if(!snapshot.exists){
                return;
            }
            
            else if (snapshot.val() != null) {
                setIsClient(true);

                setFuelObjects({
                    ...snapshot.val()
                });
            }
        })
    }, [props.userID])

    useEffect(() => {
        const queryRef = fire.database().ref('Users/'+userID);
        const nameRef = queryRef.orderByKey();

        //get address from database
    
        if(isClient){
            nameRef.on('value', function(snapshot){
                userAddress = (Object.values(snapshot.child('Info').val())[0]);
            })
       
        }
    })

    //pushes profile contact info to the firebase database
    const addOrEdit = (...obj) => {
        fire.database().ref('Users/'+userID+'/Info').update(
            ...obj,
            err => {
                if(err)
                    console.log(err)
                else
                    setCurrentId('')
            }
        );
    }

    //addOrEdit for the gasForm
    const gasFormEdit = (...obj) => {
        fire.database().ref('Users/'+userID+'/Transactions').push(
            ...obj,
            err => {
                if(err)
                    console.log(err)
                else
                    setCurrentId(userID)
            }
        );
    }
  
    //alert("GALLON REQUESTED:" + fuelObjects.gallon_requested);
    return (
        <div className="hero">
            {count ? (
                //runs fuel page
            <div className="container"> 
                <nav>
                    <h2>Welcome</h2>
                  
                    <Button className="midButton" onClick = {goBack}>Back</Button>
                    <Button className="logoutButt" //logout button
                    onClick={handleLogout}>Log Out</Button>
                </nav>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4 text-center">Fuel Page</h1>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-5">
                    <FuelForm {...{ currentId, fuelObjects, gasFormEdit, userID}}/>
                    </div>
                    <div className="col-md-7">
                        <table className="table table-borderless table-stripped">
                            <thead className="thead-light">
                                <tr>
                                    <th>Gallons</th>
                                    <th>Delivery Address</th>
                                    <th>Delivery Date</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(fuelObjects).map((key) => (
                                        <tr key={key}>
                                            <td>{fuelObjects[key].gallon_requested}</td>
                                            <td>{fuelObjects[key].delivery_address}</td>
                                            <td>{fuelObjects[key].delivery_date}</td>
                                            <td>{fuelObjects[key].suggested_price}</td>
                                            <td>{fuelObjects[key].total_due}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                ) : (
                    //runs profile page
            <section className="hero">
                <nav>
                    <h2>Welcome,</h2>
                    <Button className="midButton" onClick={() => setCount(!count)}>
                        Fuel Form
                    </Button>
                    <Button     //logout button
                    onClick={handleLogout}>Log Out</Button>
                    
                </nav>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4 text-center">Profile</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <ContactForm            //display ContactForm
                        {...({ currentId, contactObjects, addOrEdit })}></ContactForm>
                    </div>
                    <div className="col-md-7">
                        <table className="table table-borderless table-stripped">
                            <thead className="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Address 2</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zipcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(contactObjects).map((key) => (
                                        <tr key={key}>
                                            <td>{contactObjects[key].name}</td>
                                            <td>{contactObjects[key].address}</td>
                                            <td>{contactObjects[key].address2}</td>
                                            <td>{contactObjects[key].city}</td>
                                            <td>{contactObjects[key].state}</td>
                                            <td>{contactObjects[key].zipcode}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>)}
                )
            </div>) }
export default Hero;
