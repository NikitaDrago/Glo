import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import calc from './modules/calc';
import calcValidate from './modules/calcValidate.js'
import comand from './modules/comand';
import Timer from './modules/Timer';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';

Timer('16 November 2021');
toggleMenu();
togglePopup();
tabs();
slider();
comand();
calcValidate();
calc(100);
sendForm();