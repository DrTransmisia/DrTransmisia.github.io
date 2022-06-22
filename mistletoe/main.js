let pyodide;
const startTime = performance.now()

async function main() {
	pyodide = await loadPyodide();

	await pyodide.loadPackage("https://DrTransmisia.github.io/mistletoe/mistletoe-0.8.2-py3-none-any.whl");
	console.log("mistletoe ready!");

	await pyodide.loadPackage("https://DrTransmisia.github.io/mistletoe/rdramamistletoe-0.0.1-py2.py3-none-any.whl");
	console.log("bussy ready!");

	pyodide.runPython(`
		from rdramamistletoe.dramarender import DramaHTMLRenderer
		from mistletoe import Document

		def markdown(x):
			r = DramaHTMLRenderer()

			# demo stuff
			r.getEmojiPath = lambda em: f'https://rdrama.net/e/{em}.webp'
			r.getUserProfilePath = lambda username: f'https://rdrama.net/@{username}'
			r.getUserProfilePic = lambda username: f'https://rdrama.net/@{username}/pic'

			return r.render(Document(x))
		
		pass
	`);
	const markdown = pyodide.runPython("markdown")
	console.log("markdown() ready!");

	document.getElementById("bench").innerText = "I took " + (performance.now() - startTime) + "ms to load the fucking Python runtime 'n related shit!"

	/** @type {HTMLTextAreaElement} */
	const tDOM = document.getElementById("bussy");
	const outDOM = document.getElementById("out")

	outDOM.innerHTML = markdown(tDOM.value);
	document.addEventListener('keyup', () => {
		outDOM.innerHTML = markdown(tDOM.value);
	});
};

main();