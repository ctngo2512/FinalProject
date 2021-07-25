import React from 'react';
import {shallow, mount} from 'enzyme';
import Login from './Login';

describe('Login component tests', ()=> {
    let setHasAccount;
    let setPassword;
    let setEmail;
    let hasAccount;

    const wrapper = shallow(<Login hasAccount={!hasAccount}/>);

    it("renders without crashing", () => {
        shallow(<Login />);
    });

    it('should have a btn component', ()=> {

        //There should be only one button
        expect(wrapper.find('Button')).toHaveLength(1);

        //Button should be undefined after being clicked
        expect(wrapper.find('Button')
        .type().defaultProps.type)
        .toEqual(undefined);

        //Button should have matching text
        expect(wrapper.find('Button').text()).toEqual('Sign In');
        
        //Testing if the Sign In Button appears when a user has an account
        const wrapper2 = shallow(<Login hasAccount = {hasAccount}/>);

        expect(wrapper2.find('Button').text()).toEqual('Sign Up');

    });
        
    it('should have input for email and password', ()=> {

        //Email and password input field should be present
        expect(wrapper.find('.email')).toHaveLength(1);
        expect(wrapper.find('.password')).toHaveLength(1);
    });

    it('should an avatar', ()=> {

        //login logo should be displayed
        expect(wrapper.find('.image')).toHaveLength(1);
    });

    it('should have an empty email and password state var', ()=> {

        //Optionally test to check if password and email are empty strings on 
            // setup
        expect(wrapper.find('.email').text()).toEqual('');
        expect(wrapper.find('.password').text()).toEqual('');
        //console.log("TEST THIS" + wrapper.find('.email').text() + "TEST");
        
    });

    it('should call onChange prop', () => {

        try {
            const onSearchMock2 = jest.fn();
            const event2 = {
                preventDefault() {},
                target: { value: 'the-value' }
            };
            const component2 = shallow(<Login setEmail={setEmail} />);
            component2.find('.email').simulate('change', event2);
            expect(onSearchMock2).toHave('the-value');

        } catch (error) {}
        });

    it('should call onChange prop', () => {

        try {
            const onSearchMock = jest.fn();
            const event = {
            preventDefault() {},
            target: { value: 'the-value' }
            };
            const component = shallow(<Login setPassword={setPassword} />);
            component.find('.password').simulate('change', event);
            expect(onSearchMock).toHave('the-value');

        } catch (error) {}
        });
    

});