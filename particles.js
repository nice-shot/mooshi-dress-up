// Mouse clicker effect
function throwBall(e) {
    let pAmount = 10;

    for (let i = 0; i < pAmount; i++) {
        createParticle(e.clientX, e.clientY + window.scrollY, 'url("img/tennis-ball.png")');
    }
}

// Generator function for variables. I wanted to do a better API but got lazy
function createParticle(x, y, img) {
    const particle = document.createElement('particle');
    let width = Math.floor(Math.random() * 30 + 100);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = 0;
    
    document.body.appendChild(particle);
    particle.style.backgroundImage = img;
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([{
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 1,
            width: 0,
            height: 0
        }
    ], {
        duration: Math.random() * 800 + 2000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}

function removeParticle(e) {
    e.srcElement.effect.target.remove();
}