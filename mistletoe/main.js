let pyodide;

async function main() {
	pyodide = await loadPyodide();
	await pyodide.loadPackage("micropip");

	pyodide.runPython(`
		import micropip
		micropip.install("mistletoe")
	`)

	await pyodide.loadPackage("https://DrTransmisia.github.io/mistletoe/rdramamistletoe-0.0.1-py2.py3-none-any.whl")

	pyodide.runPython(`
		from rdramamistletoe.dramarender import DramaHTMLRenderer
		from mistletoe import Document

		def markdown(x):
			r = DramaHTMLRenderer()
			return r.render(Document(x))
		
		pass
	`);
};

main();