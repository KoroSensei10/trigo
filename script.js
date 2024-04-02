console.log('Hello, World!');

// Get the canvas element
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

console.log(canvas);

// Set the center point coordinates
const centerX = canvas.width / 8;
const centerY = canvas.height / 8;

let sinWavePath = [];
let cosWavePath = [];

// Set the radius and initial angle
const radius = 100;
let time = 0;

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const {x, y} = drawPoint();
    drawSinWave(x, y);
    drawCosWave(x, y);

    drawWaves();

    time -= 0.1; // échantillonage du temps en gros
    // Request the next animation frame
    requestAnimationFrame(draw);
}

function drawSinWave(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(300, y);

    sinWavePath.unshift({x: 300, y});

    if (sinWavePath.length > 500) {
        sinWavePath.pop();
    }

    ctx.strokeStyle = 'green';
    ctx.stroke();
}

function drawCosWave(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, 300);

    cosWavePath.unshift({x, y: 300});

    if (cosWavePath.length > 500) {
        cosWavePath.pop();
    }

    ctx.strokeStyle = 'purple';
    ctx.stroke();
}

function drawWaves() {
    ctx.beginPath();
    ctx.moveTo(sinWavePath[0].x, sinWavePath[0].y);
    sinWavePath.forEach((point, i) => {
        ctx.lineTo(point.x + i, point.y);
    });

    ctx.strokeStyle = 'green';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cosWavePath[0].x, cosWavePath[0].y);
    cosWavePath.forEach((point, i) => {
        ctx.lineTo(point.x, point.y + i);
    });

    ctx.strokeStyle = 'purple';
    ctx.stroke();
}

// Function to draw the rotating point
function drawPoint() {
    // Calculate the position of the point
    const x = centerX + radius * Math.cos(time);
    const y = centerY + radius * Math.sin(time);

    // center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();

    // Draw the line from the center to the point
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Draw the point
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    return {x, y};
}

// Start the animation
draw();