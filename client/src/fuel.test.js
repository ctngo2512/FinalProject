import React from 'react';
import FuelForm from './fuel';
import fire from './fire';
import Hero from './Hero';
import {shallow, mount} from 'enzyme';
import {act, render} from '@testing-library/react';

window.alert = jest.fn();

describe('Fuel page component tests', ()=> {
    window.alert.mockClear();

    let handleFormSubmit;

    it("renders without crashing", () => {
        shallow(<Hero />);
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = shallow(<FuelForm/>);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
          });
    })

    it('Renders user data', () => {
        let fakeUser = {
            gallon_requested: '',
            delivery_address: '',
            delivery_date: '',
            suggested_price: '',
            total_due: ''
        }

        let snapshot = {val: () => fakeUser};
        jest.spyOn(fire, 'database').mockImplementation(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(snapshot))
        }));
    
        act(() => {
            render(<FuelForm/>);
        });
    });
});
