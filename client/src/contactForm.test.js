import React, {useState} from 'react';
import fire from './fire';
import Hero from './Hero';
import ContactForm from './contactForm';
import {shallow, mount} from 'enzyme';
import {act, render} from '@testing-library/react';
import handleValidation from './contactForm';

window.alert = jest.fn();

describe('Contact Form component tests', ()=> {

    window.alert.mockClear();

    it("renders without crashing", () => {
        shallow(<Hero />);
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = shallow(<ContactForm/>);
        expect(wrapper).toMatchSnapshot();
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
          });
    })

    it('Renders user data', () => {
        const fakeUser = {
            name: '*',
            address: '*',
            address2: '*',
            city: '*',
            state: '*',
            zipcode: '*'
        }

        let snapshot = {val: () => fakeUser};
        jest.spyOn(fire, 'database').mockImplementation(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(snapshot))
        }));
    
        act(() => {
            render(<ContactForm/>);
        });

    });
});