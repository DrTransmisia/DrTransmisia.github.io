/**
 * @type {BugController}
 */
let fireflies;

document.getElementById("startbtn").onclick = () => {
	if(fireflies === undefined)
		fireflies = new BugController({
			imageSprite: "fireflies.webp",
			canDie: false,
			minBugs: 10,
			maxBugs: 30,
			mouseOver: "multiply"
		});
}

document.getElementById("stopbtn").onclick = () => {
	if(fireflies === undefined)
		return;
	
	fireflies.end();

	fireflies = undefined;
}

document.getElementById("startbtn").click();

class SealController {
	/**
	 * @type {HTMLTemplateElement}
	 */
	static sealTemplateDOM = document.getElementById("seal-template");
	static animationDelay = 0;

	static animations = [[{left: 0}, {left: "calc(100% - var(--rdrama-seal-width))"}], [{top: 0}, {top: "calc(100% - var(--rdrama-seal-height))"}]];

	constructor() {
		/**
		 * @type {HTMLDivElement}
		 */
		this.sealDOM = document.importNode(this.constructor.sealTemplateDOM.content, true).children[0];

		// init css
		// animation: moveX 4s linear 0s infinite alternate, moveY 6.8s linear 0s infinite alternate;
		this.sealDOM.style.animationDelay = (this.constructor.animationDelay++ % 6) + "s";
		for(let i = 0; i < this.constructor.animations.length; i++)
			this.sealDOM.animate(this.constructor.animations[i], {
				duration: 2000 + Math.random() * 8000,
				iterations: Infinity,
				direction: "alternate",
				easing: "linear",
				delay: Math.random() * 1000 // we give each component a differnt delay for randommaxxing
			});
		
		document.body.append(this.sealDOM);
	}
}

for(let i = 0; i < 25; i++)
	new SealController();