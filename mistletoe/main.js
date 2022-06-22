let pyodide;

async function main() {
	pyodide = await loadPyodide();
	await pyodide.loadPackage("micropip");

	console.log("micropip ready!");

	pyodide.runPython(`
		import micropip
		await micropip.install("mistletoe")
		import mistletoe
	`);

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

	console.log("markdown() ready!");
};

main();