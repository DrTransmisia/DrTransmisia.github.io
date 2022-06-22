let pyodide;

async function main() {
	pyodide = await loadPyodide();
	await pyodide.loadPackage("micropip");

	pyodide.runPython(`
		print("BOOOOOTING")
		import micropip
		micropip.install("mistletoe")
		micropip.install("https://DrTransmisia.github.io/mistletoe/rdramamistletoe-0.0.1-py2.py3-none-any.whl")

		from rdramamistletoe.dramarender import DramaHTMLRenderer
		from mistletoe import Document

		def markdown(x):
			r = DramaHTMLRenderer()
			return r.render(Document(x))
		
		pass
	`);
};

main();