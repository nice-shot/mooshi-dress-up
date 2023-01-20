const BODYS = ['default', 'tiger', 'bee', 'doctor', 'angle', 'joker', 'joker2', 'miku', 'noah' ];
const HEADS = ['default', 'tiger', 'bee', 'doctor', 'angle', 'joker', 'joker2', 'miku', 'noah', 'bandana', 'killer', 'yamaka'];
const COLLARS = ['default', 'tiger', 'joker', 'doctor', 'miku', 'noah'];
let gBodyIndex = 0;
let gHeadIndex = 0;

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    })
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

function rollEyeball(event) {
    const eyeL = document.getElementById('eyeL');
    const eyeR = document.getElementById('eyeR');

    x = eyeL.getBoundingClientRect().left + eyeL.clientWidth / 2;
    y = eyeL.getBoundingClientRect().top + eyeL.clientHeight / 2;
    radian = Math.atan2(event.pageX - x, event.pageY - y);
    rotate = radian * (180 / Math.PI) * -1 + 270;

    eyeL.style.transform = "rotate(" + rotate + "deg)";
    eyeR.style.transform = "rotate(" + rotate + "deg)";
}

function updateEyesOpacity() {
    eyeL = document.getElementById('eyesContainer');

    if (HEADS[gHeadIndex] == "killer" || HEADS[gHeadIndex] == "joker" || isTouchDevice() == true) {
        eyeL.style.opacity = 0;
    } else {
        eyeL.style.opacity = 1;
    }
}

async function main() {
    // Load images
    const imageLoaders = [];
    BODYS.forEach(body => {
        imageLoaders.push(loadImage(`img/mooshi-body-${body}.png`));
    });
    HEADS.forEach(head => {
        imageLoaders.push(loadImage(`img/mooshi-head-${head}.png`))
    })
    COLLARS.forEach(collar => {
        imageLoaders.push(loadImage(`img/mooshi-collar-${collar}.png`))
    })

    await Promise.all(imageLoaders);
    console.log('All images loaded!');

    // Setup image elements
    const bodyImg = document.getElementById('mooshi-body');
    const headImg = document.getElementById('mooshi-head');
    const collarImg = document.getElementById('mooshi-collar');

    function updateImages() {
        bodyImg.src = `img/mooshi-body-${BODYS[gBodyIndex]}.png`;
        headImg.src = `img/mooshi-head-${HEADS[gHeadIndex]}.png`;
        let collarName = COLLARS[0]; // Start with default collar
        if (COLLARS.includes(HEADS[gHeadIndex])) {
            collarName = HEADS[gHeadIndex];
        }
        collarImg.src = `img/mooshi-collar-${collarName}.png`;
        updateEyesOpacity();
    }

    // Setup buttons
    const nextBody = document.getElementById('btn-next-body');
    nextBody.onclick = () => {
        gBodyIndex = mod(gBodyIndex + 1, BODYS.length);
        updateImages();
    }

    const prevBody = document.getElementById('btn-prev-body');
    prevBody.onclick = () => {
        gBodyIndex = mod(gBodyIndex - 1, BODYS.length);
        updateImages();
    }

    const nextHead = document.getElementById('btn-next-head');
    nextHead.onclick = () => {
        gHeadIndex = mod(gHeadIndex + 1, HEADS.length);
        updateImages();
    }

    const prevHead = document.getElementById('btn-prev-head');
    prevHead.onclick = () => {
        gHeadIndex = mod(gHeadIndex - 1, HEADS.length);
        updateImages();
    }

    // Eyes stuff
    document.addEventListener("mousemove", rollEyeball);
    updateEyesOpacity();


    // Setup download button
    const downloadBtn = document.getElementById('btn-download');
    downloadBtn.onclick = () => {
        console.log('Downloading image!');
        const canvas = document.getElementById('secret-canvas');
        const context = canvas.getContext('2d');
        context.drawImage(bodyImg, 0, 0, 1500, 1500);
        context.drawImage(collarImg, 0, 0, 1500, 1500);
        context.drawImage(headImg, 0, 0, 1500, 1500);

        // Create link to image
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = "Mooshi.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Add particle click effects
    // document.addEventListener('click', throwBall);
}

window.onload = main;