const OUTFITS = ['default', 'joker', 'tiger'];

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
    OUTFITS.forEach(outfit => {
        imageLoaders.push(loadImage(`img/mooshi-body-${outfit}.png`));
        imageLoaders.push(loadImage(`img/mooshi-head-${outfit}.png`));
    });
    
    await Promise.all(imageLoaders);
    console.log('All images loaded!');
    
    // Setup image elements
    const bodyImg = document.getElementById('mooshi-body');
    const headImg = document.getElementById('mooshi-head');
    const collarImg = document.getElementById('mooshi-collar');
    let bodyIndex = 0; 
    let headIndex = 0;

    function updateImages() {
        bodyImg.src = `img/mooshi-body-${OUTFITS[bodyIndex]}.png`;
        headImg.src = `img/mooshi-head-${OUTFITS[headIndex]}.png`;
    }

    // Setup buttons
    const nextBody = document.getElementById('btn-next-body');
    nextBody.onclick = () => {
        bodyIndex = mod(bodyIndex + 1, OUTFITS.length);
        updateImages();
    }

    const prevBody = document.getElementById('btn-prev-body');
    prevBody.onclick = () => {
        bodyIndex = mod(bodyIndex - 1, OUTFITS.length);
        updateImages();
    }

    const nextHead = document.getElementById('btn-next-head');
    nextHead.onclick = () => {
        headIndex = mod(headIndex + 1, OUTFITS.length);
        updateImages();
    }

    const prevHead = document.getElementById('btn-prev-head');
    prevHead.onclick = () => {
        headIndex = mod(headIndex - 1, OUTFITS.length);
        updateImages();
    }

    
    // Setup download button
    const downloadBtn = document.getElementById('btn-download');
    downloadBtn.onclick = () => {
        console.log('Downloading image!');
        const canvas = document.getElementById('secret-canvas');
        const context = canvas.getContext('2d');
        context.drawImage(bodyImg, 0, 0, 1500, 1500);
        context.drawImage(headImg, 0, 0, 1500, 1500);
        context.drawImage(collarImg, 0, 0, 1500, 1500);

        // Create link to image
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = "Mooshi.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

}

window.onload = main;