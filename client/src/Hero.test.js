import React, {useEffect} from 'react';
import fire from "./fire";
import {shallow, mount} from 'enzyme';
import Hero from './Hero';

describe('Profile component tests', ()=> {
    let handleLogout;
    let goBack;
    
    const wrapper = shallow(<Hero />);

    it("renders without crashing", () => {
        shallow(<Hero />);
    });

    it ("contains Welcome message", () => {
        expect(wrapper.find('h2').contains('Welcome,')).toBe(true);
    });

    test('should handle logout and go back', () => {

        const wrapper = shallow(<Hero onClick={handleLogout} />);
        wrapper.find('Button').at(1).simulate('submit');
        
        const wrapper2 = shallow(<Hero onClick={goBack} />);
        wrapper2.find('Button').at(1).simulate('submit');

    })

});