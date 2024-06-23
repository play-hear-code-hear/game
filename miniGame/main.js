import './style.css'

const characterElm = document.getElementById('character');

await new Promise((resolve) => {
    document.getElementById('btn-start').addEventListener('click', async () => {
        await document.getElementById('html');
        await document.getElementById('start-screen').remove();
        resolve();
    });
});

await new Promise(function (resolve) {

    const images = ['/image/bg2.png',
        '/image/tile/Tile (1).png',
        '/image/tile/Tile (2).png',
        '/image/tile/Tile (3).png',
        ...Array(10).fill('/image/character/png')
            .flatMap((v, i) => [
                `${v}/Jump__00${i}.png`,
                `${v}/Idle__00${i}.png`,
                `${v}/Run__00${i}.png`
            ])
    ];
    for (const image of images) {
        const img = new Image();
        img.src = image;
        img.addEventListener('load', progress);
    }

    const barElm = document.getElementById('bar');
    const totalImages = images.length;

    function progress() {
        images.pop();
        barElm.style.width = `${100 / totalImages * (totalImages - images.length)}%`
        if (!images.length) {
            setTimeout(() => {
                document.getElementById('overlay').classList.add('hide');
                resolve();
            }, 1000);
        }
    }
});

let i = 0;
let dx = 0;
let dy = 0;
let run = false;
let jump = false;
let tmrId4RUn;
let angle = 0;
let tmr4Jump;
let previousTouch;


setInterval(() => {
    if (jump) {
        characterElm.style.backgroundImage = `url('./image/character/png/Jump__00${i++}.png')`;
        if (i === 10) i = 0;
    } else if (!run) {
        characterElm.style.backgroundImage = `url('./image/character/png/Idle__00${i++}.png')`;
        if (i === 10) i = 0;
    } else {
        characterElm.style.backgroundImage = `url('./image/character/png/Run__00${i++}.png')`;
        if (i === 10) i = 0;
    }
}, 1000 / 30);

const initialFall = setInterval(() => {
    const top = characterElm.offsetTop + (dy++ * .2);
    if ((characterElm.offsetTop + characterElm.offsetHeight) >= (innerHeight - 150)) {
        clearInterval(initialFall);
    }
    characterElm.style.top = `${top}px`;
}, 20);

function doRun(left) {
    if (tmrId4RUn) return;
    run = true;
    if (left) {
        dx = -10;
        characterElm.classList.add('rotate');
    } else {
        dx = 10;
        characterElm.classList.remove('rotate');
    }

    tmrId4RUn = setInterval(() => {
        if (dx === 0) {
            clearInterval(tmrId4RUn);
            tmrId4RUn = undefined;
            run = false;
            i = 0;
            return;
        }
        const left = characterElm.offsetLeft + dx;
        if (left + characterElm.offsetWidth >= innerWidth || left <= 0) {
            if (left <= 0) {
                characterElm.style.left = '0';
            } else {
                characterElm.style.left = `${innerWidth - characterElm.offsetWidth - 1}px`
            }
            dx = 0;
            return;
        }
        characterElm.style.left = `${left}px`;
    }, 20)
}

function doJump() {
    if (tmr4Jump) return;
    i = 0;
    jump = true;
    const initialTop = characterElm.offsetTop;
    tmr4Jump = setInterval(() => {
        const top = initialTop - (Math.sin(toRadians(angle++))) * 150;
        characterElm.style.top = `${top}px`
        if (angle === 181) {
            clearInterval(tmr4Jump);
            tmr4Jump = undefined;
            jump = false;
            angle = 0;
            i = 0;
        }
    }, 1);
}

function toRadians(angle) {
    return angle * Math.PI / 180;
}


addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft' :
            doRun(e.code === 'ArrowLeft');
            break;

        case 'ArrowRight' :
            doRun(e.code === 'ArrowLeft');
            break;

        case 'Space' :
            doJump();
    }
});

addEventListener('keyup', (e) => {
    switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
            dx = 0;
    }
});

const resizeFn = () => {
    characterElm.style.top = `${innerHeight - 128 - characterElm.offsetHeight}px`;
    if (characterElm.offsetLeft < 0) {
        characterElm.style.left = '0';
    } else if (characterElm.offsetLeft >= innerWidth) {
        characterElm.style.left = `${innerWidth - characterElm.offsetWidth - 1}px`
    }
}
characterElm.addEventListener('touchmove', (e) => {
    if (!previousTouch) {
        previousTouch = e.touches.item(0);
        return;
    }
    const currentTouch = e.touches.item(0);
    doRun((currentTouch.clientX - previousTouch.clientX) < 0);
    if (currentTouch.clientY < previousTouch.clientY) doJump();
    previousTouch = currentTouch;
});

characterElm.addEventListener('touchend', (e) => {
    previousTouch = null;
    dx = 0;
});
const btnStartElm = document.getElementById('btn-start');
btnStartElm.addEventListener('mousemove', () => {
    btnStartElm.classList.add('animate__animated animate__heartBeat')
})


////////////////////////////character2/////////////////////////////////

//
// for (let i = 0; i < 5; i++) {
//     const char2Elm = document.createElement('div');
//     char2Elm.style.width = `${50}px`;
//     char2Elm.style.height = `${50}px`;
//     char2Elm.style.borderRadius = '50%';
//     char2Elm.style.backgroundColor = 'red';
//     char2Elm.style.backgroundImage = `url('./character2/Walk1.png')`;
//     char2Elm.style.backgroundSize = 'cover';
//     char2Elm.style.position = 'absolute';
//     document.body.append(char2Elm);
//
//     const left = innerWidth - char2Elm.offsetWidth - 100;
//     char2Elm.style.left = `${left}px`;
//
//     const top = innerHeight - char2Elm.offsetHeight - 150;
//     char2Elm.style.top = `${top}px`;
//
//     let dx = Math.random() * 10;
//
//     setInterval(() => {
//         const left = char2Elm.offsetLeft + dx;
//         if (left + char2Elm.offsetWidth >= innerWidth || left <= 0) {
//             dx = -dx;
//         } else {
//             char2Elm.style.left = `${left}px`;
//         }
//     }, 50);
// }

