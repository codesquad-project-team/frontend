import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/base.scss';

render(<Root />, document.querySelector('#root'));
