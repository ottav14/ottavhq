import * as PARAMS from './params.js';

const gravity = 0.2;
const maxSpeed = 5;
const starSize = 3;

let mouseX;
let mouseY;

document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});


const getMag = (x, y) => {
	return Math.sqrt(x*x + y*y);
}

export class Star {

	constructor() {
		this.x = Math.floor(Math.random() * PARAMS.windowWidth);
		this.y = Math.floor(Math.random() * PARAMS.windowHeight);
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;

		this.scatter();
	}

	scatter() {
		const theta = Math.random() * 2 * Math.PI;
		this.vx = maxSpeed * Math.cos(theta);
		this.vy = maxSpeed * Math.sin(theta);
	}

	display(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, starSize, 0, Math.PI * 2);
		ctx.fillStyle = '#fff';
		ctx.fill();
	}

	update(attract) {
		if(mouseX && mouseY && attract) {
			const dirX = mouseX - this.x;
			const dirY = mouseY - this.y;
			const mag = getMag(dirX, dirY);

			this.ax = gravity * dirX / mag;
			this.ay = gravity * dirY / mag;

			this.vx += this.ax;
			this.vy += this.ay;

			const vMag = getMag(this.vx, this.vy);
			if(vMag > maxSpeed) {
				this.vx *= maxSpeed / vMag;
				this.vy *= maxSpeed / vMag;
			}

			this.x += this.vx;
			this.y += this.vy;
		}
		else {
			this.x += this.vx;
			this.y += this.vy;

		}

		if(this.x > PARAMS.windowWidth || this.x < 0) {
			this.vx *= -1;
			this.x += 2*this.vx;
		}

		if(this.y > PARAMS.windowHeight || this.y < 0) {
			this.vy *= -1;
			this.y += 2*this.vy;
		}
	}
}
