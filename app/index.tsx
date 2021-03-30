import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

const render = Component => {
    ReactDOM.render(<Component />, document.getElementById('app'));
};

render(App);
