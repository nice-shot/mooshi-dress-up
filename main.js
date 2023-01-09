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

}

window.onload = main;