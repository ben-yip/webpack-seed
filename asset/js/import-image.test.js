import myImage from '../img/webpack.png';

function component() {
    let ele = document.createElement('DIV');

    let img = new Image();
    img.src = myImage;
    img.width = 200;

    ele.appendChild(img);

    return ele;
}

document.body.appendChild((() => {
    let p = document.createElement('P');
    p.innerText = 'this image is imported in JS';
    return p;
})());
document.body.appendChild(component());