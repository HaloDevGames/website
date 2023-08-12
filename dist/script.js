import {createNoise3D} from "https://cdn.skypack.dev/simplex-noise@4.0.0";

const canvas = document.createElement('canvas'),
	 context = canvas.getContext('2d'),
	 particles = [],
	 noise3D = createNoise3D();

let width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    xGap = 20,
    yGap = 20,
    numX = width / xGap,
    numY = height / yGap,
    numDots = numX * numY,
    halfXGap = xGap / 2,
    halfYGap = yGap / 2


document.body.appendChild(canvas)

const drawDot = (i, t) => {
	const x = i % numX,
		 y = Math.floor(i / numX),
		 noiseX = noise3D(x / 8, y / 10, t),
		 noiseY = noise3D(x / 8, y / 10, t),
		 xPos = halfXGap + x * xGap + noiseX * xGap * .5,
		 yPos = halfYGap + y * yGap + noiseY * yGap * .5
	
	context.moveTo(xPos, yPos)
	context.arc(
		xPos,
		yPos,
		noiseX * 1 + 2, 0, 2 * Math.PI
	)
}

const drawDots = () => {
	context.fillStyle = '#FFF'
	const t = new Date().getTime() / 5000
	context.beginPath();
	for(let i = 0; i < numDots; i++) {
		drawDot(i, t)
	}
	context.fill();
}

const render = () => {
	context.fillStyle = '#000'
	context.fillRect(0,0,width,height)
	drawDots()
	window.requestAnimationFrame(render)
}

render()

window.addEventListener('resize', () => {
	width = canvas.width = window.innerWidth
	height = canvas.height = window.innerHeight
	numDots = numX * numY
	numX = width / 20
	numY = height / 20
})