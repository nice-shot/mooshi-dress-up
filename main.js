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

// Nothing is consistent in this god damn env. There is not easy way to check if we're mobile.
// Checking for touch isn't enough because of touch laptops and weird Chrome behavior (on PC
// I have 256 touch points !?!?) Every other parameters that supposed to define it is inconsistent
// or experimental and doesn't work everywhere.
// I give up. Here is a copy and paste solution from stack overflow that checks for every
// possible user agent seems to work:
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function isMobileDevice() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
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

    if (HEADS[gHeadIndex] == "killer" || HEADS[gHeadIndex] == "joker" || isMobileDevice() == true) {
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
        context.clearRect(0, 0, 1000, 1000)
        context.drawImage(bodyImg, 0, 0, 1000, 1000);
        context.drawImage(collarImg, 0, 0, 1000, 1000);
        context.drawImage(headImg, 0, 0, 1000, 1000);

        // Create link to image
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = "Mooshi.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Show content after loading
    const page = document.getElementById('page-container');
    const loader = document.getElementById('loader');
    loader.style.display = "none";
    page.style.display = "block";

    // Add particle click effects
    // document.addEventListener('click', throwBall);
}

window.onload = main;