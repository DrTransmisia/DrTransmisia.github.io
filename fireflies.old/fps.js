let currentFrameTime = 0;
const smoothing = 36;
let lastFrame = performance.now(); // We can use 0, I don't think too much time would pass before reaching this point.

/**
 * To compute FPS, low pass filter included!
 * @param {DOMHighResTimeStamp} timestamp 
 */
function computeFPS(timestamp)
{
	const frameTime = timestamp - lastFrame;
	lastFrame = timestamp;

	currentFrameTime += (frameTime - currentFrameTime) / smoothing;
	
	window.requestAnimationFrame(computeFPS);
}

window.requestAnimationFrame(computeFPS);

const fpsOutDOM = document.getElementById("fps");
setInterval(() => {
	fpsOutDOM.innerText = Math.floor(1/(currentFrameTime/1000)) + "FPS";
}, 850);