let pyodide;

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
			return r.render(Document(x))
		
		pass
	`);
	const markdown = pyodide.runPython("markdown")
	console.log("markdown() ready!");

	/** @type {HTMLTextAreaElement} */
	const tDOM = document.getElementById("bussy");
	const outDOM = document.getElementById("out")

	document.addEventListener('keydown', () => {
		outDOM.innerHTML = markdown(tDOM.value);
	});
};

main();