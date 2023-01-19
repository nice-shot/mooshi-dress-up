const BODYS = ['default', 'tiger', 'bee' ];
const HEADS = ['default', 'tiger', 'bee', 'joker', 'bandana', 'killer', 'yamaka'];
const COLLARS = ['default', 'tiger', 'joker'];

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
    let bodyIndex = 0; 
    let headIndex = 0;

    function updateImages() {
        bodyImg.src = `img/mooshi-body-${BODYS[bodyIndex]}.png`;
        headImg.src = `img/mooshi-head-${HEADS[headIndex]}.png`;
        let collarName = COLLARS[0]; // Start with default collar
        if (COLLARS.includes(HEADS[headIndex])) {
            collarName = HEADS[headIndex];
        }
        collarImg.src = `img/mooshi-collar-${collarName}.png`;
    }

    // Setup buttons
    const nextBody = document.getElementById('btn-next-body');
    nextBody.onclick = () => {
        bodyIndex = mod(bodyIndex + 1, BODYS.length);
        updateImages();
    }

    const prevBody = document.getElementById('btn-prev-body');
    prevBody.onclick = () => {
        bodyIndex = mod(bodyIndex - 1, BODYS.length);
        updateImages();
    }

    const nextHead = document.getElementById('btn-next-head');
    nextHead.onclick = () => {
        headIndex = mod(headIndex + 1, HEADS.length);
        updateImages();
    }

    const prevHead = document.getElementById('btn-prev-head');
    prevHead.onclick = () => {
        headIndex = mod(headIndex - 1, HEADS.length);
        updateImages();
    }

    
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