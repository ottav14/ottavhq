import * as PARAMS from './params.js';
import { Star } from './star.js';

const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');
let attract = false;

// Configure canvas
const dpr = window.devicePixelRatio || 1;
canvas.width = PARAMS.windowWidth * dpr;
canvas.height = PARAMS.windowHeight * dpr;
canvas.style.width = PARAMS.windowWidth + 'px';
canvas.style.height = PARAMS.windowHeight + 'px';
ctx.scale(dpr, dpr);

const clearCanvas = () => {
	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
	ctx.fillRect(0, 0, PARAMS.windowWidth, PARAMS.windowHeight);
	ctx.globalCompositeOperation = 'source-over';
}

const starCount = 40;
const stars = [];

for(let i=0; i<starCount; i++) {
	stars.push(new Star());
}

document.addEventListener('mousedown', () => attract = true);
document.addEventListener('mouseup', () => {
	attract = false
	for(const star of stars)
		star.scatter();
});

setInterval(() => {

	clearCanvas();
	for(const star of stars) {
		star.update(attract);
		star.display(ctx);
	}

}, 16);

