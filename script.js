// =====================================
// Cursor Glow
// =====================================

const cursor = document.querySelector(".cursor-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateCursor(){

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();



// =====================================
// Loading Animation
// =====================================
const fill = document.querySelector(".progress-fill");
const percent = document.getElementById("percent");
const loadingScreen = document.querySelector(".loading-screen");

let progress = 0;
const loading = setInterval(() => {
    progress++;
    if (fill) fill.style.width = progress + "%";
    if (percent) percent.textContent = progress + "%";

    if (progress >= 100) {
        clearInterval(loading);
        setTimeout(() => {
            loadingScreen.classList.add("hide");
            setTimeout(() => {
                // FIX: Redirect to the home page
                window.location.href = "home.html";
            }, 600);
        }, 700);
    }
}, 30); 


// =====================================
// Floating Particles
// =====================================

const particleContainer =
document.querySelector(".particles");

for(let i=0;i<80;i++){

    const particle =
    document.createElement("span");

    particle.classList.add("particle");

    particle.style.left =
    Math.random()*100 + "%";

    particle.style.top =
    Math.random()*100 + "%";

    particle.style.animationDuration =
    6 + Math.random()*8 + "s";

    particle.style.animationDelay =
    Math.random()*5 + "s";

    particleContainer.appendChild(particle);

}



// =====================================
// Shape Parallax
// =====================================

const shapes =
document.querySelectorAll(".shape");

document.addEventListener("mousemove",(e)=>{

    const x =
    (e.clientX-window.innerWidth/2)/40;

    const y =
    (e.clientY-window.innerHeight/2)/40;

    shapes.forEach((shape,index)=>{

        const speed =
        (index+1)*0.4;

        shape.style.transform =
        `translate(${x*speed}px,
        ${y*speed}px)`;

    });

});



// =====================================
// Blob Movement
// =====================================

const blobs =
document.querySelectorAll(".blob");

function animateBlobs(){

    blobs.forEach((blob,index)=>{

        const time =
        Date.now()*0.0005;

        const x =
        Math.sin(time+index)*20;

        const y =
        Math.cos(time+index)*20;

        blob.style.transform =
        `translate(${x}px,${y}px)
        scale(${1+Math.sin(time+index)*0.08})`;

    });

    requestAnimationFrame(animateBlobs);

}

animateBlobs();



// =====================================
// Title Tilt
// =====================================

const title =
document.querySelector(".title");

document.addEventListener("mousemove",(e)=>{

    const rotateX =
    (e.clientY/window.innerHeight-.5)*6;

    const rotateY =
    (e.clientX/window.innerWidth-.5)*8;

    title.style.transform =

    `perspective(800px)
    rotateX(${-rotateX}deg)
    rotateY(${rotateY}deg)`;

});


// =====================================
// Random Blob Glow
// =====================================

setInterval(()=>{

    blobs.forEach(blob=>{

        blob.style.filter =

        `blur(${80+Math.random()*20}px)`;

    });

},1200);



// =====================================
// Loading Text Animation
// =====================================

const subtitle =
document.querySelector(".subtitle");

const words=[

"Building something beautiful...",

"Loading creativity...",

"Brewing ideas...",

"Almost ready..."

];

let index=0;

setInterval(()=>{

    index++;

    subtitle.textContent=

    words[index%words.length];

},2500);



// =====================================
// Footer Fade
// =====================================

const footer =
document.querySelector("footer");

let direction=1;

setInterval(()=>{

    let opacity =
    parseFloat(getComputedStyle(footer).opacity);

    opacity += direction*0.05;

    if(opacity>=1){

        direction=-1;

    }

    if(opacity<=0.45){

        direction=1;

    }

    footer.style.opacity=opacity;

},120);



// =====================================
// Console Message 😎
// =====================================

console.log(`
%c
Hey recruiter...

Since you're already snooping around...

I might as well tell you...

This portfolio was built with love,
coffee,
and a questionable sleep schedule.

Have fun exploring ❤️
`,
`
font-size:16px;
font-family:monospace;
color:#ffccd5;
`);

console.log("%cThanks for checking out my portfolio!",
"font-size:18px;color:white;");

