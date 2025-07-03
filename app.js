let colors = ["#F45586", "#345798", "#008A7F", "#FFD174"];

document.addEventListener("DOMContentLoaded", function (e) {


    let randColor = colors[Math.floor(Math.random() * colors.length)];

    //document.getElementById("menu").style.backgroundColor = randColor;
    $("#menu").css("background-color", randColor);
    $("#coockiePolicy").css("background-color", randColor);
    $(".titulo").css("color", randColor);

    $(".bilheteLink").css("border", "5px solid" + randColor);
    $(".bilheteLink").css("background-color", randColor);
    $(".fase").css("color", randColor);
    $(".coockie").css("color", randColor);
    $("#metro").css("color", randColor);

    $("#closeCoockie").click(function () {
        $("#coockiePolicy").remove();
    });


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


// Give every .formX its start position + velocity
    function randomOrder(element) {
        const vpWidth  = window.innerWidth;
        const vpHeight = window.innerHeight;

        // Random start position fully _inside_ the viewport
        const x = getRandomInt(0, vpWidth  - element.offsetWidth);
        const y = getRandomInt(0, vpHeight - element.offsetHeight);

        // Random z‑index & velocity (px per frame)
        element.style.zIndex = getRandomInt(0, 13);
        element.dataset.vx   = (Math.random() * 0.5 + 0.1) * (Math.random() < 0.1 ? -1 : 1);
        element.dataset.vy   = (Math.random() * 0.5 + 0.1) * (Math.random() < 0.1 ? -1 : 1);

        // Save position in the dataset so we don’t need getComputedStyle every frame
        element.dataset.x = x;
        element.dataset.y = y;
        element.style.left = x + 'px';
        element.style.top  = y + 'px';

        element.style.animationDirection = Math.random() < 0.5 ? 'normal' : 'reverse';

    }

// Initialise every floating form once the DOM is ready
    const forms = Array.from(document.querySelectorAll('.formX'));
    forms.forEach(randomOrder);

// Animation loop
    function step() {
        const vpWidth  = window.innerWidth;
        const vpHeight = window.innerHeight;

        for (const el of forms) {
            // Current position & velocity
            let x  = parseFloat(el.dataset.x);
            let y  = parseFloat(el.dataset.y);
            const vx = parseFloat(el.dataset.vx);
            const vy = parseFloat(el.dataset.vy);

            // Move
            x += vx;
            y += vy;

            // Toroidal wrapping
            if (x >  vpWidth)           x = -el.offsetWidth;
            else if (x < -el.offsetWidth) x = vpWidth;

            if (y >  vpHeight)          y = -el.offsetHeight;
            else if (y < -el.offsetHeight) y = vpHeight;

            // Persist + paint
            el.dataset.x = x;
            el.dataset.y = y;
            el.style.left = x + 'px';
            el.style.top  = y + 'px';
        }

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);   // kick‑off the loop


//Setup
    var imgs = document.querySelectorAll('.formX');

    imgs.forEach((the_img) => {

        window.addEventListener('load', function () {
            randomOrder(the_img);
        });

    });


    $(".tituloBilhetes").click(function () {
        $(this).children().toggleClass('main');
    });

});

