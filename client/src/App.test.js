import React, {useEffect} from 'react';
import App from './App';
import Hero from './Hero';
import Login from './Login';
import {configure, shallow, mount} from 'enzyme';

describe('App component tests', ()=> {
    let handleLogout;
      
    it("renders without crashing", () => {
        shallow(<App />);
    });

    test('should handle login and hero', () => {
        mount(<Hero handleLogout = {handleLogout}/>);
        mount(<Login/>);
    });

    
});