import React, {useEffect} from 'react';
import App from './App';
import Hero from './Hero';
import {configure, shallow, mount} from 'enzyme';

describe('App component tests', ()=> {
    let handleLogout;
    let user;
    let email;
    let password;
    let clearInputs;
    let setEmail;
      
    it("renders without crashing", () => {
        shallow(<App />);
    });

    test('should handle login and hero', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
        const wrapper2 = mount(<Hero handleLogout = {handleLogout}/>);
        expect(wrapper2).toMatchSnapshot();
    });

    
});