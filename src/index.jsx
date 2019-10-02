import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import './stylesheets/base.scss';
import 'bootstrap/dist/css/bootstrap.css';

render(<Root />, document.querySelector('#root'));
