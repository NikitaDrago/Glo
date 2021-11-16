import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import Timer from './modules/Timer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import comand from './modules/comand';
import calcValidate from './modules/calcValidate.js'
import calc from './modules/calc';
import sendForm from './modules/sendForm';

Timer('16 November 2021');
toggleMenu();
togglePopup();
tabs();
slider();
comand();
calcValidate();
calc(100);
sendForm();