import '../css/style.css';
import '../css/foobar.css';

import myImage from '../img/not-found.png';

import Data from '../data/data.xml';

import './111';
import './222';

import printMe from './print.js';

function component() {
    let ele = document.createElement('DIV');

    let img = new Image();
    img.src = myImage;
    img.width = 200;

    ele.appendChild(img);

    return ele;
}

document.body.appendChild(component());

console.log(Data);

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}